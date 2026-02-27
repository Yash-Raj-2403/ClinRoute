import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, Mail, MapPin, Stethoscope, Award, Building2,
  Trash2, Clock, Calendar, Save, ArrowRight, AlertTriangle, ChevronRight, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../patient/AccountSettings.css';
import './DoctorDashboard.css';

const SPECIALTIES = [
  'General Physician','Cardiologist','Dermatologist','Neurologist','Pediatrician',
  'Orthopedic','Gynecologist','Psychiatrist','Radiologist','ENT Specialist','Other'
];

const MOCK_DOC_APPOINTMENTS = [
  { id: 1, patient: 'Alice Johnson', date: '2026-02-12', time: '9:00 AM', status: 'Completed', reason: 'Routine checkup' },
  { id: 2, patient: 'Bob Smith', date: '2026-02-18', time: '11:30 AM', status: 'Completed', reason: 'Chest pain' },
  { id: 3, patient: 'Carol White', date: '2026-03-07', time: '3:00 PM', status: 'Upcoming', reason: 'Follow-up' },
];

const validateDoc = (p) => {
  const errs = {};
  if (!p.name || p.name.trim().length < 2) errs.name = 'Full name must be at least 2 characters.';
  if (!p.specialty) errs.specialty = 'Please select a specialty.';
  if (!p.doctorId || p.doctorId.trim().length < 3) errs.doctorId = 'Doctor ID must be at least 3 characters.';
  if (!p.licenseNumber || p.licenseNumber.trim().length < 3) errs.licenseNumber = 'License number must be at least 3 characters.';
  if (!p.hospitalName || p.hospitalName.trim().length < 2) errs.hospitalName = 'Hospital name is required.';
  if (p.phone && !/^[+]?[\d\s\-().]{7,20}$/.test(p.phone)) errs.phone = 'Enter a valid phone number.';
  return errs;
};

const isDocProfileComplete = (p) =>
  p.name && p.name.trim().length >= 2 &&
  p.specialty &&
  p.doctorId && p.doctorId.trim().length >= 3 &&
  p.licenseNumber && p.licenseNumber.trim().length >= 3 &&
  p.hospitalName && p.hospitalName.trim().length >= 2;

