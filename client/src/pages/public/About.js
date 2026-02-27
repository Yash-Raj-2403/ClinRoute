import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPages.css';

const About = () => {
  const values = [
    {
      icon: '🎯',
      title: 'Patient-First',
      description: 'Every decision we make starts with what\'s best for patients navigating the healthcare system.',
    },
    {
      icon: '🔬',
      title: 'Evidence-Based',
      description: 'Our AI is trained on peer-reviewed medical guidelines, not internet opinions.',
    },
    {
      icon: '🛡️',
      title: 'Privacy & Security',
      description: 'HIPAA-compliant infrastructure with end-to-end encryption for all health data.',
    },
    {
      icon: '🤝',
      title: 'Accessibility',
      description: 'Healthcare navigation should be easy for everyone, regardless of tech literacy.',
    },
  ];

  const team = [
    { name: 'Dr. Sarah Chen', role: 'CEO & Co-founder', image: '👩‍⚕️' },
    { name: 'Michael Torres', role: 'CTO & Co-founder', image: '👨‍💻' },
    { name: 'Dr. James Wilson', role: 'Chief Medical Officer', image: '👨‍⚕️' },
    { name: 'Priya Sharma', role: 'VP of Engineering', image: '👩‍💻' },
  ];

  return (
    <div className="public-page about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-badge">About ClinRoute</div>
          <h1>Transforming how patients navigate healthcare</h1>
          <p className="hero-description">
            We're building AI that understands medicine, respects patient time, 
            and connects people with the right care — faster and smarter.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="content-section">
        <div className="container">
          <div className="split-content">
            <div className="split-text">
              <span className="section-label">Our Mission</span>
              <h2>Eliminate healthcare navigation complexity</h2>
              <p>
                The average patient spends hours researching symptoms, calling offices, 
                and waiting for callbacks — often ending up at the wrong specialist. 
                ClinRoute changes that.
              </p>
              <p>
                Our RAG-powered platform instantly assesses symptoms using medical guidelines, 
                prioritizes care needs, and connects patients with the right provider. 
                No more guesswork. No more wasted time.
              </p>
            </div>
            <div className="split-image">
              <div className="image-card">
                <div className="stat-highlight">
                  <span className="highlight-value">73%</span>
                  <span className="highlight-label">of patients report confusion about where to seek care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2>Built on principles that matter</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="content-section">
        <div className="container">
          <div className="story-content">
            <span className="section-label">Our Story</span>
            <h2>From frustration to innovation</h2>
            <div className="story-text">
              <p>
                ClinRoute was born from a personal experience. Our co-founder, Dr. Sarah Chen, 
                watched her father spend weeks bouncing between specialists for a condition 
                that could have been diagnosed in days with proper triage.
              </p>
              <p>
                That experience sparked a question: Why is healthcare navigation so broken? 
                And more importantly, how can AI help fix it?
              </p>
              <p>
                In 2024, we assembled a team of physicians, AI researchers, and healthcare 
                technologists to build something different — a system that combines the 
                precision of medical guidelines with the accessibility of modern technology.
              </p>
              <p>
                Today, ClinRoute serves millions of patients and thousands of healthcare 
                providers, reducing triage time by 90% and improving care accuracy across the board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="content-section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Leadership</span>
            <h2>Meet the team</h2>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.image}</div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Ready to experience smarter healthcare?</h2>
          <p>Join millions of patients who trust ClinRoute for faster, more accurate care.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">Get started</Link>
            <Link to="/how-it-works" className="btn btn-outline btn-lg">Learn more</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
