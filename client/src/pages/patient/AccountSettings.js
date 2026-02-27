import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Scale, Ruler, Calendar, Trash2, UserPlus, FileText, Clock, ChevronRight, Save, ArrowRight, AlertTriangle, Phone, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AccountSettings.css';

const EMPTY_MEMBER = { name: '', age: '', relation: '', bloodGroup: '', allergies: '' };
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const RELATIONS = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'];

const MOCK_APPOINTMENTS = [
  { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'General Physician', date: '2026-02-10', time: '10:30 AM', status: 'Completed', notes: 'Routine checkup. BP normal.' },
  { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Cardiologist', date: '2026-01-22', time: '2:00 PM', status: 'Completed', notes: 'ECG normal.' },
  { id: 3, doctor: 'Dr. Priya Sharma', specialty: 'Dermatologist', date: '2026-03-05', time: '11:00 AM', status: 'Upcoming', notes: '' },
];

const MOCK_RECORDS = [
  { id: 1, title: 'Blood Test Report', date: '2026-02-10', type: 'Lab Report', size: '1.2 MB' },
  { id: 2, title: 'Chest X-Ray', date: '2026-01-22', type: 'Imaging', size: '4.8 MB' },
  { id: 3, title: 'Prescription - Feb 2026', date: '2026-02-10', type: 'Prescription', size: '0.3 MB' },
];

const validate = (info) => {
  const errs = {};
  if (!info.name || info.name.trim().length < 2) errs.name = 'Full name must be at least 2 characters.';
  if (!info.age || isNaN(info.age) || Number(info.age) < 1 || Number(info.age) > 120) errs.age = 'Age must be a number between 1 and 120.';
  if (!info.weight || isNaN(info.weight) || Number(info.weight) < 1 || Number(info.weight) > 500) errs.weight = 'Weight must be between 1 and 500 kg.';
  if (!info.height || isNaN(info.height) || Number(info.height) < 50 || Number(info.height) > 300) errs.height = 'Height must be between 50 and 300 cm.';
  if (info.phone && !/^[+]?[\d\s\-().]{7,20}$/.test(info.phone)) errs.phone = 'Enter a valid phone number.';
  return errs;
};

const isRequiredComplete = (info) =>
  info.name && info.name.trim().length >= 2 &&
  info.age && !isNaN(info.age) && Number(info.age) >= 1 && Number(info.age) <= 120 &&
  info.weight && !isNaN(info.weight) && Number(info.weight) >= 1 && Number(info.weight) <= 500 &&
  info.height && !isNaN(info.height) && Number(info.height) >= 50 && Number(info.height) <= 300;

const PatientAccountSettings = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const [basicInfo, setBasicInfo] = useState({
    name: user?.name || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    bloodGroup: user?.bloodGroup || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || '',
  });

  const [familyMembers, setFamilyMembers] = useState(user?.familyMembers || []);
  const [saveError, setSaveError] = useState('');

  // Sync from Supabase-backed user context on first load
  useEffect(() => {
    if (user?.id) {
      setBasicInfo({
        name: user.name || '',
        age: user.age ?? '',
        weight: user.weight ?? '',
        height: user.height ?? '',
        bloodGroup: user.bloodGroup || '',
        phone: user.phone || '',
        gender: user.gender || '',
        dob: user.dob || '',
        address: user.address || '',
        emergencyContact: user.emergencyContact || '',
      });
      setFamilyMembers(user.familyMembers || []);
      setSavedOnce(!!user.profileComplete);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(p => ({ ...p, [name]: value }));
    // clear error on change
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleMemberChange = (idx, field, value) => setFamilyMembers(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  const addMember = () => { if (familyMembers.length < 4) setFamilyMembers(prev => [...prev, { ...EMPTY_MEMBER }]); };
  const removeMember = (idx) => setFamilyMembers(prev => prev.filter((_, i) => i !== idx));

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    const errs = validate(basicInfo);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    setSaveError('');
    try {
      await updateProfile({ ...basicInfo, familyMembers, profileComplete: true });
      setSavedOnce(true);
    } catch (err) {
      setSaveError(err.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const canGoToDashboard = savedOnce && isRequiredComplete(basicInfo);

  const handleProceedToDashboard = () => {
    if (!canGoToDashboard) return;
    navigate('/patient');
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== 'DELETE') return;
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Details', icon: User },
    { id: 'family', label: 'Family', icon: UserPlus },
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'danger', label: 'Account', icon: Trash2 },
  ];

  return (
    <div className="as-page">
      <div className="as-header">
        <div className="as-header-inner">
          <div className="as-logo">
            <div className="as-logo-icon">
              <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#319795"/><path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white"/></svg>
            </div>
            <span>ClinRoute</span>
          </div>
          <div className="as-header-right">
            <span className="as-header-name">Hi, {basicInfo.name || user?.name || 'Patient'} </span>
            <motion.button
              className={`as-proceed-btn ${!canGoToDashboard ? 'as-proceed-btn--disabled' : ''}`}
              onClick={handleProceedToDashboard}
              whileHover={{ scale: canGoToDashboard ? 1.02 : 1 }}
              whileTap={{ scale: canGoToDashboard ? 0.98 : 1 }}
              title={!canGoToDashboard ? 'Fill and save your required details first (Name, Age, Weight, Height)' : 'Go to dashboard'}
            >
              Go to Dashboard <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
        {!canGoToDashboard && (
          <div className="as-profile-banner">
            <AlertTriangle size={15} />
            Complete your profile to unlock the dashboard — fill in Name, Age, Weight and Height then click Save.
          </div>
        )}
      </div>

      <div className="as-body">
        <aside className="as-sidebar">
          <div className="as-sidebar-title">Account Settings</div>
          <nav className="as-nav">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} className={`as-nav-item ${activeTab === id ? 'as-nav-item--active' : ''} ${id === 'danger' ? 'as-nav-item--danger' : ''}`} onClick={() => setActiveTab(id)}>
                <Icon size={18} /><span>{label}</span><ChevronRight size={14} className="as-nav-arrow" />
              </button>
            ))}
          </nav>
        </aside>

        <main className="as-main">
          <AnimatePresence mode="wait">

            {/* BASIC DETAILS */}
            {activeTab === 'basic' && (
              <motion.div key="basic" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header">
                  <h2>Basic Information</h2>
                  <p>Fields marked <span className="req">*</span> are required before you can access the dashboard.</p>
                </div>
                <form onSubmit={handleSave} noValidate className="as-form">
                  <div className="as-form-grid">

                    {/* Name */}
                    <div className={`as-field ${errors.name ? 'as-field--error' : ''}`}>
                      <label>Full Name <span className="req">*</span></label>
                      <div className="as-input-wrap">
                        <User className="as-input-icon" size={16} />
                        <input
                          name="name" value={basicInfo.name} onChange={handleBasicChange}
                          placeholder="John Doe" minLength={2} maxLength={80} required
                        />
                      </div>
                      {errors.name && <span className="as-field-error">{errors.name}</span>}
                    </div>

                    {/* DOB */}
                    <div className="as-field">
                      <label>Date of Birth</label>
                      <div className="as-input-wrap">
                        <Calendar className="as-input-icon" size={16} />
                        <input
                          type="date" name="dob" value={basicInfo.dob} onChange={handleBasicChange}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div className={`as-field ${errors.age ? 'as-field--error' : ''}`}>
                      <label>Age (years) <span className="req">*</span></label>
                      <div className="as-input-wrap">
                        <User className="as-input-icon" size={16} />
                        <input
                          type="number" name="age" value={basicInfo.age} onChange={handleBasicChange}
                          placeholder="e.g. 28" min={1} max={120} step={1} required
                          onWheel={e => e.target.blur()}
                        />
                      </div>
                      {errors.age && <span className="as-field-error">{errors.age}</span>}
                      <span className="as-field-hint">Range: 1 – 120 years</span>
                    </div>

                    {/* Gender */}
                    <div className="as-field">
                      <label>Gender</label>
                      <div className="as-input-wrap">
                        <User className="as-input-icon" size={16} />
                        <select name="gender" value={basicInfo.gender} onChange={handleBasicChange}>
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    {/* Weight */}
                    <div className={`as-field ${errors.weight ? 'as-field--error' : ''}`}>
                      <label>Weight (kg) <span className="req">*</span></label>
                      <div className="as-input-wrap">
                        <Scale className="as-input-icon" size={16} />
                        <input
                          type="number" name="weight" value={basicInfo.weight} onChange={handleBasicChange}
                          placeholder="e.g. 70" min={1} max={500} step={0.1} required
                          onWheel={e => e.target.blur()}
                        />
                      </div>
                      {errors.weight && <span className="as-field-error">{errors.weight}</span>}
                      <span className="as-field-hint">Range: 1 – 500 kg</span>
                    </div>

                    {/* Height */}
                    <div className={`as-field ${errors.height ? 'as-field--error' : ''}`}>
                      <label>Height (cm) <span className="req">*</span></label>
                      <div className="as-input-wrap">
                        <Ruler className="as-input-icon" size={16} />
                        <input
                          type="number" name="height" value={basicInfo.height} onChange={handleBasicChange}
                          placeholder="e.g. 175" min={50} max={300} step={1} required
                          onWheel={e => e.target.blur()}
                        />
                      </div>
                      {errors.height && <span className="as-field-error">{errors.height}</span>}
                      <span className="as-field-hint">Range: 50 – 300 cm</span>
                    </div>

                    {/* Blood Group */}
                    <div className="as-field">
                      <label>Blood Group</label>
                      <div className="as-input-wrap">
                        <User className="as-input-icon" size={16} />
                        <select name="bloodGroup" value={basicInfo.bloodGroup} onChange={handleBasicChange}>
                          <option value="">Select blood group</option>
                          {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className={`as-field ${errors.phone ? 'as-field--error' : ''}`}>
                      <label>Phone Number</label>
                      <div className="as-input-wrap">
                        <Phone className="as-input-icon" size={16} />
                        <input
                          type="tel" name="phone" value={basicInfo.phone} onChange={handleBasicChange}
                          placeholder="+1 (555) 000-0000" pattern="^[+]?[\d\s\-().]{7,20}$" maxLength={20}
                        />
                      </div>
                      {errors.phone && <span className="as-field-error">{errors.phone}</span>}
                    </div>

                    {/* Address */}
                    <div className="as-field as-field--full">
                      <label>Address</label>
                      <div className="as-input-wrap">
                        <MapPin className="as-input-icon" size={16} />
                        <input name="address" value={basicInfo.address} onChange={handleBasicChange} placeholder="123 Main St, City, State" maxLength={200} />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="as-field as-field--full">
                      <label>Emergency Contact</label>
                      <div className="as-input-wrap">
                        <Phone className="as-input-icon" size={16} />
                        <input name="emergencyContact" value={basicInfo.emergencyContact} onChange={handleBasicChange} placeholder="Name — +1 (555) 000-0000" maxLength={100} />
                      </div>
                    </div>
                  </div>

                  <div className="as-form-actions">
                    <motion.button type="submit" className="as-save-btn" disabled={saving} whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: saving ? 1 : 0.98 }}>
                      {saving ? <span className="as-spinner" /> : <><Save size={16} /> Save Changes</>}
                    </motion.button>                    {saveError && <span className="as-field-error" style={{margin: 0}}>{saveError}</span>}                    {savedOnce && isRequiredComplete(basicInfo) && <span className="as-saved-badge"> Profile complete</span>}
                    <motion.button
                      type="button"
                      className={`as-dashboard-btn ${!canGoToDashboard ? 'as-dashboard-btn--locked' : ''}`}
                      onClick={handleProceedToDashboard}
                      whileHover={{ scale: canGoToDashboard ? 1.02 : 1 }}
                      title={!canGoToDashboard ? 'Save required fields first' : ''}
                    >
                      {canGoToDashboard ? <><ArrowRight size={16} /> Go to Dashboard</> : <>{'\uD83D\uDD12'} Save details to unlock dashboard</>}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* FAMILY DETAILS */}
            {activeTab === 'family' && (
              <motion.div key="family" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header">
                  <h2>Family Members</h2>
                  <p>Add up to 4 family members to manage their health together.</p>
                </div>
                {familyMembers.length === 0 && (
                  <div className="as-empty"><UserPlus size={40} /><p>No family members added yet.</p></div>
                )}
                <div className="as-family-list">
                  {familyMembers.map((member, idx) => (
                    <motion.div key={idx} className="as-family-card" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                      <div className="as-family-card-header">
                        <span className="as-family-no">Member {idx + 1}</span>
                        <button className="as-remove-btn" type="button" onClick={() => removeMember(idx)}><Trash2 size={15} /> Remove</button>
                      </div>
                      <div className="as-form-grid">
                        <div className="as-field">
                          <label>Full Name</label>
                          <div className="as-input-wrap"><User className="as-input-icon" size={16} /><input value={member.name} onChange={e => handleMemberChange(idx, 'name', e.target.value)} placeholder="Jane Doe" maxLength={80} /></div>
                        </div>
                        <div className="as-field">
                          <label>Age</label>
                          <div className="as-input-wrap"><User className="as-input-icon" size={16} /><input type="number" value={member.age} onChange={e => handleMemberChange(idx, 'age', e.target.value)} placeholder="e.g. 30" min={1} max={120} step={1} onWheel={e => e.target.blur()} /></div>
                          <span className="as-field-hint">1 – 120 years</span>
                        </div>
                        <div className="as-field">
                          <label>Relation</label>
                          <div className="as-input-wrap"><User className="as-input-icon" size={16} /><select value={member.relation} onChange={e => handleMemberChange(idx, 'relation', e.target.value)}><option value="">Select</option>{RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                        </div>
                        <div className="as-field">
                          <label>Blood Group</label>
                          <div className="as-input-wrap"><User className="as-input-icon" size={16} /><select value={member.bloodGroup} onChange={e => handleMemberChange(idx, 'bloodGroup', e.target.value)}><option value="">Select</option>{BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
                        </div>
                        <div className="as-field as-field--full">
                          <label>Allergies / Conditions</label>
                          <div className="as-input-wrap"><User className="as-input-icon" size={16} /><input value={member.allergies} onChange={e => handleMemberChange(idx, 'allergies', e.target.value)} placeholder="e.g. Penicillin, Peanuts" maxLength={200} /></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="as-family-actions">
                  {familyMembers.length < 4 && (
                    <motion.button type="button" className="as-add-member-btn" onClick={addMember} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <UserPlus size={16} /> Add Family Member ({familyMembers.length}/4)
                    </motion.button>
                  )}
                  <motion.button type="button" className="as-save-btn" onClick={handleSave} disabled={saving} whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: saving ? 1 : 0.98 }}>
                    {saving ? <span className="as-spinner" /> : <><Save size={16} /> Save Family Members</>}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* PAST APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <motion.div key="appointments" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header"><h2>Past Appointments</h2><p>Your consultation history with ClinRoute doctors.</p></div>
                <div className="as-appointments-list">
                  {MOCK_APPOINTMENTS.map(appt => (
                    <div key={appt.id} className={`as-appt-card as-appt-card--${appt.status.toLowerCase()}`}>
                      <div className="as-appt-left">
                        <div className="as-appt-avatar">{appt.doctor.charAt(0)}</div>
                        <div className="as-appt-info">
                          <span className="as-appt-doctor">{appt.doctor}</span>
                          <span className="as-appt-specialty">{appt.specialty}</span>
                          {appt.notes && <span className="as-appt-notes">{appt.notes}</span>}
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

            {/* MEDICAL RECORDS */}
            {activeTab === 'records' && (
              <motion.div key="records" className="as-section" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="as-section-header"><h2>Medical Records</h2><p>Your uploaded documents, reports, and prescriptions.</p></div>
                <div className="as-records-list">
                  {MOCK_RECORDS.map(rec => (
                    <div key={rec.id} className="as-record-card">
                      <div className="as-record-icon"><FileText size={22} /></div>
                      <div className="as-record-info">
                        <span className="as-record-title">{rec.title}</span>
                        <span className="as-record-meta">{rec.type}  {rec.date}  {rec.size}</span>
                      </div>
                      <button className="as-record-download">Download</button>
                    </div>
                  ))}
                </div>
                <div className="as-records-upload">
                  <label className="as-upload-label">
                    <input type="file" accept=".pdf,.jpg,.png,.doc" multiple className="as-upload-input" />
                    <span>+ Upload New Record</span>
                  </label>
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
                    <p>This action is permanent and irreversible. All your data, consultations, and medical records will be permanently deleted.</p>
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

export default PatientAccountSettings;