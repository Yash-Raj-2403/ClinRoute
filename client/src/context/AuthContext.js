import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// Map snake_case DB row -> camelCase JS object
const mapProfile = (row, email) => ({
  id: row.id,
  email: email || row.email || '',
  role: row.role || '',
  name: row.name || '',
  age: row.age ?? '',
  weight: row.weight ?? '',
  height: row.height ?? '',
  bloodGroup: row.blood_group || '',
  phone: row.phone || '',
  gender: row.gender || '',
  dob: row.dob || '',
  address: row.address || '',
  emergencyContact: row.emergency_contact || '',
  specialty: row.specialty || '',
  doctorId: row.doctor_id || '',
  licenseNumber: row.license_number || '',
  hospitalName: row.hospital_name || '',
  hospitalAddress: row.hospital_address || '',
  bio: row.bio || '',
  experience: row.experience ?? '',
  consultationFee: row.consultation_fee ?? '',
  familyMembers: row.family_members || [],
  profileComplete: row.profile_complete || false,
  avatar: row.avatar || null,
});

const fetchProfile = async (authUser) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single();
  if (data && !error) return mapProfile(data, authUser.email);
  // No profile row yet — return a bare skeleton
  return {
    id: authUser.id,
    email: authUser.email,
    role: '',
    name: '',
    profileComplete: false,
    familyMembers: [],
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(profile);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const profile = await fetchProfile(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  //  LOGIN 
  // Patient  : email + password
  // Doctor   : email + licenseNumber (used as password) + phone
  const login = async (email, credential, role, phone = '') => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: credential,
    });
    if (error) throw error;

    let profile = await fetchProfile(data.user);

    // If there's no profile row yet (first login after manual Supabase signup),
    // create one now so the role is persisted.
    if (!profile.role) {
      const { error: upsertErr } = await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        role,
        phone: phone || '',
        profile_complete: false,
        family_members: [],
      });
      if (!upsertErr) profile = await fetchProfile(data.user);
    }

    setUser(profile);
    return profile;
  };

  //  REGISTER 
  const register = async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    if (error) throw error;

    const profileRow = {
      id: data.user.id,
      email: userData.email,
      role: userData.role,
      name: userData.name || '',
      phone: userData.phone || '',
      doctor_id: userData.doctorId || '',
      license_number: userData.licenseNumber || '',
      hospital_name: userData.hospitalName || '',
      hospital_address: userData.hospitalAddress || '',
      specialty: userData.specialty || '',
      profile_complete: false,
      family_members: [],
    };

    const { error: profileErr } = await supabase.from('profiles').upsert(profileRow);
    if (profileErr) console.error('Profile upsert error:', profileErr.message);

    const profile = mapProfile({ ...profileRow, blood_group: '', bio: '', experience: null, consultation_fee: null, avatar: null }, userData.email);
    setUser(profile);
    return profile;
  };

  //  UPDATE PROFILE 
  const updateProfile = async (updates) => {
    if (!user?.id) throw new Error('No authenticated user');

    const row = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: updates.name !== undefined ? updates.name : user.name,
      age: updates.age !== undefined ? updates.age : user.age,
      weight: updates.weight !== undefined ? updates.weight : user.weight,
      height: updates.height !== undefined ? updates.height : user.height,
      blood_group: updates.bloodGroup !== undefined ? updates.bloodGroup : user.bloodGroup,
      phone: updates.phone !== undefined ? updates.phone : user.phone,
      gender: updates.gender !== undefined ? updates.gender : user.gender,
      dob: updates.dob !== undefined ? updates.dob : user.dob,
      address: updates.address !== undefined ? updates.address : user.address,
      emergency_contact: updates.emergencyContact !== undefined ? updates.emergencyContact : user.emergencyContact,
      specialty: updates.specialty !== undefined ? updates.specialty : user.specialty,
      doctor_id: updates.doctorId !== undefined ? updates.doctorId : user.doctorId,
      license_number: updates.licenseNumber !== undefined ? updates.licenseNumber : user.licenseNumber,
      hospital_name: updates.hospitalName !== undefined ? updates.hospitalName : user.hospitalName,
      hospital_address: updates.hospitalAddress !== undefined ? updates.hospitalAddress : user.hospitalAddress,
      bio: updates.bio !== undefined ? updates.bio : user.bio,
      experience: updates.experience !== undefined ? updates.experience : user.experience,
      consultation_fee: updates.consultationFee !== undefined ? updates.consultationFee : user.consultationFee,
      family_members: updates.familyMembers !== undefined ? updates.familyMembers : user.familyMembers,
      profile_complete: updates.profileComplete !== undefined ? updates.profileComplete : user.profileComplete,
    };

    const { error } = await supabase.from('profiles').upsert(row);
    if (error) throw error;

    const updated = { ...user, ...updates };
    setUser(updated);
    return updated;
  };

// ── GOOGLE OAUTH ─────────────────────────────────────────────
  // role: 'patient' | 'doctor'  — stored in metadata so the callback can persist it
  const loginWithGoogle = async (role = 'patient') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { role }, // picked up in the callback handler
      },
    });
    if (error) throw error;
    // Browser is redirected — nothing more to do here
  };

  // ── OAUTH CALLBACK (call once on /auth/callback) ──────────
  const handleOAuthCallback = async (role = 'patient') => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) throw error || new Error('No session');

    let profile = await fetchProfile(session.user);
    if (!profile.role) {
      const meta = session.user.user_metadata || {};
      await supabase.from('profiles').upsert({
        id: session.user.id,
        email: session.user.email,
        role: meta.role || role,
        name: meta.full_name || meta.name || '',
        avatar: meta.avatar_url || meta.picture || null,
        profile_complete: false,
        family_members: [],
      });
      profile = await fetchProfile(session.user);
    }
    setUser(profile);
    return profile;
  };

  // ── LOGOUT ───────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    handleOAuthCallback,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isDoctor: user?.role === 'doctor',
    isPatient: user?.role === 'patient',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;