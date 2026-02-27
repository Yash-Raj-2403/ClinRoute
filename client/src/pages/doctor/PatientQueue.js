import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import './DoctorDashboard.css';

const PatientQueue = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queueStats, setQueueStats] = useState({
    critical: 0,
    urgent: 0,
    moderate: 0,
    routine: 0
  });

  // Fetch patient queue from database
  useEffect(() => {
    const fetchQueue = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Get consultations where this doctor is assigned OR from patients in general
        const { data: consultations, error } = await supabase
          .from('consultations')
          .select(`
            id,
            consultation_code,
            patient_id,
            symptoms,
            triage_priority,
            triage_score,
            triage_recommendation,
            risk_factors,
            status,
            submitted_at,
            profiles!consultations_patient_id_fkey (
              name,
              age,
              gender,
              phone
            )
          `)
          .in('status', ['submitted', 'in_queue', 'assigned', 'in_progress'])
          .order('triage_score', { ascending: false });

        if (error) throw error;

        // Transform data to match UI format
        const transformedPatients = (consultations || []).map((c) => {
          const waitTimeMs = new Date() - new Date(c.submitted_at);
          const waitTimeMinutes = Math.floor(waitTimeMs / 60000);
          const symptoms = c.symptoms || {};
          
          return {
            id: c.consultation_code || c.id,
            dbId: c.id,
            patient: {
              name: c.profiles?.name || 'Unknown Patient',
              age: c.profiles?.age || 0,
              gender: c.profiles?.gender || 'Unknown',
              avatar: c.profiles?.gender === 'female' ? '👩' : '👨'
            },
            symptoms: {
              primary: symptoms.primary_symptom || symptoms.mainSymptom || 'Not specified',
              additional: symptoms.additional_symptoms || symptoms.otherSymptoms || [],
              severity: c.triage_score || 5,
              duration: symptoms.duration || 'Unknown'
            },
            triage: {
              priority: c.triage_priority || 'routine',
              score: c.triage_score || 5,
              recommendation: c.triage_recommendation || 'Review required',
              riskFactors: c.risk_factors || []
            },
            waitTime: waitTimeMinutes < 60 
              ? `${waitTimeMinutes} min` 
              : `${Math.floor(waitTimeMinutes / 60)}h ${waitTimeMinutes % 60}m`,
            submittedAt: new Date(c.submitted_at).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            }),
            type: 'video',
            status: c.status === 'in_progress' ? 'in-consultation' : 'waiting'
          };
        });

        setPatients(transformedPatients);

        // Calculate stats
        const stats = {
          critical: transformedPatients.filter(p => p.triage.priority === 'critical').length,
          urgent: transformedPatients.filter(p => p.triage.priority === 'urgent').length,
          moderate: transformedPatients.filter(p => p.triage.priority === 'moderate').length,
          routine: transformedPatients.filter(p => p.triage.priority === 'routine').length
        };
        setQueueStats(stats);

      } catch (err) {
        console.error('Error fetching patient queue:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, [user?.id]);

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

  if (loading) {
    return (
      <div className="patient-queue-page">
        <div className="page-header">
          <div className="header-content">
            <h1>Patient Queue</h1>
            <p>Loading patient queue...</p>
          </div>
        </div>
      </div>
    );
  }

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
            <span className="stat-count">{queueStats.critical}</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="queue-stat urgent">
            <span className="stat-count">{queueStats.urgent}</span>
            <span className="stat-label">Urgent</span>
          </div>
          <div className="queue-stat moderate">
            <span className="stat-count">{queueStats.moderate}</span>
            <span className="stat-label">Moderate</span>
          </div>
          <div className="queue-stat routine">
            <span className="stat-count">{queueStats.routine}</span>
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
