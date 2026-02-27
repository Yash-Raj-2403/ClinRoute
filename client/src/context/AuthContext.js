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
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session?.user) {
          const profile = await fetchProfile(session.user);
          setUser(profile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        if (session?.user) {
          try {
            const profile = await fetchProfile(session.user);
            setUser(profile);
          } catch (error) {
            console.error('Profile fetch error:', error);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  //  LOGIN 
  // Patient  : email + password
  // Doctor   : email + licenseNumber (used as password) + phone
  const login = async (email, credential, role, phone = '') => {
    console.log('🔵 AuthContext login called:', { email, role, phone });
    
    try {
      console.log('🔵 Calling Supabase signInWithPassword...');
      
      // Add timeout to detect hanging requests
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Login timeout - Supabase not responding after 15 seconds')), 15000)
      );
      
      const authPromise = supabase.auth.signInWithPassword({
        email,
        password: credential,
      });
      
      const { data, error } = await Promise.race([authPromise, timeoutPromise]);
      
      console.log('🔵 Supabase response received:', { data: !!data, error: !!error });
      
      if (error) {
        console.error('❌ Supabase auth error:', error.message, error.status);
        throw error;
      }
      
      if (!data || !data.user) {
        console.error('❌ No user data returned from Supabase');
        throw new Error('No user data received');
      }
      
      console.log('✅ Supabase auth successful, user ID:', data.user.id);
      console.log('🔵 Fetching profile...');
      let profile = await fetchProfile(data.user);
      console.log('Profile fetched:', profile);

      // If there's no profile row yet (first login after manual Supabase signup),
      // create one now so the role is persisted.
      if (!profile.role) {
        console.log('No role found, creating profile...');
        const profileData = {
          id: data.user.id,
          email,
          role,
          phone: phone || null,
          profile_complete: false,
          family_members: []
        };
        console.log('Attempting to upsert profile:', profileData);
        
        const { data: upsertData, error: upsertErr } = await supabase
          .from('profiles')
          .upsert(profileData, { onConflict: 'id' });
          
        if (upsertErr) {
          console.error('Profile upsert error:', {
            message: upsertErr.message,
            details: upsertErr.details,
            hint: upsertErr.hint,
            code: upsertErr.code
          });
        } else {
          console.log('Profile upsert successful:', upsertData);
          profile = await fetchProfile(data.user);
          console.log('Profile created:', profile);
        }
      }

      setUser(profile);
      console.log('Login complete, user set:', profile);
      return profile;
    } catch (error) {
      console.error('Login function error:', error);
      throw error;
    }
  };

  //  REGISTER 
  const register = async (userData) => {
    console.log('🔵 Registration started for role:', userData.role);
    
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    if (error) {
      console.error('❌ Supabase auth signup error:', error);
      throw error;
    }
    
    console.log('✅ Supabase auth user created:', data.user.id);

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

    console.log('📝 Creating profile with data:', {
      id: profileRow.id,
      email: profileRow.email,
      role: profileRow.role,
      name: profileRow.name
    });

    const { data: profileData, error: profileErr } = await supabase
      .from('profiles')
      .upsert(profileRow, { onConflict: 'id' });
      
    if (profileErr) {
      console.error('❌ Profile upsert error:', {
        message: profileErr.message,
        details: profileErr.details,
        hint: profileErr.hint,
        code: profileErr.code
      });
    } else {
      console.log('✅ Profile created successfully:', profileData);
    }

    const profile = mapProfile({ ...profileRow, blood_group: '', bio: '', experience: null, consultation_fee: null, avatar: null }, userData.email);
    setUser(profile);
    console.log('✅ Registration complete, user set:', {
      id: profile.id,
      role: profile.role,
      email: profile.email
    });
    return profile;
  };

  //  UPDATE PROFILE 
  const updateProfile = async (updates) => {
    if (!user?.id) throw new Error('No authenticated user');

    // Helper function to convert empty strings to null for numeric fields
    const toNumericOrNull = (value) => {
      if (value === '' || value === null || value === undefined) return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    };

    // Helper function to convert empty strings to null for date fields
    const toDateOrNull = (value) => {
      if (value === '' || value === null || value === undefined) return null;
      return value;
    };

    const row = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: updates.name !== undefined ? updates.name : user.name,
      age: toNumericOrNull(updates.age !== undefined ? updates.age : user.age),
      weight: toNumericOrNull(updates.weight !== undefined ? updates.weight : user.weight),
      height: toNumericOrNull(updates.height !== undefined ? updates.height : user.height),
      blood_group: updates.bloodGroup !== undefined ? updates.bloodGroup : user.bloodGroup,
      phone: updates.phone !== undefined ? updates.phone : user.phone,
      gender: updates.gender !== undefined ? updates.gender : user.gender,
      dob: toDateOrNull(updates.dob !== undefined ? updates.dob : user.dob),
      address: updates.address !== undefined ? updates.address : user.address,
      emergency_contact: updates.emergencyContact !== undefined ? updates.emergencyContact : user.emergencyContact,
      specialty: updates.specialty !== undefined ? updates.specialty : user.specialty,
      doctor_id: updates.doctorId !== undefined ? updates.doctorId : user.doctorId,
      license_number: updates.licenseNumber !== undefined ? updates.licenseNumber : user.licenseNumber,
      hospital_name: updates.hospitalName !== undefined ? updates.hospitalName : user.hospitalName,
      hospital_address: updates.hospitalAddress !== undefined ? updates.hospitalAddress : user.hospitalAddress,
      bio: updates.bio !== undefined ? updates.bio : user.bio,
      experience: toNumericOrNull(updates.experience !== undefined ? updates.experience : user.experience),
      consultation_fee: toNumericOrNull(updates.consultationFee !== undefined ? updates.consultationFee : user.consultationFee),
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;