const DoctorSettings = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialty: user?.specialty || '',
    doctorId: user?.doctorId || '',
    licenseNumber: user?.licenseNumber || '',
    hospitalName: user?.hospitalName || '',
    hospitalAddress: user?.hospitalAddress || '',
    bio: user?.bio || '',
    experience: user?.experience || '',
    consultationFee: user?.consultationFee || '',
  });

  const [saveError, setSaveError] = useState('');

  // Sync from Supabase-backed user context on first load
  useEffect(() => {
    if (user?.id) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialty: user.specialty || '',
        doctorId: user.doctorId || '',
        licenseNumber: user.licenseNumber || '',
        hospitalName: user.hospitalName || '',
        hospitalAddress: user.hospitalAddress || '',
        bio: user.bio || '',
        experience: user.experience ?? '',
        consultationFee: user.consultationFee ?? '',
      });
      setSavedOnce(!!user.profileComplete);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    const errs = validateDoc(profile);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    setSaveError('');
    try {
      await updateProfile({ ...profile, profileComplete: true });
      setSavedOnce(true);
    } catch (err) {
      setSaveError(err.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const canGoToDashboard = savedOnce && isDocProfileComplete(profile);

  const handleDeleteAccount = async () => {
    if (deleteInput !== 'DELETE') return;
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'danger', label: 'Account', icon: Trash2 },
  ];

  return (
    <div className="as-page">
      {/* HEADER */}
      <div className="as-header">
        <div className="as-header-inner">
          <div className="as-logo">
            <div className="as-logo-icon">
              <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#319795"/><path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white"/></svg>
            </div>
            <span>ClinRoute</span>
          </div>
          <div className="as-header-right">
            <span className="as-header-name">Dr. {profile.name || user?.name || 'Doctor'} </span>
            <motion.button
              className={`as-proceed-btn ${!canGoToDashboard ? 'as-proceed-btn--disabled' : ''}`}
              onClick={() => canGoToDashboard && navigate('/doctor')}
              whileHover={{ scale: canGoToDashboard ? 1.02 : 1 }}
              whileTap={{ scale: canGoToDashboard ? 0.98 : 1 }}
              title={!canGoToDashboard ? 'Fill and save required fields first' : 'Go to dashboard'}
            >
              Go to Dashboard <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
        {!canGoToDashboard && (
          <div className="as-profile-banner">
            <AlertTriangle size={15} />
            Complete your profile to unlock the dashboard — fill in all required fields then click Save.
          </div>
        )}
      </div>

      <div className="as-body">
        <aside className="as-sidebar">
          <div className="as-sidebar-title">Doctor Settings</div>
          <nav className="as-nav">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} className={`as-nav-item ${activeTab === id ? 'as-nav-item--active' : ''} ${id === 'danger' ? 'as-nav-item--danger' : ''}`} onClick={() => setActiveTab(id)}>
                <Icon size={18} /><span>{label}</span><ChevronRight size={14} className="as-nav-arrow" />
              </button>
            ))}
          </nav>

          {/* Profile preview card */}
          <div className="as-doc-profile-card">
            <div className="as-doc-avatar">{profile.name ? profile.name.charAt(0).toUpperCase() : 'D'}</div>
            <div className="as-doc-info">
              <span className="as-doc-name">{profile.name ? `Dr. ${profile.name}` : 'Doctor'}</span>
              {profile.specialty && <span className="as-doc-spec">{profile.specialty}</span>}
              {profile.hospitalName && <span className="as-doc-hospital">{profile.hospitalName}</span>}
            </div>
          </div>
        </aside>

        <main className="as-main">
          <AnimatePresence mode="wait">

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div key="profile" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header">
                  <h2>My Profile</h2>
                  <p>Fields marked <span className="req">*</span> are required before you can access the dashboard.</p>
                </div>
                <form onSubmit={handleSave} noValidate className="as-form">
                  <div className="as-form-section-label"><ShieldCheck size={15}/> Personal Information</div>
                  <div className="as-form-grid">

                    {/* Name */}
                    <div className={`as-field ${errors.name ? 'as-field--error' : ''}`}>
                      <label>Full Name <span className="req">*</span></label>
                      <div className="as-input-wrap"><User className="as-input-icon" size={16} />
                        <input name="name" value={profile.name} onChange={handleChange} placeholder="Dr. John Smith" minLength={2} maxLength={80} required />
                      </div>
                      {errors.name && <span className="as-field-error">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="as-field">
                      <label>Email Address</label>
                      <div className="as-input-wrap"><Mail className="as-input-icon" size={16} />
                        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="doctor@hospital.com" maxLength={100} readOnly={!!user?.email} style={user?.email ? { opacity: 0.65, cursor: 'not-allowed' } : {}} />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className={`as-field ${errors.phone ? 'as-field--error' : ''}`}>
                      <label>Phone Number</label>
                      <div className="as-input-wrap"><Phone className="as-input-icon" size={16} />
                        <input type="tel" name="phone" value={profile.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" pattern="^[+]?[\d\s\-().]{7,20}$" maxLength={20} />
                      </div>
                      {errors.phone && <span className="as-field-error">{errors.phone}</span>}
                    </div>

                    {/* Specialty */}
                    <div className={`as-field ${errors.specialty ? 'as-field--error' : ''}`}>
                      <label>Specialty <span className="req">*</span></label>
                      <div className="as-input-wrap"><Stethoscope className="as-input-icon" size={16} />
                        <select name="specialty" value={profile.specialty} onChange={handleChange} required>
                          <option value="">Select specialty</option>
                          {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.specialty && <span className="as-field-error">{errors.specialty}</span>}
                    </div>
                  </div>

                  <div className="as-form-section-label"><Award size={15}/> Credentials</div>
                  <div className="as-form-grid">
                    {/* Doctor ID */}
                    <div className={`as-field ${errors.doctorId ? 'as-field--error' : ''}`}>
                      <label>Doctor ID <span className="req">*</span></label>
                      <div className="as-input-wrap"><Award className="as-input-icon" size={16} />
                        <input name="doctorId" value={profile.doctorId} onChange={handleChange} placeholder="e.g. DOC-1234" minLength={3} maxLength={30} required />
                      </div>
                      {errors.doctorId && <span className="as-field-error">{errors.doctorId}</span>}
                    </div>

                    {/* License Number */}
                    <div className={`as-field ${errors.licenseNumber ? 'as-field--error' : ''}`}>
                      <label>License Number <span className="req">*</span></label>
                      <div className="as-input-wrap"><Award className="as-input-icon" size={16} />
                        <input name="licenseNumber" value={profile.licenseNumber} onChange={handleChange} placeholder="e.g. MED-98765" minLength={3} maxLength={30} required />
                      </div>
                      {errors.licenseNumber && <span className="as-field-error">{errors.licenseNumber}</span>}
                    </div>

                    {/* Experience */}
                    <div className="as-field">
                      <label>Years of Experience</label>
                      <div className="as-input-wrap"><User className="as-input-icon" size={16} />
                        <input type="number" name="experience" value={profile.experience} onChange={handleChange} placeholder="e.g. 8" min={0} max={60} step={1} onWheel={e => e.target.blur()} />
                      </div>
                      <span className="as-field-hint">0 – 60 years</span>
                    </div>

                    {/* Consultation Fee */}
                    <div className="as-field">
                      <label>Consultation Fee ($)</label>
                      <div className="as-input-wrap"><User className="as-input-icon" size={16} />
                        <input type="number" name="consultationFee" value={profile.consultationFee} onChange={handleChange} placeholder="e.g. 120" min={0} max={10000} step={1} onWheel={e => e.target.blur()} />
                      </div>
                    </div>
                  </div>

                  <div className="as-form-section-label"><Building2 size={15}/> Hospital Details</div>
                  <div className="as-form-grid">
                    {/* Hospital Name */}
                    <div className={`as-field ${errors.hospitalName ? 'as-field--error' : ''}`}>
                      <label>Hospital / Clinic Name <span className="req">*</span></label>
                      <div className="as-input-wrap"><Building2 className="as-input-icon" size={16} />
                        <input name="hospitalName" value={profile.hospitalName} onChange={handleChange} placeholder="e.g. City General Hospital" minLength={2} maxLength={100} required />
                      </div>
                      {errors.hospitalName && <span className="as-field-error">{errors.hospitalName}</span>}
                    </div>

                    {/* Hospital Address */}
                    <div className="as-field as-field--full">
                      <label>Hospital Address</label>
                      <div className="as-input-wrap"><MapPin className="as-input-icon" size={16} />
                        <input name="hospitalAddress" value={profile.hospitalAddress} onChange={handleChange} placeholder="123 Medical Ave, City, State" maxLength={200} />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="as-field as-field--full">
                      <label>Professional Bio</label>
                      <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Briefly describe your expertise and approach..." maxLength={500} className="as-textarea" rows={3} />
                      <span className="as-field-hint">{profile.bio.length}/500</span>
                    </div>
                  </div>

                  <div className="as-form-actions">
                    <motion.button type="submit" className="as-save-btn" disabled={saving} whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: saving ? 1 : 0.98 }}>
                      {saving ? <span className="as-spinner" /> : <><Save size={16} /> Save Profile</>}
                    </motion.button>                    {saveError && <span className="as-field-error" style={{margin: 0}}>{saveError}</span>}                    {savedOnce && isDocProfileComplete(profile) && <span className="as-saved-badge"> Profile complete</span>}
                    <motion.button
                      type="button"
                      className={`as-dashboard-btn ${!canGoToDashboard ? 'as-dashboard-btn--locked' : ''}`}
                      onClick={() => canGoToDashboard && navigate('/doctor')}
                      whileHover={{ scale: canGoToDashboard ? 1.02 : 1 }}
                      title={!canGoToDashboard ? 'Save required fields first' : ''}
                    >
                      {canGoToDashboard ? <><ArrowRight size={16} /> Go to Dashboard</> : <>{'\uD83D\uDD12'} Save details to unlock dashboard</>}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <motion.div key="appointments" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header"><h2>My Appointments</h2><p>Your consultation schedule and history.</p></div>
                <div className="as-appointments-list">
                  {MOCK_DOC_APPOINTMENTS.map(appt => (
                    <div key={appt.id} className={`as-appt-card as-appt-card--${appt.status.toLowerCase()}`}>
                      <div className="as-appt-left">
                        <div className="as-appt-avatar">{appt.patient.charAt(0)}</div>
                        <div className="as-appt-info">
                          <span className="as-appt-doctor">{appt.patient}</span>
                          <span className="as-appt-specialty">{appt.reason}</span>
                        </div>
                      </div>
                      <div className="as-appt-right">
                        <span className="as-appt-date"><Calendar size={13} /> {appt.date}</span>
                        <span className="as-appt-time"><Clock size={13} /> {appt.time}</span>
                        <span className={`as-appt-status as-appt-status--${appt.status.toLowerCase()}`}>{appt.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* DANGER ZONE */}
            {activeTab === 'danger' && (
              <motion.div key="danger" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header"><h2>Account</h2><p>Permanent account actions.</p></div>
                <div className="as-danger-card">
                  <div className="as-danger-icon"><AlertTriangle size={28} /></div>
                  <div className="as-danger-text">
                    <h3>Delete Account</h3>
                    <p>Permanently deletes your doctor account, all patient interactions, and your profile data. This cannot be undone.</p>
                  </div>
                  <button className="as-delete-trigger-btn" onClick={() => setShowDeleteConfirm(true)}>Delete Account</button>
                </div>
                <AnimatePresence>
                  {showDeleteConfirm && (
                    <motion.div className="as-delete-confirm" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                      <h4>Confirm Account Deletion</h4>
                      <p>Type <strong>DELETE</strong> below to confirm. This cannot be undone.</p>
                      <input className="as-delete-input" value={deleteInput} onChange={e => setDeleteInput(e.target.value)} placeholder="Type DELETE to confirm" />
                      <div className="as-delete-btns">
                        <button className="as-cancel-btn" onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); }}>Cancel</button>
                        <button className="as-confirm-delete-btn" disabled={deleteInput !== 'DELETE'} onClick={handleDeleteAccount}>Yes, Delete My Account</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DoctorSettings;