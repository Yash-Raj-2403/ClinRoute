import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import './DoctorDashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingCases: 0,
    completedToday: 0,
    totalPatientsThisWeek: 0
  });
  const [urgentCases, setUrgentCases] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats using RPC
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_doctor_stats', { doc_id: user.id });
      
      if (!statsError && statsData) {
        setStats(statsData);
      }

      // Fetch urgent/pending consultations
      const { data: queueData, error: queueError } = await supabase
        .rpc('get_doctor_patient_queue', { doc_id: user.id });
      
      if (!queueError && queueData) {
        // Filter for urgent/critical only
        const urgent = queueData
          .filter(c => c.triage_priority === 'critical' || c.triage_priority === 'urgent')
          .slice(0, 3);
        setUrgentCases(urgent);
      }

      // Fetch today's appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .rpc('get_doctor_upcoming_appointments', { doc_id: user.id, days_ahead: 1 });
      
      if (!appointmentsError && appointmentsData) {
        const today = new Date().toDateString();
        const todayAppts = appointmentsData
          .filter(a => new Date(a.date_time).toDateString() === today)
          .map(a => ({
            ...a,
            time: new Date(a.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            status: a.status === 'completed' ? 'completed' : 
                    new Date(a.date_time) <= new Date() ? 'current' : 'upcoming'
          }));
        setTodaySchedule(todayAppts);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityClass = (priority) => {
    const classes = {
      'critical': 'priority-critical',
      'urgent': 'priority-urgent',
      'moderate': 'priority-moderate',
      'routine': 'priority-routine'
    };
    return classes[priority] || '';
  };

  if (loading) {
    return (
      <div className="doctor-dashboard">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Good Morning, Dr. {user?.name || 'Doctor'}! 👋</h1>
          <p>Here's your practice overview for today</p>
        </div>
        <div className="header-actions">
          <Link to="/doctor/appointments" className="btn btn-outline">
            <span>📅</span>
            View Schedule
          </Link>
          <Link to="/doctor/queue" className="btn btn-primary">
            <span>📋</span>
            Patient Queue
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card yellow">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <span className="stat-value">{stats.pendingCases}</span>
            <span className="stat-label">Pending Cases</span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-value">{stats.completedToday}</span>
            <span className="stat-label">Completed Today</span>
          </div>
        </div>
        <div className="stat-card red">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <span className="stat-value">{urgentCases.length}</span>
            <span className="stat-label">Urgent Cases</span>
          </div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-value">{stats.todayAppointments}</span>
            <span className="stat-label">Today's Appointments</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Urgent Cases */}
        <div className="dashboard-card urgent-cases-card">
          <div className="card-header">
            <h2>🚨 Urgent Cases Requiring Attention</h2>
            <Link to="/doctor/queue" className="view-all">View All →</Link>
          </div>
          <div className="urgent-cases-list">
            {urgentCases.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                No urgent cases at the moment
              </p>
            ) : (
              urgentCases.map(caseItem => (
                <div key={caseItem.id} className={`urgent-case-item ${getPriorityClass(caseItem.triage_priority)}`}>
                  <div className="case-priority">
                    <span className={`priority-badge ${caseItem.triage_priority}`}>
                      {caseItem.triage_priority?.toUpperCase() || 'N/A'}
                    </span>
                    <span className="triage-score">
                      Score: {caseItem.triage_score ? caseItem.triage_score.toFixed(1) : 'N/A'}/10
                    </span>
                  </div>
                  <div className="case-info">
                    <h4>{caseItem.patient_name}, {caseItem.patient_age}y</h4>
                    <p>{caseItem.symptoms?.primary || 'No symptoms listed'}</p>
                    <span className="case-id">{caseItem.consultation_code}</span>
                  </div>
                  <div className="case-meta">
                    <span className="wait-time">
                      ⏳ Waiting: {Math.round(caseItem.wait_time_minutes)} min
                    </span>
                    <Link to={`/doctor/cases/${caseItem.id}`} className="btn btn-primary btn-sm">
                      Review Case
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="dashboard-card schedule-card">
          <div className="card-header">
            <h2>📅 Today's Schedule</h2>
            <span className="schedule-date">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="schedule-list">
            {todaySchedule.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                No appointments scheduled for today
              </p>
            ) : (
              todaySchedule.map((item, index) => (
                <div key={index} className={`schedule-item ${item.status}`}>
                  <span className="schedule-time">{item.time}</span>
                  <div className="schedule-info">
                    <span className="patient-name">{item.patient_name}</span>
                    <span className="appointment-type">{item.type || item.reason}</span>
                  </div>
                  <span className={`schedule-status ${item.status}`}>
                    {item.status === 'completed' && '✓ Done'}
                    {item.status === 'current' && '● Now'}
                    {item.status === 'upcoming' && 'Upcoming'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card quick-stats-card">
          <div className="card-header">
            <h2>📊 This Week</h2>
          </div>
          <div className="performance-stats">
            <div className="performance-item">
              <div className="performance-info">
                <span className="performance-label">Total Patients</span>
                <span className="performance-value">{stats.totalPatientsThisWeek}</span>
              </div>
            </div>
            <div className="performance-item">
              <div className="performance-info">
                <span className="performance-label">Pending Cases</span>
                <span className="performance-value">{stats.pendingCases}</span>
              </div>
            </div>
            <div className="performance-item">
              <div className="performance-info">
                <span className="performance-label">Completed Today</span>
                <span className="performance-value">{stats.completedToday}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
