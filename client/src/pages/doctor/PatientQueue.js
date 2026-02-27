import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DoctorDashboard.css';

const PatientQueue = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const patients = [
    {
      id: 'CLN-2024-089',
      patient: {
        name: 'Sarah Johnson',
        age: 45,
        gender: 'Female',
        avatar: '👩'
      },
      symptoms: {
        primary: 'Chest Pain',
        additional: ['Shortness of breath', 'Sweating'],
        severity: 9,
        duration: '2 hours'
      },
      triage: {
        priority: 'critical',
        score: 9,
        recommendation: 'Immediate cardiac evaluation required',
        riskFactors: ['Age > 40', 'Diabetes', 'Hypertension']
      },
      waitTime: '5 min',
      submittedAt: '9:45 AM',
      type: 'video',
      status: 'waiting'
    },
    {
      id: 'CLN-2024-091',
      patient: {
        name: 'Michael Chen',
        age: 62,
        gender: 'Male',
        avatar: '👨'
      },
      symptoms: {
        primary: 'Severe Headache',
        additional: ['Vision changes', 'Nausea'],
        severity: 8,
        duration: '6 hours'
      },
      triage: {
        priority: 'urgent',
        score: 8,
        recommendation: 'Neurological assessment recommended',
        riskFactors: ['Age > 60', 'History of migraines']
      },
      waitTime: '12 min',
      submittedAt: '9:38 AM',
      type: 'video',
      status: 'waiting'
    },
    {
      id: 'CLN-2024-094',
      patient: {
        name: 'Emily Davis',
        age: 38,
        gender: 'Female',
        avatar: '👩'
      },
      symptoms: {
        primary: 'High Fever',
        additional: ['Difficulty breathing', 'Cough'],
        severity: 7,
        duration: '2 days'
      },
      triage: {
        priority: 'urgent',
        score: 7,
        recommendation: 'Respiratory evaluation needed',
        riskFactors: ['Asthma history']
      },
      waitTime: '18 min',
      submittedAt: '9:32 AM',
      type: 'video',
      status: 'waiting'
    },
    {
      id: 'CLN-2024-097',
      patient: {
        name: 'Robert Wilson',
        age: 55,
        gender: 'Male',
        avatar: '👨'
      },
      symptoms: {
        primary: 'Abdominal Pain',
        additional: ['Bloating', 'Loss of appetite'],
        severity: 6,
        duration: '3 days'
      },
      triage: {
        priority: 'moderate',
        score: 6,
        recommendation: 'GI evaluation recommended',
        riskFactors: ['None identified']
      },
      waitTime: '25 min',
      submittedAt: '9:25 AM',
      type: 'chat',
      status: 'waiting'
    },
    {
      id: 'CLN-2024-099',
      patient: {
        name: 'Jennifer Brown',
        age: 29,
        gender: 'Female',
        avatar: '👩'
      },
      symptoms: {
        primary: 'Skin Rash',
        additional: ['Itching', 'Redness'],
        severity: 4,
        duration: '5 days'
      },
      triage: {
        priority: 'routine',
        score: 4,
        recommendation: 'Dermatological consultation',
        riskFactors: ['Allergies']
      },
      waitTime: '35 min',
      submittedAt: '9:15 AM',
      type: 'video',
      status: 'waiting'
    },
    {
      id: 'CLN-2024-085',
      patient: {
        name: 'David Lee',
        age: 42,
        gender: 'Male',
        avatar: '👨'
      },
      symptoms: {
        primary: 'Follow-up',
        additional: ['Blood pressure monitoring'],
        severity: 3,
        duration: 'N/A'
      },
      triage: {
        priority: 'routine',
        score: 3,
        recommendation: 'Routine follow-up',
        riskFactors: ['Controlled hypertension']
      },
      waitTime: '40 min',
      submittedAt: '9:10 AM',
      type: 'video',
      status: 'in-consultation'
    }
  ];

  const filteredPatients = patients.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'critical') return p.triage.priority === 'critical';
    if (filter === 'urgent') return p.triage.priority === 'urgent' || p.triage.priority === 'critical';
    return p.triage.priority === filter;
  }).sort((a, b) => {
    if (sortBy === 'priority') return b.triage.score - a.triage.score;
    if (sortBy === 'waitTime') return parseInt(a.waitTime) - parseInt(b.waitTime);
    return 0;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      'critical': '#DC2626',
      'urgent': '#F59E0B',
      'moderate': '#3B82F6',
      'routine': '#10B981'
    };
    return colors[priority] || '#6B7280';
  };

  return (
    <div className="patient-queue-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Patient Queue</h1>
          <p>AI-prioritized patient cases awaiting your review</p>
        </div>
        <div className="queue-stats">
          <div className="queue-stat critical">
            <span className="stat-count">1</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="queue-stat urgent">
            <span className="stat-count">2</span>
            <span className="stat-label">Urgent</span>
          </div>
          <div className="queue-stat moderate">
            <span className="stat-count">1</span>
            <span className="stat-label">Moderate</span>
          </div>
          <div className="queue-stat routine">
            <span className="stat-count">2</span>
            <span className="stat-label">Routine</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="queue-toolbar">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({patients.length})
          </button>
          <button 
            className={`filter-tab critical ${filter === 'critical' ? 'active' : ''}`}
            onClick={() => setFilter('critical')}
          >
            🚨 Critical
          </button>
          <button 
            className={`filter-tab urgent ${filter === 'urgent' ? 'active' : ''}`}
            onClick={() => setFilter('urgent')}
          >
            ⚠️ Urgent+
          </button>
          <button 
            className={`filter-tab ${filter === 'moderate' ? 'active' : ''}`}
            onClick={() => setFilter('moderate')}
          >
            Moderate
          </button>
          <button 
            className={`filter-tab ${filter === 'routine' ? 'active' : ''}`}
            onClick={() => setFilter('routine')}
          >
            Routine
          </button>
        </div>
        <div className="sort-controls">
          <span>Sort by:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority (Highest First)</option>
            <option value="waitTime">Wait Time (Shortest First)</option>
          </select>
        </div>
      </div>

      {/* Queue List */}
      <div className="queue-list">
        {filteredPatients.map((patient, index) => (
          <div 
            key={patient.id} 
            className={`queue-card ${patient.triage.priority} ${patient.status === 'in-consultation' ? 'in-progress' : ''}`}
          >
            <div className="queue-position">
              {patient.status === 'in-consultation' ? (
                <span className="in-progress-badge">IN PROGRESS</span>
              ) : (
                <span className="position-number">#{index + 1}</span>
              )}
            </div>

            <div className="queue-priority-indicator" style={{ backgroundColor: getPriorityColor(patient.triage.priority) }}></div>

            <div className="patient-section">
              <div className="patient-avatar">{patient.patient.avatar}</div>
              <div className="patient-details">
                <h3>{patient.patient.name}</h3>
                <p>{patient.patient.age}y, {patient.patient.gender}</p>
                <span className="case-id">{patient.id}</span>
              </div>
            </div>

            <div className="symptoms-section">
              <div className="symptom-header">
                <span className="primary-symptom">{patient.symptoms.primary}</span>
                <span className="severity-badge" style={{ backgroundColor: getPriorityColor(patient.triage.priority) }}>
                  Severity: {patient.symptoms.severity}/10
                </span>
              </div>
              <div className="additional-symptoms">
                {patient.symptoms.additional.map((symptom, i) => (
                  <span key={i} className="symptom-tag">{symptom}</span>
                ))}
              </div>
              <p className="symptom-duration">Duration: {patient.symptoms.duration}</p>
            </div>

            <div className="triage-section">
              <div className="triage-header">
                <span className={`priority-badge ${patient.triage.priority}`}>
                  {patient.triage.priority.toUpperCase()}
                </span>
                <span className="triage-score">AI Score: {patient.triage.score}/10</span>
              </div>
              <p className="triage-recommendation">{patient.triage.recommendation}</p>
              <div className="risk-factors">
                {patient.triage.riskFactors.map((risk, i) => (
                  <span key={i} className="risk-tag">⚠️ {risk}</span>
                ))}
              </div>
            </div>

            <div className="queue-meta">
              <div className="meta-item">
                <span className="meta-icon">⏳</span>
                <span className="meta-value">Waiting: {patient.waitTime}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📤</span>
                <span className="meta-value">Submitted: {patient.submittedAt}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">{patient.type === 'video' ? '📹' : '💬'}</span>
                <span className="meta-value">{patient.type === 'video' ? 'Video Call' : 'Chat'}</span>
              </div>
            </div>

            <div className="queue-actions">
              <Link to={`/doctor/case/${patient.id}`} className="btn btn-outline btn-sm">
                View Details
              </Link>
              {patient.status !== 'in-consultation' && (
                <button className="btn btn-primary btn-sm">
                  Start Consultation
                </button>
              )}
              {patient.status === 'in-consultation' && (
                <button className="btn btn-success btn-sm">
                  Continue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">✅</span>
          <h3>No patients in queue</h3>
          <p>All caught up! No patients matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PatientQueue;
