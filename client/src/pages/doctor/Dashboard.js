import React from 'react';
import './DoctorDashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Pending Cases', value: 12, icon: '⏳', color: 'yellow', change: '+3 today' },
    { label: 'Completed Today', value: 8, icon: '✅', color: 'green', change: '2 more than yesterday' },
    { label: 'Urgent Cases', value: 3, icon: '🚨', color: 'red', change: 'Needs attention' },
    { label: 'Average Wait Time', value: '18min', icon: '⏱️', color: 'blue', change: '-5min from avg' }
  ];

  const urgentCases = [
    {
      id: 'CLN-2024-089',
      patient: 'Sarah Johnson',
      age: 45,
      symptoms: 'Chest pain, shortness of breath',
      priority: 'critical',
      waitTime: '5 min',
      triageScore: 9
    },
    {
      id: 'CLN-2024-091',
      patient: 'Michael Chen',
      age: 62,
      symptoms: 'Severe headache, vision changes',
      priority: 'urgent',
      waitTime: '12 min',
      triageScore: 8
    },
    {
      id: 'CLN-2024-094',
      patient: 'Emily Davis',
      age: 38,
      symptoms: 'High fever, difficulty breathing',
      priority: 'urgent',
      waitTime: '18 min',
      triageScore: 7
    }
  ];

  const todaySchedule = [
    { time: '9:00 AM', patient: 'Robert Wilson', type: 'Follow-up', status: 'completed' },
    { time: '9:30 AM', patient: 'Jennifer Brown', type: 'New Patient', status: 'completed' },
    { time: '10:00 AM', patient: 'David Lee', type: 'Consultation', status: 'current' },
    { time: '10:30 AM', patient: 'Lisa Martinez', type: 'Follow-up', status: 'upcoming' },
    { time: '11:00 AM', patient: 'James Taylor', type: 'New Patient', status: 'upcoming' },
    { time: '11:30 AM', patient: 'Amanda White', type: 'Consultation', status: 'upcoming' }
  ];

  const recentActivity = [
    { time: '10 min ago', action: 'Completed consultation with Robert Wilson', icon: '✅' },
    { time: '25 min ago', action: 'Prescribed medication for Jennifer Brown', icon: '💊' },
    { time: '1 hour ago', action: 'Requested lab tests for Mark Johnson', icon: '🧪' },
    { time: '2 hours ago', action: 'Updated treatment plan for Susan Clark', icon: '📋' }
  ];

  const getPriorityClass = (priority) => {
    const classes = {
      'critical': 'priority-critical',
      'urgent': 'priority-urgent',
      'moderate': 'priority-moderate',
      'routine': 'priority-routine'
    };
    return classes[priority] || '';
  };

  return (
    <div className="doctor-dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Good Morning, Dr. Chen! 👋</h1>
          <p>Here's your practice overview for today</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <span>📅</span>
            View Schedule
          </button>
          <button className="btn btn-primary">
            <span>📋</span>
            Patient Queue
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Urgent Cases */}
        <div className="dashboard-card urgent-cases-card">
          <div className="card-header">
            <h2>🚨 Urgent Cases Requiring Attention</h2>
            <a href="/doctor/queue" className="view-all">View All →</a>
          </div>
          <div className="urgent-cases-list">
            {urgentCases.map(caseItem => (
              <div key={caseItem.id} className={`urgent-case-item ${getPriorityClass(caseItem.priority)}`}>
                <div className="case-priority">
                  <span className={`priority-badge ${caseItem.priority}`}>
                    {caseItem.priority.toUpperCase()}
                  </span>
                  <span className="triage-score">Score: {caseItem.triageScore}/10</span>
                </div>
                <div className="case-info">
                  <h4>{caseItem.patient}, {caseItem.age}y</h4>
                  <p>{caseItem.symptoms}</p>
                  <span className="case-id">{caseItem.id}</span>
                </div>
                <div className="case-meta">
                  <span className="wait-time">⏳ Waiting: {caseItem.waitTime}</span>
                  <button className="btn btn-primary btn-sm">Review Case</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="dashboard-card schedule-card">
          <div className="card-header">
            <h2>📅 Today's Schedule</h2>
            <span className="schedule-date">December 20, 2024</span>
          </div>
          <div className="schedule-list">
            {todaySchedule.map((item, index) => (
              <div key={index} className={`schedule-item ${item.status}`}>
                <span className="schedule-time">{item.time}</span>
                <div className="schedule-info">
                  <span className="patient-name">{item.patient}</span>
                  <span className="appointment-type">{item.type}</span>
                </div>
                <span className={`schedule-status ${item.status}`}>
                  {item.status === 'completed' && '✓ Done'}
                  {item.status === 'current' && '● Now'}
                  {item.status === 'upcoming' && 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h2>🕐 Recent Activity</h2>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-icon">{activity.icon}</span>
                <div className="activity-info">
                  <p>{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card quick-stats-card">
          <div className="card-header">
            <h2>📊 Performance Today</h2>
          </div>
          <div className="performance-stats">
            <div className="performance-item">
              <div className="performance-bar">
                <div className="bar-fill" style={{ width: '85%' }}></div>
              </div>
              <div className="performance-info">
                <span className="performance-label">Patient Satisfaction</span>
                <span className="performance-value">85%</span>
              </div>
            </div>
            <div className="performance-item">
              <div className="performance-bar">
                <div className="bar-fill" style={{ width: '92%' }}></div>
              </div>
              <div className="performance-info">
                <span className="performance-label">Cases Resolved</span>
                <span className="performance-value">92%</span>
              </div>
            </div>
            <div className="performance-item">
              <div className="performance-bar green">
                <div className="bar-fill" style={{ width: '78%' }}></div>
              </div>
              <div className="performance-info">
                <span className="performance-label">Avg Response Time</span>
                <span className="performance-value">18 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="ai-insights-panel">
        <div className="insights-header">
          <span className="ai-badge">🤖 AI Insights</span>
          <h3>Recommended Actions</h3>
        </div>
        <div className="insights-content">
          <div className="insight-card">
            <span className="insight-icon">⚠️</span>
            <div className="insight-text">
              <h4>High-Risk Patient Alert</h4>
              <p>Sarah Johnson's symptoms indicate potential cardiac event. Recommend immediate ECG.</p>
            </div>
            <button className="btn btn-outline btn-sm">View Case</button>
          </div>
          <div className="insight-card">
            <span className="insight-icon">📈</span>
            <div className="insight-text">
              <h4>Treatment Pattern Detected</h4>
              <p>3 patients this week with similar respiratory symptoms. Consider environmental factors.</p>
            </div>
            <button className="btn btn-outline btn-sm">Analyze</button>
          </div>
          <div className="insight-card">
            <span className="insight-icon">🔔</span>
            <div className="insight-text">
              <h4>Follow-up Reminder</h4>
              <p>5 patients due for follow-up consultations this week.</p>
            </div>
            <button className="btn btn-outline btn-sm">Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
