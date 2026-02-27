import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Key, BookOpen, Zap, Shield, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import '../public/PublicPages.css';

const APIAccess = () => {
  const [copied, setCopied] = useState(false);

  const apiFeatures = [
    {
      icon: <Code size={32} />,
      title: 'RESTful API',
      description: 'Clean, intuitive REST endpoints with comprehensive documentation'
    },
    {
      icon: <Key size={32} />,
      title: 'Secure Authentication',
      description: 'OAuth 2.0 and API key authentication with rate limiting'
    },
    {
      icon: <Zap size={32} />,
      title: 'Real-Time Webhooks',
      description: 'Subscribe to events and get instant notifications'
    },
    {
      icon: <Shield size={32} />,
      title: 'HIPAA Compliant',
      description: 'All API endpoints are HIPAA compliant with end-to-end encryption'
    }
  ];

  const endpoints = [
    {
      method: 'POST',
      path: '/api/triage/analyze',
      description: 'Submit patient symptoms for AI-powered triage analysis'
    },
    {
      method: 'GET',
      path: '/api/doctors',
      description: 'Retrieve available doctors based on specialty and location'
    },
    {
      method: 'POST',
      path: '/api/appointments',
      description: 'Schedule a new appointment with a healthcare provider'
    },
    {
      method: 'GET',
      path: '/api/appointments/:id',
      description: 'Get details of a specific appointment'
    },
    {
      method: 'PATCH',
      path: '/api/appointments/:id',
      description: 'Update appointment details or reschedule'
    },
    {
      method: 'GET',
      path: '/api/consultations',
      description: 'Retrieve patient consultation history'
    },
    {
      method: 'POST',
      path: '/api/consultations',
      description: 'Create a new consultation record'
    },
    {
      method: 'GET',
      path: '/api/users/profile',
      description: 'Get authenticated user profile information'
    }
  ];

  const rateLimits = [
    { tier: 'Free', requests: '100/hour', rateLimit: '5 requests/second' },
    { tier: 'Professional', requests: '10,000/hour', rateLimit: '50 requests/second' },
    { tier: 'Enterprise', requests: 'Unlimited', rateLimit: 'Custom' }
  ];

  const codeExample = `// Example: AI Triage Analysis
const analyzeSymptoms = async (symptoms) => {
  const response = await fetch('https://api.clinroute.com/v1/triage/analyze', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      symptoms: symptoms,
      age: 35,
      gender: 'male',
      medical_history: []
    })
  });
  
  return await response.json();
};

// Response
{
  "urgency_level": "moderate",
  "recommended_action": "Schedule appointment within 24-48 hours",
  "specialties": ["primary_care", "internal_medicine"],
  "confidence": 0.89,
  "reasoning": "..."
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="public-page">
      <div className="public-container">
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>API Access</h1>
          <p className="subtitle">
            Integrate ClinRoute's AI-powered triage into your applications
          </p>
        </motion.div>

        <motion.div className="hero-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Code size={80} className="hero-icon" />
          <h2>Build with ClinRoute API</h2>
          <p>
            Our comprehensive API allows you to integrate intelligent healthcare triage, doctor 
            discovery, appointment scheduling, and consultation management into any application. 
            Whether you're building a mobile app, web platform, or integrating with existing healthcare 
            systems, ClinRoute API provides the tools you need.
          </p>
          <div className="cta-buttons">
            <a href="https://docs.clinroute.com" className="btn-primary btn-large" target="_blank" rel="noopener noreferrer">
              View Documentation <ExternalLink size={18} />
            </a>
            <a href="/register" className="btn-secondary btn-large">Get API Key</a>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2>API Features</h2>
          <div className="features-grid">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2>Quick Start Example</h2>
          <div className="code-block-container">
            <div className="code-block-header">
              <span>JavaScript</span>
              <button onClick={handleCopyCode} className="copy-button">
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="code-block">
              <code>{codeExample}</code>
            </pre>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <h2>API Endpoints</h2>
          <p className="section-subtitle">Core endpoints for building healthcare applications</p>
          <div className="endpoints-list">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                className="endpoint-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.05 }}
              >
                <div className="endpoint-method-container">
                  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <code className="endpoint-path">{endpoint.path}</code>
                </div>
                <p className="endpoint-description">{endpoint.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="api-docs-link">
            <BookOpen size={20} />
            <a href="https://docs.clinroute.com/api-reference" target="_blank" rel="noopener noreferrer">
              View complete API documentation with examples →
            </a>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <h2>Authentication</h2>
          <div className="info-card">
            <h3>API Key Authentication</h3>
            <p>Include your API key in the Authorization header of each request:</p>
            <div className="code-inline-block">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </div>
            <p className="note">
              🔒 Keep your API key secure. Never expose it in client-side code or public repositories.
            </p>
          </div>

          <div className="info-card">
            <h3>Getting Your API Key</h3>
            <ol className="setup-steps">
              <li>Create a ClinRoute account or log in</li>
              <li>Navigate to Settings → API Access</li>
              <li>Generate a new API key</li>
              <li>Copy and securely store your key</li>
            </ol>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}>
          <h2>Rate Limits</h2>
          <p>API rate limits based on your subscription tier:</p>
          <div className="rate-limits-table">
            <table>
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Requests per Hour</th>
                  <th>Rate Limit</th>
                </tr>
              </thead>
              <tbody>
                {rateLimits.map((limit, index) => (
                  <tr key={index}>
                    <td><strong>{limit.tier}</strong></td>
                    <td>{limit.requests}</td>
                    <td>{limit.rateLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="rate-limit-note">
            Rate limits reset hourly. Exceeding limits returns a 429 status code. 
            Enterprise customers can request custom rate limits.
          </p>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
          <h2>Webhooks</h2>
          <p>Subscribe to real-time events in your application:</p>
          <div className="webhooks-grid">
            <div className="webhook-card">
              <h4>appointment.created</h4>
              <p>Triggered when a new appointment is scheduled</p>
            </div>
            <div className="webhook-card">
              <h4>appointment.updated</h4>
              <p>Triggered when an appointment is rescheduled or modified</p>
            </div>
            <div className="webhook-card">
              <h4>consultation.completed</h4>
              <p>Triggered when a consultation is marked as complete</p>
            </div>
            <div className="webhook-card">
              <h4>triage.analyzed</h4>
              <p>Triggered when AI triage analysis is complete</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}>
          <h2>SDKs & Libraries</h2>
          <p>Official SDKs for popular programming languages:</p>
          <div className="sdks-grid">
            <div className="sdk-card">
              <Code size={32} />
              <h4>JavaScript/Node.js</h4>
              <code>npm install @clinroute/sdk</code>
            </div>
            <div className="sdk-card">
              <Code size={32} />
              <h4>Python</h4>
              <code>pip install clinroute</code>
            </div>
            <div className="sdk-card">
              <Code size={32} />
              <h4>Ruby</h4>
              <code>gem install clinroute</code>
            </div>
            <div className="sdk-card">
              <Code size={32} />
              <h4>PHP</h4>
              <code>composer require clinroute/sdk</code>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section security-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}>
          <Shield size={48} />
          <h2>Security & Compliance</h2>
          <div className="two-column-grid">
            <div>
              <h3>Data Protection</h3>
              <ul className="security-list">
                <li><CheckCircle size={18} /> All API traffic encrypted with TLS 1.3</li>
                <li><CheckCircle size={18} /> PHI data encrypted at rest with AES-256</li>
                <li><CheckCircle size={18} /> Regular security audits and penetration testing</li>
                <li><CheckCircle size={18} /> IP whitelisting available for Enterprise</li>
              </ul>
            </div>
            <div>
              <h3>Compliance</h3>
              <ul className="security-list">
                <li><CheckCircle size={18} /> HIPAA compliant infrastructure</li>
                <li><CheckCircle size={18} /> SOC 2 Type II certified</li>
                <li><CheckCircle size={18} /> GDPR compliant data handling</li>
                <li><CheckCircle size={18} /> Business Associate Agreements available</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}>
          <h2>Need Help?</h2>
          <div className="help-cards">
            <div className="help-card">
              <BookOpen size={32} />
              <h3>Documentation</h3>
              <p>Comprehensive guides and API reference</p>
              <a href="https://docs.clinroute.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View Docs <ExternalLink size={16} />
              </a>
            </div>
            <div className="help-card">
              <Code size={32} />
              <h3>Code Examples</h3>
              <p>Sample apps and integration examples</p>
              <a href="https://github.com/clinroute/examples" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Browse Examples <ExternalLink size={16} />
              </a>
            </div>
            <div className="help-card">
              <ExternalLink size={32} />
              <h3>Developer Support</h3>
              <p>Get help from our developer community</p>
              <a href="/help-center" className="btn-secondary">
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div className="cta-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7 }}>
          <h2>Ready to Build?</h2>
          <p>Start integrating ClinRoute API into your application today</p>
          <div className="cta-buttons">
            <a href="/register" className="btn-primary btn-large">Get Your API Key</a>
            <a href="/enterprise" className="btn-secondary btn-large">Enterprise Solutions</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default APIAccess;
