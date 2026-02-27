import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DoctorDashboard.css';

const Appointments = () => {
  const [viewMode, setViewMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      time: '9:00 AM',
      endTime: '9:30 AM',
      patient: 'Sarah Johnson',
      avatar: '👩',
      type: 'Follow-up',
      status: 'confirmed',
      reason: 'Blood pressure check',
      isVirtual: false
    },
    {
      id: 2,
      time: '10:00 AM',
      endTime: '10:45 AM',
      patient: 'Michael Chen',
      avatar: '👨',
      type: 'New Patient',
      status: 'confirmed',
      reason: 'Initial consultation - diabetes management',
      isVirtual: true
    },
    {
      id: 3,
      time: '11:30 AM',
      endTime: '12:00 PM',
      patient: 'Emily Williams',
      avatar: '👩‍🦰',
      type: 'Urgent',
      status: 'pending',
      reason: 'Severe headache - 3 days',
      isVirtual: false
    },
    {
      id: 4,
      time: '2:00 PM',
      endTime: '2:30 PM',
      patient: 'Robert Martinez',
      avatar: '👨‍🦳',
      type: 'Follow-up',
      status: 'confirmed',
      reason: 'Post-surgery checkup',
      isVirtual: false
    },
    {
      id: 5,
      time: '3:30 PM',
      endTime: '4:00 PM',
      patient: 'Jennifer Lee',
      avatar: '👩‍🦱',
      type: 'Consultation',
      status: 'confirmed',
      reason: 'Skin condition review',
      isVirtual: true
    },
    {
      id: 6,
      time: '4:30 PM',
      endTime: '5:00 PM',
      patient: 'David Thompson',
      avatar: '🧑',
      type: 'Check-up',
      status: 'cancelled',
      reason: 'Annual physical',
      isVirtual: false
    }
  ];

  // Generate week days
  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const upcomingAppointments = appointments.filter(apt => apt.status !== 'cancelled');
  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    virtual: appointments.filter(a => a.isVirtual).length
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  return (
    <div className="appointments-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-left">
          <h1>Appointments</h1>
          <p>Manage your schedule and patient appointments</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <span>📋</span> Export Schedule
          </button>
          <button className="btn btn-primary">
            <span>➕</span> Block Time
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="appointment-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Today</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon confirmed">✓</div>
          <div className="stat-info">
            <span className="stat-value">{stats.confirmed}</span>
            <span className="stat-label">Confirmed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-info">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon virtual">📹</div>
          <div className="stat-info">
            <span className="stat-value">{stats.virtual}</span>
            <span className="stat-label">Virtual</span>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="date-navigation">
          <button className="nav-btn">‹</button>
          <h2>{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
          <button className="nav-btn">›</button>
          <button className="btn btn-outline btn-sm today-btn">Today</button>
        </div>
        <div className="view-toggles">
          <button 
            className={`toggle-btn ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className="calendar-container">
        {/* Week View */}
        {viewMode === 'week' && (
          <div className="week-view">
            <div className="week-header">
              <div className="time-column-header"></div>
              {weekDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`day-column-header ${day.toDateString() === new Date().toDateString() ? 'today' : ''}`}
                >
                  <span className="day-name">{dayNames[day.getDay()]}</span>
                  <span className="day-date">{day.getDate()}</span>
                </div>
              ))}
            </div>
            <div className="week-body">
              <div className="time-column">
                {timeSlots.map((time, index) => (
                  <div key={index} className="time-slot">
                    {time}
                  </div>
                ))}
              </div>
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="day-column">
                  {timeSlots.map((time, timeIndex) => (
                    <div key={timeIndex} className="hour-cell">
                      {dayIndex === 2 && appointments.filter(apt => apt.time === time).map(apt => (
                        <div 
                          key={apt.id} 
                          className={`appointment-block ${apt.type.toLowerCase().replace(' ', '-')} ${apt.status}`}
                          onClick={() => handleAppointmentClick(apt)}
                        >
                          <span className="apt-time">{apt.time}</span>
                          <span className="apt-patient">{apt.patient}</span>
                          {apt.isVirtual && <span className="virtual-badge">📹</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="list-view">
            <div className="list-header">
              <h3>Today's Appointments</h3>
              <span className="date-badge">December 20, 2024</span>
            </div>
            <div className="appointments-list">
              {appointments.map(apt => (
                <div 
                  key={apt.id} 
                  className={`appointment-list-item ${apt.status === 'cancelled' ? 'cancelled' : ''}`}
                  onClick={() => handleAppointmentClick(apt)}
                >
                  <div className="apt-time-block">
                    <span className="apt-start">{apt.time}</span>
                    <span className="apt-end">{apt.endTime}</span>
                  </div>
                  <div className="apt-divider"></div>
                  <div className="apt-patient-info">
                    <span className="patient-avatar">{apt.avatar}</span>
                    <div className="patient-details">
                      <span className="patient-name">{apt.patient}</span>
                      <span className="apt-reason">{apt.reason}</span>
                    </div>
                  </div>
                  <div className="apt-badges">
                    <span className={`type-badge ${apt.type.toLowerCase().replace(' ', '-')}`}>
                      {apt.type}
                    </span>
                    {apt.isVirtual && (
                      <span className="virtual-badge">📹 Virtual</span>
                    )}
                    <span className={`status-badge ${apt.status}`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>
                  <div className="apt-actions">
                    {apt.status !== 'cancelled' && (
                      <>
                        {apt.isVirtual ? (
                          <button className="btn btn-sm btn-primary">Join Call</button>
                        ) : (
                          <button className="btn btn-sm btn-outline">Check In</button>
                        )}
                        <button className="btn btn-sm btn-outline">Reschedule</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="day-view">
            <div className="day-header">
              <h3>Friday, December 20, 2024</h3>
            </div>
            <div className="day-schedule">
              {timeSlots.map((time, index) => {
                const apt = appointments.find(a => a.time === time);
                return (
                  <div key={index} className="day-slot">
                    <div className="slot-time">{time}</div>
                    <div className="slot-content">
                      {apt ? (
                        <div 
                          className={`day-appointment ${apt.type.toLowerCase().replace(' ', '-')} ${apt.status}`}
                          onClick={() => handleAppointmentClick(apt)}
                        >
                          <div className="apt-header">
                            <span className="patient-avatar">{apt.avatar}</span>
                            <div className="apt-info">
                              <span className="patient-name">{apt.patient}</span>
                              <span className="apt-duration">{apt.time} - {apt.endTime}</span>
                            </div>
                            <div className="apt-badges">
                              <span className={`type-badge ${apt.type.toLowerCase().replace(' ', '-')}`}>
                                {apt.type}
                              </span>
                              {apt.isVirtual && <span className="virtual-icon">📹</span>}
                            </div>
                          </div>
                          <p className="apt-reason">{apt.reason}</p>
                          <div className="apt-quick-actions">
                            <button className="btn btn-sm btn-outline">View Details</button>
                            {apt.isVirtual && <button className="btn btn-sm btn-primary">Start Call</button>}
                          </div>
                        </div>
                      ) : (
                        <div className="empty-slot">
                          <span>Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Month View */}
        {viewMode === 'month' && (
          <div className="month-view">
            <div className="month-header">
              {dayNames.map((day, index) => (
                <div key={index} className="month-day-name">{day}</div>
              ))}
            </div>
            <div className="month-grid">
              {[...Array(35)].map((_, index) => {
                const dayNum = index - 6 + 1; // Offset for December 2024
                const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                const isToday = dayNum === 20;
                const hasAppointments = dayNum === 20 || dayNum === 21 || dayNum === 23;
                
                return (
                  <div 
                    key={index} 
                    className={`month-cell ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                  >
                    <span className="cell-date">
                      {isCurrentMonth ? dayNum : (dayNum <= 0 ? 30 + dayNum : dayNum - 31)}
                    </span>
                    {hasAppointments && isCurrentMonth && (
                      <div className="cell-appointments">
                        <span className="apt-dot"></span>
                        <span className="apt-dot"></span>
                        {dayNum === 20 && <span className="apt-dot urgent"></span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar - Upcoming Appointments */}
      <div className="appointments-sidebar">
        <div className="sidebar-section">
          <h3>Upcoming</h3>
          <div className="upcoming-list">
            {upcomingAppointments.slice(0, 3).map(apt => (
              <div key={apt.id} className="upcoming-item" onClick={() => handleAppointmentClick(apt)}>
                <span className="upcoming-time">{apt.time}</span>
                <div className="upcoming-info">
                  <span className="upcoming-patient">{apt.patient}</span>
                  <span className="upcoming-type">{apt.type}</span>
                </div>
                {apt.isVirtual && <span className="virtual-icon">📹</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn">
              <span>🔒</span> Block Time Slot
            </button>
            <button className="action-btn">
              <span>📧</span> Send Reminders
            </button>
            <button className="action-btn">
              <span>📊</span> View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
          <div className="modal-content appointment-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button className="close-btn" onClick={() => setShowAppointmentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-patient-info">
                <span className="patient-avatar large">{selectedAppointment.avatar}</span>
                <div className="patient-details">
                  <h3>{selectedAppointment.patient}</h3>
                  <div className="apt-badges">
                    <span className={`type-badge ${selectedAppointment.type.toLowerCase().replace(' ', '-')}`}>
                      {selectedAppointment.type}
                    </span>
                    <span className={`status-badge ${selectedAppointment.status}`}>
                      {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-info-grid">
                <div className="info-item">
                  <span className="info-icon">🕐</span>
                  <div>
                    <span className="info-label">Time</span>
                    <span className="info-value">{selectedAppointment.time} - {selectedAppointment.endTime}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <div>
                    <span className="info-label">Date</span>
                    <span className="info-value">December 20, 2024</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">{selectedAppointment.isVirtual ? '📹' : '🏥'}</span>
                  <div>
                    <span className="info-label">Location</span>
                    <span className="info-value">
                      {selectedAppointment.isVirtual ? 'Video Consultation' : 'In-Person Visit'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-reason">
                <span className="info-label">Reason for Visit</span>
                <p>{selectedAppointment.reason}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline">Reschedule</button>
              <button className="btn btn-outline danger">Cancel</button>
              {selectedAppointment.isVirtual ? (
                <button className="btn btn-primary">
                  <span>📹</span> Start Video Call
                </button>
              ) : (
                <Link to="/doctor/case/1" className="btn btn-primary">
                  <span>👁️</span> View Case
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
