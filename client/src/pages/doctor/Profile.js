import React, { useState } from 'react';
import './DoctorDashboard.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  // Mock doctor data
  const doctorData = {
    personal: {
      firstName: 'Robert',
      lastName: 'Chen',
      email: 'dr.chen@clinroute.com',
      phone: '+1 (555) 987-6543',
      dob: '1978-05-15',
      gender: 'Male',
      address: '456 Medical Center Dr',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      avatar: '👨‍⚕️'
    },
    professional: {
      title: 'Dr.',
      specialty: 'Cardiology',
      subspecialty: 'Interventional Cardiology',
      licenseNumber: 'CA-MD-789456',
      npi: '1234567890',
      deaNumber: 'AC1234567',
      yearsExperience: 18,
      languages: ['English', 'Mandarin', 'Spanish'],
      boardCertifications: [
        { name: 'American Board of Internal Medicine', year: 2005 },
        { name: 'Cardiovascular Disease', year: 2008 },
        { name: 'Interventional Cardiology', year: 2010 }
      ]
    },
    education: [
      { degree: 'MD', institution: 'Stanford University School of Medicine', year: 2002 },
      { degree: 'Residency - Internal Medicine', institution: 'UCSF Medical Center', year: 2005 },
      { degree: 'Fellowship - Cardiology', institution: 'Johns Hopkins Hospital', year: 2008 },
      { degree: 'Fellowship - Interventional Cardiology', institution: 'Cleveland Clinic', year: 2010 }
    ],
    practice: {
      hospitalAffiliations: ['UCSF Medical Center', 'Stanford Health Care', 'California Pacific Medical Center'],
      acceptedInsurance: ['Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna', 'Medicare', 'Medicaid'],
      consultationFee: 200,
      followUpFee: 150,
      virtualConsultation: true,
      newPatients: true,
      avgRating: 4.9,
      totalReviews: 328
    },
    schedule: {
      monday: { available: true, start: '9:00 AM', end: '5:00 PM' },
      tuesday: { available: true, start: '9:00 AM', end: '5:00 PM' },
      wednesday: { available: true, start: '9:00 AM', end: '1:00 PM' },
      thursday: { available: true, start: '9:00 AM', end: '5:00 PM' },
      friday: { available: true, start: '9:00 AM', end: '3:00 PM' },
      saturday: { available: false },
      sunday: { available: false }
    },
    bio: 'Dr. Robert Chen is a board-certified cardiologist with over 18 years of experience in diagnosing and treating heart conditions. He specializes in interventional cardiology, focusing on minimally invasive procedures for coronary artery disease. Dr. Chen is passionate about preventive cardiology and patient education, believing that many heart conditions can be prevented through lifestyle modifications and early intervention.'
  };

  const stats = [
    { label: 'Patients Treated', value: '2,847', icon: '👥' },
    { label: 'Years Experience', value: '18', icon: '📅' },
    { label: 'Rating', value: '4.9', icon: '⭐' },
    { label: 'Reviews', value: '328', icon: '💬' }
  ];

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span>{doctorData.personal.avatar}</span>
              <button className="avatar-edit-btn">📷</button>
            </div>
            <div className="profile-title-info">
              <h1>{doctorData.personal.title} {doctorData.personal.firstName} {doctorData.personal.lastName}</h1>
              <p className="specialty">{doctorData.professional.specialty} • {doctorData.professional.subspecialty}</p>
              <div className="profile-badges">
                <span className="badge verified">✓ Verified</span>
                <span className="badge">📹 Telehealth Available</span>
                <span className="badge">👋 Accepting New Patients</span>
              </div>
            </div>
          </div>
          <div className="profile-stats">
            {stats.map((stat, index) => (
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
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="info-card">
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    value={doctorData.personal.firstName} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    value={doctorData.personal.lastName} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={doctorData.personal.email} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={doctorData.personal.phone} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    value={doctorData.personal.dob} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select disabled={!isEditing}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Address</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Street Address</label>
                  <input 
                    type="text" 
                    value={doctorData.personal.address} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={doctorData.personal.city} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text" 
                    value={doctorData.personal.state} 
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input 
                    type="text" 
                    value={doctorData.personal.zip} 
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
                  value={doctorData.bio}
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
              <button className="btn btn-outline">Edit</button>
            </div>

            <div className="info-card">
              <h3>Credentials</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Medical License Number</label>
                  <input type="text" value={doctorData.professional.licenseNumber} disabled />
                </div>
                <div className="form-group">
                  <label>NPI Number</label>
                  <input type="text" value={doctorData.professional.npi} disabled />
                </div>
                <div className="form-group">
                  <label>DEA Number</label>
                  <input type="text" value={doctorData.professional.deaNumber} disabled />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input type="text" value={doctorData.professional.yearsExperience} disabled />
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Specialization</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Primary Specialty</label>
                  <input type="text" value={doctorData.professional.specialty} disabled />
                </div>
                <div className="form-group">
                  <label>Subspecialty</label>
                  <input type="text" value={doctorData.professional.subspecialty} disabled />
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Board Certifications</h3>
              <div className="certifications-list">
                {doctorData.professional.boardCertifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <span className="cert-icon">🏅</span>
                    <div className="cert-info">
                      <span className="cert-name">{cert.name}</span>
                      <span className="cert-year">Certified {cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-sm">+ Add Certification</button>
            </div>

            <div className="info-card">
              <h3>Languages</h3>
              <div className="language-tags">
                {doctorData.professional.languages.map((lang, index) => (
                  <span key={index} className="language-tag">{lang}</span>
                ))}
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

            <div className="education-timeline">
              {doctorData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="timeline-marker">
                    <span className="marker-icon">🎓</span>
                  </div>
                  <div className="education-content">
                    <div className="education-header">
                      <h4>{edu.degree}</h4>
                      <span className="education-year">{edu.year}</span>
                    </div>
                    <p className="education-institution">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Settings Tab */}
        {activeTab === 'practice' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Practice Settings</h2>
              <button className="btn btn-outline">Edit</button>
            </div>

            <div className="info-card">
              <h3>Hospital Affiliations</h3>
              <div className="affiliations-list">
                {doctorData.practice.hospitalAffiliations.map((hospital, index) => (
                  <div key={index} className="affiliation-item">
                    <span className="affiliation-icon">🏥</span>
                    <span>{hospital}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-sm">+ Add Affiliation</button>
            </div>

            <div className="info-card">
              <h3>Accepted Insurance</h3>
              <div className="insurance-grid">
                {doctorData.practice.acceptedInsurance.map((insurance, index) => (
                  <div key={index} className="insurance-item">
                    <input type="checkbox" checked readOnly />
                    <label>{insurance}</label>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-sm">Manage Insurance</button>
            </div>

            <div className="info-card">
              <h3>Consultation Fees</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Initial Consultation</label>
                  <div className="input-with-prefix">
                    <span>$</span>
                    <input type="number" value={doctorData.practice.consultationFee} disabled />
                  </div>
                </div>
                <div className="form-group">
                  <label>Follow-up Visit</label>
                  <div className="input-with-prefix">
                    <span>$</span>
                    <input type="number" value={doctorData.practice.followUpFee} disabled />
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
                    <input type="checkbox" checked={doctorData.practice.virtualConsultation} readOnly />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Accept New Patients</span>
                    <span className="toggle-desc">Show availability to new patients</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={doctorData.practice.newPatients} readOnly />
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
                {Object.entries(doctorData.schedule).map(([day, schedule], index) => (
                  <div key={index} className={`schedule-day ${!schedule.available ? 'unavailable' : ''}`}>
                    <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    {schedule.available ? (
                      <div className="day-hours">
                        <span className="hours">{schedule.start} - {schedule.end}</span>
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
