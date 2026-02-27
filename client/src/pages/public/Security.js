import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPages.css';

const Security = () => {
  const certifications = [
    {
      icon: '🛡️',
      name: 'HIPAA Compliant',
      description: 'Full compliance with Health Insurance Portability and Accountability Act requirements.',
    },
    {
      icon: '🔐',
      name: 'SOC 2 Type II',
      description: 'Annual third-party audit of security, availability, processing integrity, and confidentiality.',
    },
    {
      icon: '🌐',
      name: 'HITRUST CSF',
      description: 'Certified against the HITRUST Common Security Framework for healthcare organizations.',
    },
    {
      icon: '🇪🇺',
      name: 'GDPR Compliant',
      description: 'Full compliance with European data protection regulations for international operations.',
    },
  ];

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). Your data is never readable by unauthorized parties.',
      icon: '🔒',
    },
    {
      title: 'Zero-Knowledge Architecture',
      description: 'Patient health data is encrypted with keys only you control. ClinRoute cannot access your unencrypted data.',
      icon: '🔑',
    },
    {
      title: 'Role-Based Access Control',
      description: 'Granular permissions ensure staff only access data necessary for their role. Configurable per organization.',
      icon: '👥',
    },
    {
      title: 'Comprehensive Audit Logs',
      description: 'Every access, modification, and export is logged with timestamps and user identification for compliance.',
      icon: '📋',
    },
    {
      title: 'Multi-Factor Authentication',
      description: 'Required MFA for all accounts with support for TOTP, hardware keys, and biometric authentication.',
      icon: '📱',
    },
    {
      title: 'Automatic Data Retention',
      description: 'Configurable retention policies with automatic secure deletion when data is no longer needed.',
      icon: '⏱️',
    },
  ];

  const infrastructure = [
    { feature: 'Cloud Provider', value: 'AWS GovCloud / Azure Healthcare' },
    { feature: 'Data Centers', value: 'US-based, SOC 2 certified facilities' },
    { feature: 'Uptime SLA', value: '99.99% availability guarantee' },
    { feature: 'Backup Frequency', value: 'Real-time replication + hourly snapshots' },
    { feature: 'Disaster Recovery', value: 'Multi-region failover in < 5 minutes' },
    { feature: 'Penetration Testing', value: 'Quarterly third-party assessments' },
  ];

  return (
    <div className="public-page security-page">
      {/* Hero */}
      <section className="page-hero security-hero">
        <div className="container">
          <div className="hero-badge">Security & Compliance</div>
          <h1>Your health data deserves<br />the highest protection</h1>
          <p className="hero-description">
            ClinRoute is built with security-first architecture, meeting or exceeding 
            all major healthcare compliance standards.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Certifications</span>
            <h2>Industry-leading compliance</h2>
          </div>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-icon">{cert.icon}</div>
                <h3>{cert.name}</h3>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Security Features</span>
            <h2>Protection at every layer</h2>
          </div>
          <div className="security-grid">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="security-feature-card">
                <div className="feature-header">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="content-section">
        <div className="container">
          <div className="infrastructure-section">
            <div className="infra-content">
              <span className="section-label">Infrastructure</span>
              <h2>Enterprise-grade infrastructure</h2>
              <p>
                ClinRoute runs on healthcare-specialized cloud infrastructure with 
                multiple layers of redundancy, security, and compliance controls.
              </p>
              <div className="infra-table">
                {infrastructure.map((item, index) => (
                  <div key={index} className="infra-row">
                    <span className="infra-label">{item.feature}</span>
                    <span className="infra-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="infra-visual">
              <div className="visual-card">
                <div className="shield-icon">🛡️</div>
                <div className="visual-stats">
                  <div className="visual-stat">
                    <span className="stat-number">99.99%</span>
                    <span className="stat-label">Uptime</span>
                  </div>
                  <div className="visual-stat">
                    <span className="stat-number">0</span>
                    <span className="stat-label">Breaches</span>
                  </div>
                  <div className="visual-stat">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Safety */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="ai-safety">
            <div className="section-header">
              <span className="section-label">AI Safety</span>
              <h2>Responsible AI in healthcare</h2>
            </div>
            <div className="safety-content">
              <div className="safety-item">
                <h4>🎯 Guardrails Against Hallucinations</h4>
                <p>
                  Our RAG architecture retrieves information from vetted medical sources 
                  before generating any response. The AI cannot make up medical advice.
                </p>
              </div>
              <div className="safety-item">
                <h4>👨‍⚕️ Human-in-the-Loop</h4>
                <p>
                  All AI recommendations require physician review before becoming actionable. 
                  Doctors always make the final clinical decisions.
                </p>
              </div>
              <div className="safety-item">
                <h4>📊 Transparency & Explainability</h4>
                <p>
                  Every AI recommendation includes confidence scores and citations to 
                  the medical guidelines that informed the suggestion.
                </p>
              </div>
              <div className="safety-item">
                <h4>📝 Decision Logging</h4>
                <p>
                  Complete audit trail of AI reasoning, data sources used, and human 
                  decisions for regulatory compliance and quality improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="page-cta security-cta">
        <div className="container">
          <h2>Need more information?</h2>
          <p>Our security team is happy to answer questions and provide compliance documentation.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg">Contact security team</button>
            <button className="btn btn-outline btn-lg">Download security whitepaper</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
