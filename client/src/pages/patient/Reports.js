import React, { useState } from 'react';
import './PatientDashboard.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: 'Cardiology Consultation Report',
      type: 'consultation',
      doctor: 'Dr. Sarah Chen',
      date: 'Dec 15, 2024',
      status: 'completed',
      icon: '❤️',
      summary: 'ECG results normal. Blood pressure slightly elevated. Recommended lifestyle changes.',
      diagnosis: 'Mild hypertension',
      prescription: ['Lifestyle modifications', 'Continue current medications'],
      followUp: 'Jan 15, 2025'
    },
    {
      id: 2,
      title: 'Complete Blood Count (CBC)',
      type: 'lab',
      facility: 'City Lab Services',
      date: 'Dec 10, 2024',
      status: 'completed',
      icon: '🧪',
      summary: 'All values within normal range. No abnormalities detected.',
      results: [
        { name: 'WBC', value: '6.5', unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
        { name: 'RBC', value: '4.8', unit: 'M/uL', range: '4.5-5.5', status: 'normal' },
        { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '13.5-17.5', status: 'normal' },
        { name: 'Platelets', value: '250', unit: 'K/uL', range: '150-400', status: 'normal' }
      ]
    },
    {
      id: 3,
      title: 'Lipid Panel',
      type: 'lab',
      facility: 'City Lab Services',
      date: 'Dec 10, 2024',
      status: 'completed',
      icon: '📊',
      summary: 'Cholesterol levels slightly elevated. HDL could be improved.',
      results: [
        { name: 'Total Cholesterol', value: '215', unit: 'mg/dL', range: '<200', status: 'high' },
        { name: 'LDL', value: '130', unit: 'mg/dL', range: '<100', status: 'high' },
        { name: 'HDL', value: '45', unit: 'mg/dL', range: '>60', status: 'low' },
        { name: 'Triglycerides', value: '140', unit: 'mg/dL', range: '<150', status: 'normal' }
      ]
    },
    {
      id: 4,
      title: 'Annual Physical Examination',
      type: 'consultation',
      doctor: 'Dr. Michael Rodriguez',
      date: 'Dec 5, 2024',
      status: 'completed',
      icon: '🩺',
      summary: 'Overall health is good. BMI within normal range. Immunizations up to date.',
      vitals: [
        { name: 'Blood Pressure', value: '128/82', status: 'normal' },
        { name: 'Heart Rate', value: '72 bpm', status: 'normal' },
        { name: 'Temperature', value: '98.6°F', status: 'normal' },
        { name: 'BMI', value: '23.5', status: 'normal' }
      ],
      followUp: 'Dec 2025'
    },
    {
      id: 5,
      title: 'Chest X-Ray',
      type: 'imaging',
      facility: 'RadiologyOne',
      date: 'Nov 28, 2024',
      status: 'completed',
      icon: '📷',
      summary: 'No acute cardiopulmonary abnormality. Lungs clear. Heart size normal.',
      findings: 'Clear lung fields bilaterally. No evidence of pneumonia or mass lesions.'
    },
    {
      id: 6,
      title: 'Prescription - Lisinopril',
      type: 'prescription',
      doctor: 'Dr. Sarah Chen',
      date: 'Dec 15, 2024',
      status: 'active',
      icon: '💊',
      medication: 'Lisinopril 10mg',
      dosage: 'Once daily in the morning',
      quantity: '30 tablets',
      refills: '3 refills remaining'
    }
  ];

  const filteredReports = reports.filter(report => {
    if (activeTab === 'all') return true;
    return report.type === activeTab;
  });

  return (
    <div className="reports-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Medical Reports & Records</h1>
          <p>Access all your health documents in one place</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <span>📤</span> Export All
          </button>
          <button className="btn btn-primary">
            <span>📁</span> Upload Document
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="reports-stats">
        <div className="stat-box">
          <span className="stat-icon">📋</span>
          <div className="stat-content">
            <span className="stat-number">{reports.length}</span>
            <span className="stat-label">Total Reports</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">🧪</span>
          <div className="stat-content">
            <span className="stat-number">{reports.filter(r => r.type === 'lab').length}</span>
            <span className="stat-label">Lab Results</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">💊</span>
          <div className="stat-content">
            <span className="stat-number">{reports.filter(r => r.type === 'prescription').length}</span>
            <span className="stat-label">Prescriptions</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">📷</span>
          <div className="stat-content">
            <span className="stat-number">{reports.filter(r => r.type === 'imaging').length}</span>
            <span className="stat-label">Imaging</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="reports-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Reports
        </button>
        <button 
          className={`tab-btn ${activeTab === 'consultation' ? 'active' : ''}`}
          onClick={() => setActiveTab('consultation')}
        >
          Consultations
        </button>
        <button 
          className={`tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
          onClick={() => setActiveTab('lab')}
        >
          Lab Results
        </button>
        <button 
          className={`tab-btn ${activeTab === 'imaging' ? 'active' : ''}`}
          onClick={() => setActiveTab('imaging')}
        >
          Imaging
        </button>
        <button 
          className={`tab-btn ${activeTab === 'prescription' ? 'active' : ''}`}
          onClick={() => setActiveTab('prescription')}
        >
          Prescriptions
        </button>
      </div>

      {/* Reports Grid */}
      <div className="reports-content">
        <div className="reports-list">
          {filteredReports.map(report => (
            <div 
              key={report.id} 
              className={`report-card ${selectedReport?.id === report.id ? 'selected' : ''}`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="report-icon">{report.icon}</div>
              <div className="report-info">
                <h3>{report.title}</h3>
                <p className="report-meta">
                  {report.doctor || report.facility} • {report.date}
                </p>
                <p className="report-summary">{report.summary}</p>
              </div>
              <div className="report-actions">
                <span className={`report-status ${report.status}`}>
                  {report.status === 'active' ? '🟢 Active' : '✓ Completed'}
                </span>
                <button className="action-btn">📥</button>
              </div>
            </div>
          ))}
        </div>

        {/* Report Detail Panel */}
        {selectedReport && (
          <div className="report-detail">
            <div className="detail-header">
              <div className="detail-title">
                <span className="detail-icon">{selectedReport.icon}</span>
                <div>
                  <h2>{selectedReport.title}</h2>
                  <p>{selectedReport.date}</p>
                </div>
              </div>
              <div className="detail-actions">
                <button className="btn btn-outline btn-sm">
                  <span>🖨️</span> Print
                </button>
                <button className="btn btn-outline btn-sm">
                  <span>📥</span> Download
                </button>
                <button className="btn btn-outline btn-sm">
                  <span>📤</span> Share
                </button>
              </div>
            </div>

            <div className="detail-body">
              {/* Summary */}
              <div className="detail-section">
                <h4>Summary</h4>
                <p>{selectedReport.summary}</p>
              </div>

              {/* Lab Results */}
              {selectedReport.results && (
                <div className="detail-section">
                  <h4>Results</h4>
                  <div className="results-table">
                    <div className="results-header">
                      <span>Test</span>
                      <span>Value</span>
                      <span>Reference Range</span>
                      <span>Status</span>
                    </div>
                    {selectedReport.results.map((result, index) => (
                      <div key={index} className={`results-row ${result.status}`}>
                        <span>{result.name}</span>
                        <span>{result.value} {result.unit}</span>
                        <span>{result.range}</span>
                        <span className={`status-badge ${result.status}`}>
                          {result.status === 'normal' ? '✓ Normal' : 
                           result.status === 'high' ? '↑ High' : '↓ Low'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vitals */}
              {selectedReport.vitals && (
                <div className="detail-section">
                  <h4>Vitals</h4>
                  <div className="vitals-grid">
                    {selectedReport.vitals.map((vital, index) => (
                      <div key={index} className="vital-item">
                        <span className="vital-name">{vital.name}</span>
                        <span className="vital-value">{vital.value}</span>
                        <span className={`vital-status ${vital.status}`}>
                          {vital.status === 'normal' ? '✓ Normal' : '⚠ Attention'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnosis */}
              {selectedReport.diagnosis && (
                <div className="detail-section">
                  <h4>Diagnosis</h4>
                  <p className="diagnosis-text">{selectedReport.diagnosis}</p>
                </div>
              )}

              {/* Prescription Details */}
              {selectedReport.type === 'prescription' && (
                <div className="detail-section">
                  <h4>Prescription Details</h4>
                  <div className="prescription-info">
                    <div className="prescription-row">
                      <span className="label">Medication:</span>
                      <span className="value">{selectedReport.medication}</span>
                    </div>
                    <div className="prescription-row">
                      <span className="label">Dosage:</span>
                      <span className="value">{selectedReport.dosage}</span>
                    </div>
                    <div className="prescription-row">
                      <span className="label">Quantity:</span>
                      <span className="value">{selectedReport.quantity}</span>
                    </div>
                    <div className="prescription-row">
                      <span className="label">Refills:</span>
                      <span className="value">{selectedReport.refills}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block">
                    Request Refill
                  </button>
                </div>
              )}

              {/* Follow Up */}
              {selectedReport.followUp && (
                <div className="detail-section">
                  <h4>Follow-up Date</h4>
                  <div className="followup-box">
                    <span className="followup-icon">📅</span>
                    <span className="followup-date">{selectedReport.followUp}</span>
                    <button className="btn btn-outline btn-sm">Schedule</button>
                  </div>
                </div>
              )}

              {/* Doctor Info */}
              {selectedReport.doctor && (
                <div className="detail-section">
                  <h4>Doctor</h4>
                  <div className="doctor-info-box">
                    <span className="doctor-avatar">👨‍⚕️</span>
                    <div className="doctor-details">
                      <span className="doctor-name">{selectedReport.doctor}</span>
                      <button className="link-btn">View Profile →</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Selection State */}
        {!selectedReport && (
          <div className="no-selection">
            <span className="empty-icon">📄</span>
            <h3>Select a report to view details</h3>
            <p>Click on any report from the list to see full details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
