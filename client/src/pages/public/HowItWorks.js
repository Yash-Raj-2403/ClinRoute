import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPages.css';

const HowItWorks = () => {
  const patientSteps = [
    {
      number: '01',
      title: 'Describe Your Symptoms',
      description: 'Tell our RAG assistant about your symptoms through a simple chat interface. Include any relevant medical history, medications, and concerns.',
      icon: '💬',
    },
    {
      number: '02',
      title: 'RAG Analysis & Triage',
      description: 'Our system analyzes your symptoms using RAG (Retrieval-Augmented Generation) with trusted medical guidelines. No hallucinations — just evidence-based assessment.',
      icon: '🧠',
    },
    {
      number: '03',
      title: 'Urgency Classification',
      description: 'Based on your symptoms, we classify urgency levels: Emergency, Urgent, Moderate, or Routine. Emergency cases trigger immediate alerts.',
      icon: '🚨',
    },
    {
      number: '04',
      title: 'Department Routing',
      description: 'You\'re automatically matched with the right specialty — Cardiology, Neurology, Primary Care, and more. No more guessing which doctor to see.',
      icon: '🏥',
    },
    {
      number: '05',
      title: 'Connect with Doctors',
      description: 'View available specialists in your area, see their availability, and book appointments instantly. We show you doctors who accept your insurance.',
      icon: '👨‍⚕️',
    },
  ];

  const doctorSteps = [
    {
      number: '01',
      title: 'Receive AI-Triaged Cases',
      description: 'Get patients pre-screened with structured symptom summaries, urgency levels, and relevant medical guidelines already retrieved.',
      icon: '📋',
    },
    {
      number: '02',
      title: 'Review AI Recommendations',
      description: 'See AI-suggested diagnosis pathways based on guidelines, with confidence levels and supporting evidence. You make the final decisions.',
      icon: '🔍',
    },
    {
      number: '03',
      title: 'Streamlined Actions',
      description: 'Accept, prescribe, order tests, or escalate — all from one dashboard. Automated documentation and patient notifications save hours daily.',
      icon: '⚡',
    },
  ];

  const features = [
    {
      title: 'RAG-Powered Accuracy',
      description: 'Retrieval-Augmented Generation ensures responses are grounded in real medical guidelines, not AI imagination.',
      icon: '📚',
    },
    {
      title: 'Emergency Detection',
      description: 'Critical symptoms trigger immediate alerts. Potential emergencies are flagged and escalated automatically.',
      icon: '🚑',
    },
    {
      title: 'HIPAA Compliant',
      description: 'End-to-end encryption, secure infrastructure, and full compliance with healthcare data regulations.',
      icon: '🔒',
    },
    {
      title: 'Insurance Integration',
      description: 'We check provider networks and show you in-network options to minimize out-of-pocket costs.',
      icon: '💳',
    },
  ];

  return (
    <div className="public-page hiw-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-badge">How It Works</div>
          <h1>RAG-powered triage that actually works</h1>
          <p className="hero-description">
            See how ClinRoute transforms chaotic healthcare navigation into a 
            streamlined, intelligent experience for patients and providers alike.
          </p>
        </div>
      </section>

      {/* Patient Journey */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Patients</span>
            <h2>Your journey to better care</h2>
          </div>
          <div className="journey-steps">
            {patientSteps.map((step, index) => (
              <div key={index} className="journey-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <div className="step-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < patientSteps.length - 1 && (
                  <div className="step-connector">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Journey */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Doctors</span>
            <h2>Your intelligent clinical assistant</h2>
          </div>
          <div className="doctor-steps-grid">
            {doctorSteps.map((step, index) => (
              <div key={index} className="doctor-step-card">
                <div className="step-badge">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Explanation */}
      <section className="content-section">
        <div className="container">
          <div className="ai-section">
            <div className="ai-visual">
              <div className="ai-diagram">
                <div className="diagram-layer">
                  <span className="layer-label">Input</span>
                  <div className="layer-items">
                    <span>Symptoms</span>
                    <span>History</span>
                    <span>Reports</span>
                  </div>
                </div>
                <div className="diagram-arrow">→</div>
                <div className="diagram-layer highlight">
                  <span className="layer-label">RAG Engine</span>
                  <div className="layer-items">
                    <span>LLM + Vector DB</span>
                    <span>Medical Guidelines</span>
                  </div>
                </div>
                <div className="diagram-arrow">→</div>
                <div className="diagram-layer">
                  <span className="layer-label">Output</span>
                  <div className="layer-items">
                    <span>Triage Level</span>
                    <span>Recommendations</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ai-content">
              <span className="section-label">The Technology</span>
              <h2>Why RAG makes the difference</h2>
              <p>
                Traditional AI chatbots can "hallucinate" — making up medical advice 
                that sounds plausible but isn't grounded in evidence. That's dangerous 
                in healthcare.
              </p>
              <p>
                ClinRoute uses Retrieval-Augmented Generation (RAG), which means our AI 
                retrieves relevant medical guidelines from a curated database before 
                generating any response. Every recommendation is traceable to a real source.
              </p>
              <ul className="ai-benefits">
                <li>✓ Guidelines from peer-reviewed medical sources</li>
                <li>✓ Real-time retrieval, not memorized training data</li>
                <li>✓ Confidence scores for transparency</li>
                <li>✓ Human doctors always make final decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Key Features</span>
            <h2>What makes us different</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Ready to try it yourself?</h2>
          <p>Start your first RAG-powered consultation in minutes.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">Create free account</Link>
            <Link to="/for-doctors" className="btn btn-outline btn-lg">I'm a healthcare provider</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
