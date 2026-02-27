import React from 'react';
import { Link } from 'react-router-dom';
import './PatientDashboard.css';

const ConsultationStatus = () => {
  // Mock consultation data
  const consultation = {
    id: 'CLN-2024-001',
    title: 'Chest Pain Assessment',
    createdAt: 'Dec 18, 2024, 9:30 AM',
    status: 'in-progress',
    priority: 'urgent',
    type: 'video',
    symptoms: {
      primary: 'Chest Pain',
      duration: '1-3 days',
      severity: 7,
      additional: ['Sweating', 'Difficulty breathing', 'Fatigue'],
      description: 'Sharp pain in left chest area that occurs during exercise and sometimes at rest. Pain radiates to left arm occasionally.'
    },
    medicalHistory: {
      conditions: ['Hypertension'],
      medications: 'Lisinopril 10mg daily',
      allergies: 'None'
    },
    aiTriage: {
      priority: 'Urgent',
      recommendedSpecialty: 'Cardiology',
      estimatedWaitTime: '< 1 hour',
      riskFactors: ['Age > 40', 'History of Hypertension', 'Symptom severity 7/10'],
      recommendations: [
        'Immediate cardiology consultation recommended',
        'ECG assessment should be performed',
        'Avoid strenuous physical activity until cleared'
      ]
    },
    assignedDoctor: {
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      avatar: '👩‍⚕️',
      rating: 4.9,
      experience: '15 years',
      hospital: 'City Heart Center'
    },
    timeline: [
      { time: '9:30 AM', event: 'Consultation submitted', status: 'completed', icon: '✅' },
      { time: '9:32 AM', event: 'RAG triage completed', status: 'completed', icon: '🤖' },
      { time: '9:35 AM', event: 'Assigned to Dr. Sarah Chen', status: 'completed', icon: '👩‍⚕️' },
      { time: '9:45 AM', event: 'Doctor reviewing case', status: 'current', icon: '📋' },
      { time: 'Pending', event: 'Video consultation', status: 'pending', icon: '📹' },
      { time: 'Pending', event: 'Prescription & Report', status: 'pending', icon: '📄' }
    ],
    appointment: {
      date: 'Dec 18, 2024',
      time: '10:30 AM',
      countdown: '45 minutes'
    }
  };

  return (
    <div className="consultation-status-page">
      {/* Back Navigation */}
      <div className="back-nav">
        <Link to="/patient/consultations" className="back-link">
          ← Back to Consultations
        </Link>
      </div>

      {/* Status Header */}
      <div className="status-header">
        <div className="status-info">
          <div className="status-badges">
            <span className="badge priority-urgent">🔴 Urgent Priority</span>
            <span className="badge status-progress">In Progress</span>
          </div>
          <h1>{consultation.title}</h1>
          <p className="consultation-meta">
            Case ID: {consultation.id} • Created: {consultation.createdAt}
          </p>
        </div>
        <div className="status-actions">
          <button className="btn btn-outline">
            <span>💬</span> Message Doctor
          </button>
          <button className="btn btn-primary">
            <span>📹</span> Join Video Call
          </button>
        </div>
      </div>

      {/* Countdown Banner */}
      <div className="countdown-banner">
        <div className="countdown-content">
          <span className="countdown-icon">⏰</span>
          <div className="countdown-text">
            <strong>Your appointment starts in {consultation.appointment.countdown}</strong>
            <span>{consultation.appointment.date} at {consultation.appointment.time}</span>
          </div>
        </div>
        <button className="btn btn-primary">Join Now</button>
      </div>

      {/* Main Content Grid */}
      <div className="status-grid">
        {/* Left Column */}
        <div className="status-main">
          {/* RAG Triage Card */}
          <div className="status-card ai-triage-card">
            <div className="card-header">
              <h2>🤖 RAG Triage Analysis</h2>
              <span className="ai-badge">Powered by ClinRoute RAG</span>
            </div>
            <div className="card-content">
              <div className="triage-summary">
                <div className="triage-item">
                  <span className="triage-label">Priority Level</span>
                  <span className="triage-value urgent">{consultation.aiTriage.priority}</span>
                </div>
                <div className="triage-item">
                  <span className="triage-label">Recommended Specialty</span>
                  <span className="triage-value">{consultation.aiTriage.recommendedSpecialty}</span>
                </div>
                <div className="triage-item">
                  <span className="triage-label">Estimated Wait</span>
                  <span className="triage-value">{consultation.aiTriage.estimatedWaitTime}</span>
                </div>
              </div>

              <div className="triage-section">
                <h4>Risk Factors Identified</h4>
                <div className="risk-factors">
                  {consultation.aiTriage.riskFactors.map((factor, index) => (
                    <span key={index} className="risk-tag">⚠️ {factor}</span>
                  ))}
                </div>
              </div>

              <div className="triage-section">
                <h4>AI Recommendations</h4>
                <ul className="recommendations-list">
                  {consultation.aiTriage.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Submitted Symptoms */}
          <div className="status-card">
            <div className="card-header">
              <h2>Submitted Symptoms</h2>
              <button className="edit-btn">Edit</button>
            </div>
            <div className="card-content">
              <div className="symptom-summary">
                <div className="summary-row">
                  <span className="summary-label">Primary Symptom:</span>
                  <span className="summary-value">{consultation.symptoms.primary}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Duration:</span>
                  <span className="summary-value">{consultation.symptoms.duration}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Severity:</span>
                  <span className="summary-value">
                    <span className="severity-bar">
                      {[...Array(10)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`severity-dot ${i < consultation.symptoms.severity ? 'filled' : ''} ${i < 3 ? 'mild' : i < 6 ? 'moderate' : 'severe'}`}
                        ></span>
                      ))}
                    </span>
                    {consultation.symptoms.severity}/10
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Additional Symptoms:</span>
                  <span className="summary-value">
                    {consultation.symptoms.additional.map((s, i) => (
                      <span key={i} className="symptom-tag">{s}</span>
                    ))}
                  </span>
                </div>
              </div>
              <div className="symptom-description">
                <h4>Description</h4>
                <p>{consultation.symptoms.description}</p>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="status-card">
            <div className="card-header">
              <h2>Medical History</h2>
            </div>
            <div className="card-content">
              <div className="history-grid">
                <div className="history-item">
                  <span className="history-label">Existing Conditions</span>
                  <span className="history-value">
                    {consultation.medicalHistory.conditions.join(', ')}
                  </span>
                </div>
                <div className="history-item">
                  <span className="history-label">Current Medications</span>
                  <span className="history-value">{consultation.medicalHistory.medications}</span>
                </div>
                <div className="history-item">
                  <span className="history-label">Known Allergies</span>
                  <span className="history-value">{consultation.medicalHistory.allergies}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="status-sidebar">
          {/* Assigned Doctor */}
          <div className="status-card doctor-card">
            <div className="card-header">
              <h2>Assigned Doctor</h2>
            </div>
            <div className="card-content">
              <div className="doctor-profile">
                <div className="doctor-avatar-lg">{consultation.assignedDoctor.avatar}</div>
                <div className="doctor-info">
                  <h3>{consultation.assignedDoctor.name}</h3>
                  <p>{consultation.assignedDoctor.specialty}</p>
                  <div className="doctor-meta">
                    <span>⭐ {consultation.assignedDoctor.rating}</span>
                    <span>🏥 {consultation.assignedDoctor.hospital}</span>
                    <span>📅 {consultation.assignedDoctor.experience} experience</span>
                  </div>
                </div>
              </div>
              <div className="doctor-actions">
                <button className="btn btn-outline btn-block">View Profile</button>
                <button className="btn btn-outline btn-block">Send Message</button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="status-card timeline-card">
            <div className="card-header">
              <h2>Consultation Timeline</h2>
            </div>
            <div className="card-content">
              <div className="timeline">
                {consultation.timeline.map((item, index) => (
                  <div key={index} className={`timeline-item ${item.status}`}>
                    <div className="timeline-marker">
                      <span className="timeline-icon">{item.icon}</span>
                    </div>
                    <div className="timeline-content">
                      <span className="timeline-time">{item.time}</span>
                      <span className="timeline-event">{item.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="status-card">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="card-content">
              <div className="quick-actions-list">
                <button className="quick-action-btn">
                  <span>📄</span> Upload Documents
                </button>
                <button className="quick-action-btn">
                  <span>🔄</span> Reschedule Appointment
                </button>
                <button className="quick-action-btn">
                  <span>❌</span> Cancel Consultation
                </button>
                <button className="quick-action-btn">
                  <span>🆘</span> Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationStatus;
