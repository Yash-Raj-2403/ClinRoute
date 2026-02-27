import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Activity, Clock } from 'lucide-react';
import '../public/PublicPages.css';

const SystemStatus = () => {
  const currentDate = new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  const services = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '142ms'
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '89ms'
    },
    {
      name: 'AI Triage System',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '1.2s'
    },
    {
      name: 'Video Consultations',
      status: 'operational',
      uptime: '99.92%',
      responseTime: '245ms'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '76ms'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '100%',
      responseTime: '12ms'
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '134ms'
    },
    {
      name: 'Email Service',
      status: 'operational',
      uptime: '99.96%',
      responseTime: '423ms'
    }
  ];

  const incidents = [
    {
      date: 'Feb 20, 2026',
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'resolved',
      duration: '30 minutes',
      description: 'Routine database maintenance completed successfully with no impact to user experience.'
    },
    {
      date: 'Feb 15, 2026',
      title: 'Video Service Latency',
      status: 'resolved',
      duration: '15 minutes',
      description: 'Brief increase in video consultation latency. Issue identified and resolved.'
    },
    {
      date: 'Feb 10, 2026',
      title: 'API Rate Limiting Update',
      status: 'resolved',
      duration: '5 minutes',
      description: 'Updated API rate limiting configurations. Service briefly unavailable during deployment.'
    }
  ];

  const upcomingMaintenance = [
    {
      date: 'Mar 5, 2026',
      time: '2:00 AM - 4:00 AM EST',
      title: 'Scheduled System Upgrade',
      description: 'We will be performing a system-wide upgrade to improve performance and add new features. Service may be intermittently unavailable.'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle size={20} className="status-icon operational" />;
      case 'degraded':
        return <AlertCircle size={20} className="status-icon degraded" />;
      case 'down':
        return <AlertCircle size={20} className="status-icon down" />;
      default:
        return <Activity size={20} className="status-icon" />;
    }
  };

  const allOperational = services.every(service => service.status === 'operational');

  return (
    <div className="public-page">
      <div className="public-container">
        {/* Header */}
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>System Status</h1>
          <p className="subtitle">
            Real-time status and uptime information for all ClinRoute services
          </p>
        </motion.div>

        {/* Overall Status */}
        <motion.div
          className={`status-banner ${allOperational ? 'operational' : 'issue'}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {allOperational ? (
            <>
              <CheckCircle size={32} />
              <div>
                <h2>All Systems Operational</h2>
                <p>Last updated: {currentDate}</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle size={32} />
              <div>
                <h2>Service Disruption Detected</h2>
                <p>We're working to resolve the issue. Last updated: {currentDate}</p>
              </div>
            </>
          )}
        </motion.div>

        {/* Services Status */}
        <motion.div
          className="services-status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Service Status</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <div className="service-status">
                    {getStatusIcon(service.status)}
                    <span className={`status-text ${service.status}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="service-metrics">
                  <div className="metric">
                    <span className="metric-label">Uptime (30 days)</span>
                    <span className="metric-value">{service.uptime}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Avg Response Time</span>
                    <span className="metric-value">{service.responseTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Maintenance */}
        {upcomingMaintenance.length > 0 && (
          <motion.div
            className="maintenance-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2>Scheduled Maintenance</h2>
            {upcomingMaintenance.map((maintenance, index) => (
              <div key={index} className="maintenance-card">
                <div className="maintenance-icon">
                  <Clock size={24} />
                </div>
                <div className="maintenance-details">
                  <h3>{maintenance.title}</h3>
                  <p className="maintenance-date">{maintenance.date} • {maintenance.time}</p>
                  <p className="maintenance-description">{maintenance.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Recent Incidents */}
        <motion.div
          className="incidents-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2>Recent Incidents</h2>
          <div className="incidents-timeline">
            {incidents.map((incident, index) => (
              <div key={index} className="incident-item">
                <div className="incident-marker resolved" />
                <div className="incident-content">
                  <div className="incident-header">
                    <h3>{incident.title}</h3>
                    <span className="incident-status resolved">Resolved</span>
                  </div>
                  <p className="incident-date">{incident.date} • Duration: {incident.duration}</p>
                  <p className="incident-description">{incident.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          className="status-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3>Stay Updated</h3>
          <p>Subscribe to receive notifications about system status and scheduled maintenance</p>
          <div className="cta-buttons">
            <button className="btn-primary">Subscribe to Updates</button>
            <a href="/contact" className="btn-secondary">Contact Support</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemStatus;
