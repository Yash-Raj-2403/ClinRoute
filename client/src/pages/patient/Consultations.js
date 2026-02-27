import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientDashboard.css';

const Consultations = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const consultations = [
    {
      id: 'CLN-2024-001',
      title: 'Chest Pain Assessment',
      description: 'Sharp pain in left chest area, difficulty breathing during exercise',
      date: 'Dec 20, 2024',
      time: '2:30 PM',
      doctor: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      status: 'scheduled',
      priority: 'urgent',
      type: 'video',
      avatar: '👩‍⚕️'
    },
    {
      id: 'CLN-2024-002',
      title: 'Follow-up: Hypertension',
      description: 'Regular checkup for blood pressure monitoring',
      date: 'Dec 18, 2024',
      time: '10:00 AM',
      doctor: 'Dr. Michael Rodriguez',
      specialty: 'General Physician',
      status: 'in-progress',
      priority: 'moderate',
      type: 'video',
      avatar: '👨‍⚕️'
    },
    {
      id: 'CLN-2024-003',
      title: 'Migraine Consultation',
      description: 'Recurring headaches, sensitivity to light',
      date: 'Dec 15, 2024',
      time: '3:00 PM',
      doctor: 'Dr. Emily Watson',
      specialty: 'Neurologist',
      status: 'completed',
      priority: 'moderate',
      type: 'chat',
      avatar: '👩‍⚕️'
    },
    {
      id: 'CLN-2024-004',
      title: 'Annual Physical Exam',
      description: 'Routine annual health checkup',
      date: 'Dec 10, 2024',
      time: '11:00 AM',
      doctor: 'Dr. Michael Rodriguez',
      specialty: 'General Physician',
      status: 'completed',
      priority: 'routine',
      type: 'in-person',
      avatar: '👨‍⚕️'
    },
    {
      id: 'CLN-2024-005',
      title: 'Skin Rash Evaluation',
      description: 'Rash on arms, itching and redness',
      date: 'Dec 5, 2024',
      time: '4:30 PM',
      doctor: 'Dr. Jessica Lee',
      specialty: 'Dermatologist',
      status: 'completed',
      priority: 'routine',
      type: 'video',
      avatar: '👩‍⚕️'
    },
    {
      id: 'CLN-2024-006',
      title: 'Anxiety Assessment',
      description: 'Feeling overwhelmed, difficulty sleeping',
      date: 'Dec 1, 2024',
      time: '2:00 PM',
      doctor: 'Dr. David Park',
      specialty: 'Psychiatrist',
      status: 'cancelled',
      priority: 'moderate',
      type: 'video',
      avatar: '👨‍⚕️'
    }
  ];

  const filteredConsultations = consultations.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'scheduled': { label: 'Scheduled', class: 'status-scheduled' },
      'in-progress': { label: 'In Progress', class: 'status-progress' },
      'completed': { label: 'Completed', class: 'status-completed' },
      'cancelled': { label: 'Cancelled', class: 'status-cancelled' }
    };
    return statusConfig[status] || { label: status, class: '' };
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'urgent': { label: '🔴 Urgent', class: 'priority-urgent' },
      'moderate': { label: '🟡 Moderate', class: 'priority-moderate' },
      'routine': { label: '🟢 Routine', class: 'priority-routine' }
    };
    return priorityConfig[priority] || { label: priority, class: '' };
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      'video': { label: '📹 Video', class: 'type-video' },
      'chat': { label: '💬 Chat', class: 'type-chat' },
      'in-person': { label: '🏥 In-Person', class: 'type-inperson' }
    };
    return typeConfig[type] || { label: type, class: '' };
  };

  return (
    <div className="consultations-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>My Consultations</h1>
          <p>View and manage all your medical consultations</p>
        </div>
        <Link to="/patient/symptom-submission" className="btn btn-primary">
          <span>➕</span>
          New Consultation
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="consultations-toolbar">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
            <span className="tab-count">{consultations.length}</span>
          </button>
          <button 
            className={`filter-tab ${filter === 'scheduled' ? 'active' : ''}`}
            onClick={() => setFilter('scheduled')}
          >
            Scheduled
            <span className="tab-count">{consultations.filter(c => c.status === 'scheduled').length}</span>
          </button>
          <button 
            className={`filter-tab ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress
            <span className="tab-count">{consultations.filter(c => c.status === 'in-progress').length}</span>
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
            <span className="tab-count">{consultations.filter(c => c.status === 'completed').length}</span>
          </button>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search consultations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Consultations List */}
      <div className="consultations-list">
        {filteredConsultations.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <h3>No consultations found</h3>
            <p>Try adjusting your filters or start a new consultation</p>
            <Link to="/patient/symptom-submission" className="btn btn-primary">
              Start New Consultation
            </Link>
          </div>
        ) : (
          filteredConsultations.map(consultation => (
            <div key={consultation.id} className="consultation-card">
              <div className="card-left">
                <div className={`priority-indicator ${consultation.priority}`}></div>
                <div className="doctor-avatar">{consultation.avatar}</div>
              </div>
              
              <div className="card-main">
                <div className="card-top">
                  <div className="card-title-row">
                    <h3>{consultation.title}</h3>
                    <span className="consultation-id">{consultation.id}</span>
                  </div>
                  <p className="consultation-desc">{consultation.description}</p>
                </div>
                
                <div className="card-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span>{consultation.doctor} • {consultation.specialty}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span>{consultation.date} at {consultation.time}</span>
                  </div>
                </div>

                <div className="card-badges">
                  <span className={`badge ${getStatusBadge(consultation.status).class}`}>
                    {getStatusBadge(consultation.status).label}
                  </span>
                  <span className={`badge ${getPriorityBadge(consultation.priority).class}`}>
                    {getPriorityBadge(consultation.priority).label}
                  </span>
                  <span className={`badge ${getTypeBadge(consultation.type).class}`}>
                    {getTypeBadge(consultation.type).label}
                  </span>
                </div>
              </div>

              <div className="card-actions">
                {consultation.status === 'scheduled' && (
                  <>
                    <button className="btn btn-primary btn-sm">Join Call</button>
                    <button className="btn btn-outline btn-sm">Reschedule</button>
                  </>
                )}
                {consultation.status === 'in-progress' && (
                  <button className="btn btn-primary btn-sm">Continue</button>
                )}
                {consultation.status === 'completed' && (
                  <>
                    <Link to={`/patient/consultation/${consultation.id}`} className="btn btn-outline btn-sm">
                      View Details
                    </Link>
                    <button className="btn btn-outline btn-sm">Download Report</button>
                  </>
                )}
                {consultation.status === 'cancelled' && (
                  <button className="btn btn-outline btn-sm">Rebook</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredConsultations.length > 0 && (
        <div className="pagination">
          <button className="pagination-btn" disabled>← Previous</button>
          <div className="pagination-pages">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
          </div>
          <button className="pagination-btn">Next →</button>
        </div>
      )}
    </div>
  );
};

export default Consultations;
