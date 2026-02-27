import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPages.css';

const ForDoctors = () => {
  const benefits = [
    {
      icon: '⚡',
      title: 'Pre-Triaged Patients',
      description: 'Receive patients with AI-generated summaries, urgency levels, and relevant medical guidelines already retrieved.',
    },
    {
      icon: '📊',
      title: 'AI-Assisted Diagnostics',
      description: 'View suggested diagnosis pathways with confidence levels and supporting evidence from medical literature.',
    },
    {
      icon: '⏱️',
      title: 'Save 2+ Hours Daily',
      description: 'Automated documentation, prescription generation, and patient communications reduce administrative burden.',
    },
    {
      icon: '🎯',
      title: 'Emergency Prioritization',
      description: 'Critical cases surface automatically. Your queue is intelligently sorted by medical urgency.',
    },
    {
      icon: '📱',
      title: 'Mobile Dashboard',
      description: 'Manage your patient queue, review cases, and take actions from anywhere with our mobile app.',
    },
    {
      icon: '💼',
      title: 'Practice Analytics',
      description: 'Insights into patient flow, case complexity, and practice efficiency to optimize operations.',
    },
  ];

  const workflow = [
    {
      step: 1,
      title: 'Patient submits symptoms',
      description: 'AI collects and structures symptom data with follow-up questions.',
    },
    {
      step: 2,
      title: 'AI performs triage',
      description: 'Urgency classification and department routing using medical guidelines.',
    },
    {
      step: 3,
      title: 'Case appears in your queue',
      description: 'You see a structured summary, not raw symptom descriptions.',
    },
    {
      step: 4,
      title: 'Review AI recommendations',
      description: 'See suggested pathways with confidence levels and evidence.',
    },
    {
      step: 5,
      title: 'Take action',
      description: 'Accept, prescribe, order tests, or escalate with one click.',
    },
  ];

  return (
    <div className="public-page doctors-page">
      {/* Hero */}
      <section className="page-hero doctors-hero">
        <div className="container">
          <div className="hero-badge">For Healthcare Providers</div>
          <h1>AI that respects your<br />clinical judgment</h1>
          <p className="hero-description">
            ClinRoute doesn't replace doctors — it empowers them. Get pre-triaged patients, 
            AI-assisted insights, and streamlined workflows that save hours daily.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-primary btn-lg">Join as a provider</Link>
            <button className="btn btn-outline btn-lg">Schedule a demo</button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Benefits</span>
            <h2>Why doctors choose ClinRoute</h2>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2>From patient to treatment, streamlined</h2>
          </div>
          <div className="workflow-timeline">
            {workflow.map((item, index) => (
              <div key={index} className="workflow-item">
                <div className="workflow-marker">
                  <span>{item.step}</span>
                </div>
                <div className="workflow-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="content-section">
        <div className="container">
          <div className="dashboard-preview">
            <div className="preview-content">
              <span className="section-label">Doctor Dashboard</span>
              <h2>Everything you need, one view</h2>
              <p>
                Your dashboard shows today's appointments, AI-prioritized cases, 
                emergency alerts, and a patient queue sorted by urgency. Click any 
                case to see the full AI-generated summary.
              </p>
              <ul className="preview-features">
                <li>✓ Real-time emergency alerts</li>
                <li>✓ Structured symptom summaries</li>
                <li>✓ Retrieved medical guidelines</li>
                <li>✓ One-click prescriptions</li>
              </ul>
            </div>
            <div className="preview-image">
              <div className="mock-dashboard">
                <div className="mock-header">
                  <span>Doctor Dashboard</span>
                  <span className="mock-alert">🔴 3 Urgent</span>
                </div>
                <div className="mock-content">
                  <div className="mock-card urgent">
                    <span className="mock-badge">Emergency</span>
                    <strong>Chest Pain - John D.</strong>
                    <small>AI Confidence: 94%</small>
                  </div>
                  <div className="mock-card moderate">
                    <span className="mock-badge">Moderate</span>
                    <strong>Migraine - Sarah M.</strong>
                    <small>AI Confidence: 87%</small>
                  </div>
                  <div className="mock-card routine">
                    <span className="mock-badge">Routine</span>
                    <strong>Follow-up - Mike T.</strong>
                    <small>Scheduled check-in</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2>Simple, transparent pricing</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Solo Practice</h3>
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="price">199</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>✓ Unlimited RAG triage</li>
                <li>✓ 1 provider seat</li>
                <li>✓ Basic analytics</li>
                <li>✓ Email support</li>
              </ul>
              <Link to="/register" className="btn btn-outline">Get started</Link>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Group Practice</h3>
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="price">499</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>✓ Everything in Solo</li>
                <li>✓ Up to 10 provider seats</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
                <li>✓ API access</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Get started</Link>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="pricing-amount">
                  <span className="price">Custom</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>✓ Everything in Group</li>
                <li>✓ Unlimited seats</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated support</li>
                <li>✓ SLA guarantee</li>
              </ul>
              <button className="btn btn-outline">Contact sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Ready to transform your practice?</h2>
          <p>Join thousands of healthcare providers using RAG-powered triage.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">Sign up as provider</Link>
            <button className="btn btn-outline btn-lg">Request a demo</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForDoctors;
