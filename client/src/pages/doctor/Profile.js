import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import './DoctorDashboard.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    patientsCount: 0,
    consultationsCount: 0,
    avgRating: 0,
    totalReviews: 0
  });

  // Form state based on real user data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    specialty: '',
    licenseNumber: '',
    hospitalName: '',
    hospitalAddress: '',
    bio: '',
    experience: '',
    consultationFee: ''
  });

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        gender: user.gender || '',
        address: user.address || '',
        specialty: user.specialty || '',
        licenseNumber: user.licenseNumber || '',
        hospitalName: user.hospitalName || '',
        hospitalAddress: user.hospitalAddress || '',
        bio: user.bio || '',
        experience: user.experience || '',
        consultationFee: user.consultationFee || ''
      });
    }
  }, [user]);

  // Fetch doctor stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;
      try {
        const { data, error } = await supabase.rpc('get_doctor_stats', { doc_id: user.id });
        if (!error && data) {
          setStats({
            patientsCount: data.totalPatientsThisWeek || 0,
            consultationsCount: data.todayAppointments || 0,
            avgRating: 4.8,
            totalReviews: data.completedToday || 0
          });
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        address: formData.address,
        specialty: formData.specialty,
        license_number: formData.licenseNumber,
        hospital_name: formData.hospitalName,
        hospital_address: formData.hospitalAddress,
        bio: formData.bio,
        experience: formData.experience ? Number(formData.experience) : null,
        consultation_fee: formData.consultationFee ? Number(formData.consultationFee) : null
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Parse name into first and last
  const nameParts = (formData.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Default schedule (can be stored in DB later)
  const schedule = {
    monday: { available: true, start: '9:00 AM', end: '5:00 PM' },
    tuesday: { available: true, start: '9:00 AM', end: '5:00 PM' },
    wednesday: { available: true, start: '9:00 AM', end: '1:00 PM' },
    thursday: { available: true, start: '9:00 AM', end: '5:00 PM' },
    friday: { available: true, start: '9:00 AM', end: '3:00 PM' },
    saturday: { available: false },
    sunday: { available: false }
  };

  const displayStats = [
    { label: 'Patients Treated', value: stats.patientsCount.toLocaleString(), icon: '👥' },
    { label: 'Years Experience', value: formData.experience || '0', icon: '📅' },
    { label: 'Rating', value: stats.avgRating.toFixed(1), icon: '⭐' },
    { label: 'Consultations', value: stats.consultationsCount.toString(), icon: '💬' }
  ];

  if (!user) {
    return <div className="profile-page"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span>{user.avatar || '👨‍⚕️'}</span>
              <button className="avatar-edit-btn">📷</button>
            </div>
            <div className="profile-title-info">
              <h1>Dr. {formData.name || 'Doctor'}</h1>
              <p className="specialty">{formData.specialty || 'General Practice'} {formData.hospitalName ? `• ${formData.hospitalName}` : ''}</p>
              <div className="profile-badges">
                <span className="badge verified">✓ Verified</span>
                <span className="badge">📹 Telehealth Available</span>
                <span className="badge">👋 Accepting New Patients</span>
              </div>
            </div>
          </div>
          <div className="profile-stats">
            {displayStats.map((stat, index) => (
              <div key={index} className="profile-stat">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="profile-nav">
        <button 
          className={`nav-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`nav-btn ${activeTab === 'professional' ? 'active' : ''}`}
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </button>
        <button 
          className={`nav-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button 
          className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice Settings
        </button>
        <button 
          className={`nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Availability
        </button>
        <button 
          className={`nav-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button 
                className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
              >
                {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="info-card">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    disabled={true}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    name="dob"
                    value={formData.dob} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Address</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input 
                    type="text" 
                    name="hospitalName"
                    value={formData.hospitalName} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Address</label>
                  <input 
                    type="text" 
                    name="hospitalAddress"
                    value={formData.hospitalAddress} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Professional Bio</h3>
              <div className="form-group">
                <textarea 
                  rows="4" 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Professional Tab */}
        {activeTab === 'professional' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Professional Information</h2>
              <button 
                className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
              >
                {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit'}
              </button>
            </div>

            <div className="info-card">
              <h3>Credentials</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Medical License Number</label>
                  <input 
                    type="text" 
                    name="licenseNumber"
                    value={formData.licenseNumber} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input 
                    type="number" 
                    name="experience"
                    value={formData.experience} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Specialization</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Primary Specialty</label>
                  <input 
                    type="text" 
                    name="specialty"
                    value={formData.specialty} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Consultation Fee ($)</label>
                  <input 
                    type="number" 
                    name="consultationFee"
                    value={formData.consultationFee} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Hospital Affiliation</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input 
                    type="text" 
                    name="hospitalName"
                    value={formData.hospitalName} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Address</label>
                  <input 
                    type="text" 
                    name="hospitalAddress"
                    value={formData.hospitalAddress} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Education & Training</h2>
              <button className="btn btn-outline">+ Add</button>
            </div>

            <div className="info-card">
              <p className="info-text">No education history added yet. Click "+ Add" to add your educational background.</p>
            </div>
          </div>
        )}

        {/* Practice Settings Tab */}
        {activeTab === 'practice' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Practice Settings</h2>
              <button 
                className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
              >
                {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit'}
              </button>
            </div>

            <div className="info-card">
              <h3>Hospital Affiliation</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Hospital Name</label>
                  <input 
                    type="text" 
                    name="hospitalName"
                    value={formData.hospitalName} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Hospital Address</label>
                  <input 
                    type="text" 
                    name="hospitalAddress"
                    value={formData.hospitalAddress} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Consultation Fees</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Consultation Fee</label>
                  <div className="input-with-prefix">
                    <span>$</span>
                    <input 
                      type="number" 
                      name="consultationFee"
                      value={formData.consultationFee} 
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Practice Preferences</h3>
              <div className="toggle-settings">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Virtual Consultations</span>
                    <span className="toggle-desc">Allow patients to book video consultations</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Accept New Patients</span>
                    <span className="toggle-desc">Show availability to new patients</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Availability Schedule</h2>
              <button className="btn btn-outline">Edit Schedule</button>
            </div>

            <div className="info-card">
              <h3>Weekly Hours</h3>
              <div className="schedule-grid">
                {Object.entries(schedule).map(([day, daySchedule], index) => (
                  <div key={index} className={`schedule-day ${!daySchedule.available ? 'unavailable' : ''}`}>
                    <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    {daySchedule.available ? (
                      <div className="day-hours">
                        <span className="hours">{daySchedule.start} - {daySchedule.end}</span>
                      </div>
                    ) : (
                      <span className="unavailable-label">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h3>Time Off</h3>
              <p className="info-text">No scheduled time off</p>
              <button className="btn btn-outline btn-sm">+ Schedule Time Off</button>
            </div>

            <div className="info-card">
              <h3>Appointment Types</h3>
              <div className="appointment-types">
                <div className="type-item">
                  <span className="type-icon">👤</span>
                  <div className="type-info">
                    <span className="type-name">In-Person Visit</span>
                    <span className="type-duration">30 minutes</span>
                  </div>
                  <span className="type-status active">Active</span>
                </div>
                <div className="type-item">
                  <span className="type-icon">📹</span>
                  <div className="type-info">
                    <span className="type-name">Video Consultation</span>
                    <span className="type-duration">20 minutes</span>
                  </div>
                  <span className="type-status active">Active</span>
                </div>
                <div className="type-item">
                  <span className="type-icon">📝</span>
                  <div className="type-info">
                    <span className="type-name">New Patient Visit</span>
                    <span className="type-duration">45 minutes</span>
                  </div>
                  <span className="type-status active">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Security Settings</h2>
            </div>

            <div className="info-card">
              <h3>Password</h3>
              <p className="info-text">Last changed 30 days ago</p>
              <button className="btn btn-outline">Change Password</button>
            </div>

            <div className="info-card">
              <h3>Two-Factor Authentication</h3>
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Enable 2FA</span>
                  <span className="toggle-desc">Add an extra layer of security to your account</span>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="info-card">
              <h3>Active Sessions</h3>
              <div className="sessions-list">
                <div className="session-item current">
                  <span className="session-icon">💻</span>
                  <div className="session-info">
                    <span className="session-device">MacBook Pro - Chrome</span>
                    <span className="session-location">San Francisco, CA • Current session</span>
                  </div>
                </div>
                <div className="session-item">
                  <span className="session-icon">📱</span>
                  <div className="session-info">
                    <span className="session-device">iPhone 15 Pro - ClinRoute App</span>
                    <span className="session-location">San Francisco, CA • 2 hours ago</span>
                  </div>
                  <button className="btn btn-sm btn-outline">Revoke</button>
                </div>
              </div>
            </div>

            <div className="info-card danger">
              <h3>Danger Zone</h3>
              <div className="danger-actions">
                <div className="danger-item">
                  <div>
                    <span className="danger-label">Deactivate Account</span>
                    <span className="danger-desc">Temporarily disable your account</span>
                  </div>
                  <button className="btn btn-outline danger">Deactivate</button>
                </div>
                <div className="danger-item">
                  <div>
                    <span className="danger-label">Delete Account</span>
                    <span className="danger-desc">Permanently delete your account and all data</span>
                  </div>
                  <button className="btn btn-outline danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
