import React from 'react';
import './PatientDashboard.css';

const Dashboard = () => {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM',
      type: 'Video Consultation',
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Rodriguez',
      specialty: 'General Physician',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'In-Person',
      avatar: '👨‍⚕️'
    }
  ];

  const recentConsultations = [
    {
      id: 1,
      title: 'Chest Pain Assessment',
      date: 'Dec 15, 2024',
      status: 'Completed',
      priority: 'urgent',
      doctor: 'Dr. Sarah Chen'
    },
    {
      id: 2,
      title: 'Annual Checkup',
      date: 'Dec 10, 2024',
      status: 'Completed',
      priority: 'routine',
      doctor: 'Dr. Michael Rodriguez'
    },
    {
      id: 3,
      title: 'Migraine Follow-up',
      date: 'Dec 5, 2024',
      status: 'Completed',
      priority: 'moderate',
      doctor: 'Dr. Emily Watson'
    }
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: '❤️' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: '💓' },
    { label: 'Weight', value: '165', unit: 'lbs', status: 'normal', icon: '⚖️' },
    { label: 'BMI', value: '23.5', unit: '', status: 'normal', icon: '📊' }
  ];

  return (
    <div className="patient-dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, Sarah! 👋</h1>
          <p>Here's an overview of your health journey</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <span>➕</span>
            New Consultation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div className="stat-info">
            <span className="stat-value">12</span>
            <span className="stat-label">Total Consultations</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <span className="stat-value">10</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⏳</div>
          <div className="stat-info">
            <span className="stat-value">2</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📅</div>
          <div className="stat-info">
            <span className="stat-value">3</span>
            <span className="stat-label">Upcoming Appointments</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Upcoming Appointments */}
        <div className="dashboard-card appointments-card">
          <div className="card-header">
            <h2>Upcoming Appointments</h2>
            <a href="/patient/consultations" className="view-all">View All →</a>
          </div>
          <div className="appointments-list">
            {upcomingAppointments.map(apt => (
              <div key={apt.id} className="appointment-item">
                <div className="apt-avatar">{apt.avatar}</div>
                <div className="apt-info">
                  <h4>{apt.doctor}</h4>
                  <p>{apt.specialty}</p>
                  <div className="apt-meta">
                    <span className="apt-date">📅 {apt.date}, {apt.time}</span>
                    <span className="apt-type">{apt.type}</span>
                  </div>
                </div>
                <div className="apt-actions">
                  <button className="btn btn-outline btn-sm">Reschedule</button>
                  <button className="btn btn-primary btn-sm">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Metrics */}
        <div className="dashboard-card metrics-card">
          <div className="card-header">
            <h2>Health Metrics</h2>
            <a href="/patient/reports" className="view-all">View Reports →</a>
          </div>
          <div className="metrics-grid">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <span className="metric-icon">{metric.icon}</span>
                <div className="metric-info">
                  <span className="metric-label">{metric.label}</span>
                  <span className="metric-value">
                    {metric.value} <small>{metric.unit}</small>
                  </span>
                </div>
                <span className={`metric-status ${metric.status}`}>
                  {metric.status === 'normal' && '✓ Normal'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="dashboard-card consultations-card">
          <div className="card-header">
            <h2>Recent Consultations</h2>
            <a href="/patient/consultations" className="view-all">View All →</a>
          </div>
          <div className="consultations-list">
            {recentConsultations.map(consultation => (
              <div key={consultation.id} className="consultation-item">
                <div className={`consultation-priority ${consultation.priority}`}></div>
                <div className="consultation-info">
                  <h4>{consultation.title}</h4>
                  <p>with {consultation.doctor}</p>
                </div>
                <div className="consultation-meta">
                  <span className="consultation-date">{consultation.date}</span>
                  <span className={`consultation-status ${consultation.status.toLowerCase()}`}>
                    {consultation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions-grid">
            <a href="/patient/symptom-submission" className="quick-action">
              <span className="action-icon">🩺</span>
              <span className="action-label">Submit Symptoms</span>
            </a>
            <a href="/patient/nearby-doctors" className="quick-action">
              <span className="action-icon">📍</span>
              <span className="action-label">Find Doctors</span>
            </a>
            <a href="/patient/reports" className="quick-action">
              <span className="action-icon">📄</span>
              <span className="action-label">View Reports</span>
            </a>
            <a href="/patient/consultations" className="quick-action">
              <span className="action-icon">💬</span>
              <span className="action-label">Messages</span>
            </a>
          </div>
        </div>
      </div>

      {/* AI Health Tips */}
      <div className="health-tips-section">
        <div className="tips-header">
          <span className="tips-icon">🤖</span>
          <h3>AI Health Insights</h3>
        </div>
        <div className="tips-content">
          <div className="tip-card">
            <span className="tip-icon">💧</span>
            <div className="tip-text">
              <h4>Stay Hydrated</h4>
              <p>Based on your activity level, aim for 8-10 glasses of water daily.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🏃</span>
            <div className="tip-text">
              <h4>Keep Moving</h4>
              <p>You've been less active this week. Try a 30-minute walk today.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-icon">😴</span>
            <div className="tip-text">
              <h4>Sleep Better</h4>
              <p>Aim for 7-9 hours of sleep to support your cardiovascular health.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
