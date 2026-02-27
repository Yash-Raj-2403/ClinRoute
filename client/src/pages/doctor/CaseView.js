import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DoctorDashboard.css';

const CaseView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Mock case data
  const caseData = {
    id: 'CLN-2024-089',
    status: 'in-consultation',
    createdAt: 'Dec 20, 2024 9:45 AM',
    patient: {
      name: 'Sarah Johnson',
      age: 45,
      gender: 'Female',
      dob: 'March 15, 1979',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      address: '123 Oak Street, San Francisco, CA 94102',
      avatar: '👩',
      insuranceProvider: 'Blue Cross Blue Shield',
      insuranceId: 'BCB-789456123'
    },
    symptoms: {
      primary: 'Chest Pain',
      severity: 9,
      duration: '2 hours',
      additional: ['Shortness of breath', 'Sweating', 'Nausea'],
      description: 'Sharp pain in left chest area that started suddenly during rest. Pain radiates to left arm. Patient reports feeling anxious and sweaty. No relief with position change.'
    },
    vitals: {
      bloodPressure: '145/92',
      heartRate: '98',
      temperature: '98.6',
      respiratoryRate: '22',
      oxygenSaturation: '96%'
    },
    medicalHistory: {
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      medications: ['Metformin 500mg (twice daily)', 'Lisinopril 10mg (daily)'],
      allergies: ['Penicillin'],
      surgeries: ['Appendectomy (2015)'],
      familyHistory: ['Father: Heart disease', 'Mother: Diabetes']
    },
    triage: {
      priority: 'critical',
      score: 9,
      timestamp: '9:47 AM',
      recommendation: 'Immediate cardiac evaluation required. ECG and cardiac enzymes recommended.',
      riskFactors: ['Age > 40', 'Diabetes', 'Hypertension', 'Family history of heart disease'],
      differentialDiagnosis: [
        { condition: 'Acute Coronary Syndrome', probability: 'High' },
        { condition: 'Unstable Angina', probability: 'Moderate' },
        { condition: 'GERD', probability: 'Low' }
      ]
    },
    previousVisits: [
      { date: 'Nov 15, 2024', reason: 'Blood pressure follow-up', doctor: 'Dr. Chen' },
      { date: 'Oct 5, 2024', reason: 'Diabetes management', doctor: 'Dr. Rodriguez' },
      { date: 'Aug 20, 2024', reason: 'Annual physical', doctor: 'Dr. Chen' }
    ]
  };

  return (
    <div className="case-view-page">
      {/* Back Navigation */}
      <div className="back-nav">
        <Link to="/doctor/queue" className="back-link">
          ← Back to Patient Queue
        </Link>
      </div>

      {/* Case Header */}
      <div className="case-header">
        <div className="case-header-left">
          <div className="patient-avatar-large">{caseData.patient.avatar}</div>
          <div className="case-header-info">
            <div className="case-badges">
              <span className={`priority-badge ${caseData.triage.priority}`}>
                🚨 {caseData.triage.priority.toUpperCase()} PRIORITY
              </span>
              <span className="status-badge in-progress">In Consultation</span>
            </div>
            <h1>{caseData.patient.name}</h1>
            <p className="patient-meta">
              {caseData.patient.age}y, {caseData.patient.gender} • 
              Case ID: {caseData.id} • 
              Created: {caseData.createdAt}
            </p>
          </div>
        </div>
        <div className="case-header-actions">
          <button className="btn btn-outline">
            <span>📞</span> Call Patient
          </button>
          <button className="btn btn-outline">
            <span>💬</span> Send Message
          </button>
          <button className="btn btn-primary">
            <span>📹</span> Start Video Call
          </button>
        </div>
      </div>

      {/* Urgent Alert */}
      <div className="urgent-alert">
        <div className="alert-content">
          <span className="alert-icon">⚠️</span>
          <div className="alert-text">
            <strong>AI Alert: High-Risk Cardiac Symptoms</strong>
            <p>Patient presenting with classic cardiac symptoms. Immediate ECG and troponin levels recommended.</p>
          </div>
        </div>
        <button className="btn btn-outline btn-sm">Order Tests</button>
      </div>

      {/* Tabs Navigation */}
      <div className="case-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'symptoms' ? 'active' : ''}`}
          onClick={() => setActiveTab('symptoms')}
        >
          Symptoms
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Medical History
        </button>
        <button 
          className={`tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          Vitals
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ai-analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-analysis')}
        >
          AI Analysis
        </button>
      </div>

      {/* Tab Content */}
      <div className="case-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview-tab">
            <div className="content-grid">
              {/* Patient Info Card */}
              <div className="info-card">
                <h3>Patient Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Date of Birth</span>
                    <span className="info-value">{caseData.patient.dob}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{caseData.patient.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{caseData.patient.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address</span>
                    <span className="info-value">{caseData.patient.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Insurance</span>
                    <span className="info-value">{caseData.patient.insuranceProvider}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Insurance ID</span>
                    <span className="info-value">{caseData.patient.insuranceId}</span>
                  </div>
                </div>
              </div>

              {/* Chief Complaint Card */}
              <div className="info-card highlight">
                <h3>Chief Complaint</h3>
                <div className="complaint-header">
                  <span className="primary-complaint">{caseData.symptoms.primary}</span>
                  <span className="severity-indicator critical">
                    Severity: {caseData.symptoms.severity}/10
                  </span>
                </div>
                <p className="complaint-description">{caseData.symptoms.description}</p>
                <div className="complaint-meta">
                  <span>Duration: {caseData.symptoms.duration}</span>
                </div>
              </div>

              {/* Quick Vitals */}
              <div className="info-card">
                <h3>Current Vitals</h3>
                <div className="vitals-grid">
                  <div className="vital-item warning">
                    <span className="vital-icon">💓</span>
                    <div className="vital-info">
                      <span className="vital-label">Blood Pressure</span>
                      <span className="vital-value">{caseData.vitals.bloodPressure}</span>
                    </div>
                  </div>
                  <div className="vital-item warning">
                    <span className="vital-icon">❤️</span>
                    <div className="vital-info">
                      <span className="vital-label">Heart Rate</span>
                      <span className="vital-value">{caseData.vitals.heartRate} bpm</span>
                    </div>
                  </div>
                  <div className="vital-item">
                    <span className="vital-icon">🌡️</span>
                    <div className="vital-info">
                      <span className="vital-label">Temperature</span>
                      <span className="vital-value">{caseData.vitals.temperature}°F</span>
                    </div>
                  </div>
                  <div className="vital-item">
                    <span className="vital-icon">🫁</span>
                    <div className="vital-info">
                      <span className="vital-label">O2 Saturation</span>
                      <span className="vital-value">{caseData.vitals.oxygenSaturation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Visits */}
              <div className="info-card">
                <h3>Recent Visits</h3>
                <div className="visits-list">
                  {caseData.previousVisits.map((visit, index) => (
                    <div key={index} className="visit-item">
                      <span className="visit-date">{visit.date}</span>
                      <span className="visit-reason">{visit.reason}</span>
                      <span className="visit-doctor">{visit.doctor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <div className="tab-content symptoms-tab">
            <div className="info-card">
              <h3>Symptom Details</h3>
              <div className="symptom-detail">
                <div className="symptom-main">
                  <h4>Primary Symptom</h4>
                  <div className="symptom-display">
                    <span className="symptom-name">{caseData.symptoms.primary}</span>
                    <div className="severity-meter">
                      {[...Array(10)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`meter-segment ${i < caseData.symptoms.severity ? 'filled' : ''} ${i < 3 ? 'low' : i < 6 ? 'medium' : 'high'}`}
                        ></span>
                      ))}
                      <span className="severity-text">{caseData.symptoms.severity}/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="symptom-secondary">
                  <h4>Additional Symptoms</h4>
                  <div className="symptom-tags">
                    {caseData.symptoms.additional.map((symptom, i) => (
                      <span key={i} className="symptom-tag">{symptom}</span>
                    ))}
                  </div>
                </div>

                <div className="symptom-narrative">
                  <h4>Patient's Description</h4>
                  <blockquote>{caseData.symptoms.description}</blockquote>
                </div>

                <div className="symptom-timeline">
                  <h4>Duration</h4>
                  <p>{caseData.symptoms.duration}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical History Tab */}
        {activeTab === 'history' && (
          <div className="tab-content history-tab">
            <div className="history-grid">
              <div className="info-card">
                <h3>Existing Conditions</h3>
                <ul className="history-list">
                  {caseData.medicalHistory.conditions.map((condition, i) => (
                    <li key={i}>{condition}</li>
                  ))}
                </ul>
              </div>

              <div className="info-card">
                <h3>Current Medications</h3>
                <ul className="history-list medications">
                  {caseData.medicalHistory.medications.map((med, i) => (
                    <li key={i}>💊 {med}</li>
                  ))}
                </ul>
              </div>

              <div className="info-card warning">
                <h3>⚠️ Allergies</h3>
                <ul className="history-list allergies">
                  {caseData.medicalHistory.allergies.map((allergy, i) => (
                    <li key={i}>{allergy}</li>
                  ))}
                </ul>
              </div>

              <div className="info-card">
                <h3>Surgical History</h3>
                <ul className="history-list">
                  {caseData.medicalHistory.surgeries.map((surgery, i) => (
                    <li key={i}>{surgery}</li>
                  ))}
                </ul>
              </div>

              <div className="info-card">
                <h3>Family History</h3>
                <ul className="history-list">
                  {caseData.medicalHistory.familyHistory.map((history, i) => (
                    <li key={i}>{history}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Vitals Tab */}
        {activeTab === 'vitals' && (
          <div className="tab-content vitals-tab">
            <div className="vitals-dashboard">
              <div className="vital-card large warning">
                <div className="vital-header">
                  <span className="vital-icon">💓</span>
                  <span className="vital-status">⚠️ Elevated</span>
                </div>
                <div className="vital-body">
                  <span className="vital-value">{caseData.vitals.bloodPressure}</span>
                  <span className="vital-unit">mmHg</span>
                </div>
                <span className="vital-label">Blood Pressure</span>
                <div className="vital-range">Normal: 90/60 - 120/80</div>
              </div>

              <div className="vital-card large warning">
                <div className="vital-header">
                  <span className="vital-icon">❤️</span>
                  <span className="vital-status">⚠️ Elevated</span>
                </div>
                <div className="vital-body">
                  <span className="vital-value">{caseData.vitals.heartRate}</span>
                  <span className="vital-unit">bpm</span>
                </div>
                <span className="vital-label">Heart Rate</span>
                <div className="vital-range">Normal: 60-100</div>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <span className="vital-icon">🌡️</span>
                  <span className="vital-status normal">✓ Normal</span>
                </div>
                <div className="vital-body">
                  <span className="vital-value">{caseData.vitals.temperature}</span>
                  <span className="vital-unit">°F</span>
                </div>
                <span className="vital-label">Temperature</span>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <span className="vital-icon">🫁</span>
                  <span className="vital-status normal">✓ Normal</span>
                </div>
                <div className="vital-body">
                  <span className="vital-value">{caseData.vitals.respiratoryRate}</span>
                  <span className="vital-unit">/min</span>
                </div>
                <span className="vital-label">Respiratory Rate</span>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <span className="vital-icon">💨</span>
                  <span className="vital-status normal">✓ Normal</span>
                </div>
                <div className="vital-body">
                  <span className="vital-value">{caseData.vitals.oxygenSaturation}</span>
                  <span className="vital-unit"></span>
                </div>
                <span className="vital-label">O2 Saturation</span>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'ai-analysis' && (
          <div className="tab-content ai-tab">
            <div className="ai-analysis-grid">
              <div className="info-card ai-card">
                <div className="ai-header">
                  <span className="ai-badge">🤖 RAG Triage Analysis</span>
                  <span className="ai-timestamp">Generated at {caseData.triage.timestamp}</span>
                </div>
                
                <div className="triage-summary">
                  <div className="triage-score-display">
                    <div className={`score-circle ${caseData.triage.priority}`}>
                      <span className="score-value">{caseData.triage.score}</span>
                      <span className="score-max">/10</span>
                    </div>
                    <div className="score-info">
                      <span className={`priority-label ${caseData.triage.priority}`}>
                        {caseData.triage.priority.toUpperCase()} PRIORITY
                      </span>
                      <p>Immediate attention required</p>
                    </div>
                  </div>
                </div>

                <div className="ai-recommendation">
                  <h4>AI Recommendation</h4>
                  <p>{caseData.triage.recommendation}</p>
                </div>

                <div className="risk-factors-section">
                  <h4>Identified Risk Factors</h4>
                  <div className="risk-tags">
                    {caseData.triage.riskFactors.map((risk, i) => (
                      <span key={i} className="risk-tag">⚠️ {risk}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Differential Diagnosis</h3>
                <p className="card-subtitle">AI-suggested possible conditions</p>
                <div className="diagnosis-list">
                  {caseData.triage.differentialDiagnosis.map((diag, i) => (
                    <div key={i} className={`diagnosis-item ${diag.probability.toLowerCase()}`}>
                      <span className="diagnosis-name">{diag.condition}</span>
                      <span className={`probability-badge ${diag.probability.toLowerCase()}`}>
                        {diag.probability} probability
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h3>Recommended Tests</h3>
                <div className="tests-list">
                  <div className="test-item">
                    <input type="checkbox" id="ecg" />
                    <label htmlFor="ecg">ECG / EKG</label>
                    <span className="test-urgency critical">STAT</span>
                  </div>
                  <div className="test-item">
                    <input type="checkbox" id="troponin" />
                    <label htmlFor="troponin">Troponin I/T</label>
                    <span className="test-urgency critical">STAT</span>
                  </div>
                  <div className="test-item">
                    <input type="checkbox" id="cbc" />
                    <label htmlFor="cbc">Complete Blood Count</label>
                    <span className="test-urgency">Routine</span>
                  </div>
                  <div className="test-item">
                    <input type="checkbox" id="cmp" />
                    <label htmlFor="cmp">Comprehensive Metabolic Panel</label>
                    <span className="test-urgency">Routine</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-block">Order Selected Tests</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="case-action-bar">
        <div className="action-bar-left">
          <button className="btn btn-outline">
            <span>📝</span> Add Notes
          </button>
          <button className="btn btn-outline">
            <span>🧪</span> Order Tests
          </button>
          <button className="btn btn-outline" onClick={() => setShowPrescriptionModal(true)}>
            <span>💊</span> Write Prescription
          </button>
        </div>
        <div className="action-bar-right">
          <button className="btn btn-outline">Refer to Specialist</button>
          <button className="btn btn-success">Complete Consultation</button>
        </div>
      </div>

      {/* Prescription Modal Placeholder */}
      {showPrescriptionModal && (
        <div className="modal-overlay" onClick={() => setShowPrescriptionModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Write Prescription</h2>
              <button className="close-btn" onClick={() => setShowPrescriptionModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Medication Name</label>
                <input type="text" placeholder="Enter medication name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Dosage</label>
                  <input type="text" placeholder="e.g., 500mg" />
                </div>
                <div className="form-group">
                  <label>Frequency</label>
                  <select>
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>As needed</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" placeholder="e.g., 7 days" />
              </div>
              <div className="form-group">
                <label>Instructions</label>
                <textarea placeholder="Special instructions for the patient"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowPrescriptionModal(false)}>Cancel</button>
              <button className="btn btn-primary">Add Prescription</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseView;
