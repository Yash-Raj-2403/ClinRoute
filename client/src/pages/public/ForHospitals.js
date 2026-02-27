import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPages.css';

const ForHospitals = () => {
  const challenges = [
    { problem: '4.5 hours', description: 'Average ED wait time in busy hospitals' },
    { problem: '30%', description: 'Of ED visits could be handled in primary care' },
    { problem: '$2,500', description: 'Average cost of misrouted patient care' },
    { problem: '67%', description: 'Of nurses report triage-related burnout' },
  ];

  const solutions = [
    {
      icon: '🏥',
      title: 'ED Triage Optimization',
      description: 'AI pre-screens patients before arrival, reducing wait times and improving acuity assessment accuracy.',
    },
    {
      icon: '🔄',
      title: 'Patient Flow Management',
      description: 'Real-time visibility into patient volumes, bed availability, and predicted admission rates.',
    },
    {
      icon: '🔗',
      title: 'EHR Integration',
      description: 'Seamless integration with Epic, Cerner, and other major EHR systems. No workflow disruption.',
    },
    {
      icon: '📈',
      title: 'Population Health',
      description: 'Identify patterns in patient presentations, predict surge capacity needs, and optimize staffing.',
    },
    {
      icon: '🤖',
      title: 'Clinical Decision Support',
      description: 'Evidence-based recommendations at point of care, reducing variation and improving outcomes.',
    },
    {
      icon: '📊',
      title: 'Executive Analytics',
      description: 'Real-time dashboards for hospital leadership with actionable insights on throughput and quality.',
    },
  ];

  const partners = [
    { name: 'MedStar Health', logo: '🏥' },
    { name: 'Mount Sinai', logo: '🏥' },
    { name: 'Cleveland Clinic', logo: '🏥' },
    { name: 'Tufts Medical', logo: '🏥' },
    { name: 'Kaiser Permanente', logo: '🏥' },
  ];

  return (
    <div className="public-page hospitals-page">
      {/* Hero */}
      <section className="page-hero hospitals-hero">
        <div className="container">
          <div className="hero-badge">For Health Systems</div>
          <h1>RAG-powered clinical workflow automation at scale</h1>
          <p className="hero-description">
            Reduce ED wait times, optimize patient flow, and improve outcomes with 
            enterprise-grade AI that integrates seamlessly with your existing systems.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg">Request a demo</button>
            <button className="btn btn-outline btn-lg">Download whitepaper</button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Challenge</span>
            <h2>Healthcare systems are overwhelmed</h2>
          </div>
          <div className="challenges-grid">
            {challenges.map((item, index) => (
              <div key={index} className="challenge-card">
                <span className="challenge-stat">{item.problem}</span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Solutions</span>
            <h2>Enterprise-grade AI for healthcare</h2>
          </div>
          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-icon">{solution.icon}</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="content-section">
        <div className="container">
          <div className="case-study">
            <div className="case-content">
              <span className="section-label">Case Study</span>
              <h2>How MedStar reduced ED wait times by 40%</h2>
              <p>
                MedStar Health deployed ClinRoute across their emergency departments 
                to pre-triage patients using AI. The results were significant.
              </p>
              <div className="case-results">
                <div className="result-item">
                  <span className="result-value">40%</span>
                  <span className="result-label">Reduction in ED wait time</span>
                </div>
                <div className="result-item">
                  <span className="result-value">23%</span>
                  <span className="result-label">Decrease in left without being seen</span>
                </div>
                <div className="result-item">
                  <span className="result-value">$3.2M</span>
                  <span className="result-label">Annual cost savings</span>
                </div>
              </div>
              <blockquote>
                "ClinRoute transformed how we approach triage. Our nurses can focus on 
                patient care instead of administrative burden."
                <cite>— Dr. James Wilson, CMO, MedStar Health</cite>
              </blockquote>
            </div>
            <div className="case-image">
              <div className="case-visual">
                <div className="stat-circle">
                  <span className="circle-value">40%</span>
                  <span className="circle-label">Faster</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="integration-section">
            <div className="section-header">
              <span className="section-label">Integrations</span>
              <h2>Works with your existing systems</h2>
            </div>
            <div className="integrations-grid">
              <div className="integration-card">Epic</div>
              <div className="integration-card">Cerner</div>
              <div className="integration-card">Meditech</div>
              <div className="integration-card">Allscripts</div>
              <div className="integration-card">athenahealth</div>
              <div className="integration-card">HL7 FHIR</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Trusted By</span>
            <h2>Leading health systems nationwide</h2>
          </div>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-card">
                <span className="partner-logo">{partner.logo}</span>
                <span className="partner-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta hospitals-cta">
        <div className="container">
          <h2>Let's discuss your health system's needs</h2>
          <p>Schedule a consultation with our enterprise team.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg">Schedule consultation</button>
            <button className="btn btn-outline btn-lg">Contact sales</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForHospitals;
