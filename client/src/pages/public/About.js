import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PublicPages.css';

const About = () => {
  const values = [
    {
      icon: '🎯',
      title: 'Patient-First Approach',
      description: 'Every decision we make prioritizes patient outcomes, accessibility, and dignity in healthcare navigation.',
    },
    {
      icon: '🔬',
      title: 'Evidence-Based AI',
      description: 'Our AI is trained on peer-reviewed medical guidelines and continuously validated by healthcare professionals.',
    },
    {
      icon: '🛡️',
      title: 'Privacy & Security',
      description: 'HIPAA-compliant infrastructure with military-grade encryption protecting all health data.',
    },
    {
      icon: '🤝',
      title: 'Universal Accessibility',
      description: 'Healthcare navigation should be simple and accessible for everyone, regardless of technical expertise.',
    },
    {
      icon: '⚡',
      title: 'Innovation Forward',
      description: 'Constantly evolving our technology to deliver faster, more accurate healthcare solutions.',
    },
    {
      icon: '🌐',
      title: 'Global Impact',
      description: 'Building solutions that can transform healthcare navigation worldwide.',
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'ClinRoute founded by Dr. Sarah Chen and Michael Torres after personal experiences with healthcare navigation challenges.',
    },
    {
      year: '2024',
      title: 'AI Launch',
      description: 'Released our first RAG-powered triage system, achieving 93% accuracy in medical specialty routing.',
    },
    {
      year: '2025',
      title: 'Rapid Growth',
      description: 'Expanded to serve over 2M patients and partnered with 50,000+ healthcare providers nationwide.',
    },
    {
      year: '2026',
      title: 'Industry Leader',
      description: 'Recognized as the leading AI-powered healthcare navigation platform with 95% patient satisfaction.',
    },
  ];

  const team = [
    { 
      name: 'Dr. Sarah Chen', 
      role: 'CEO & Co-founder', 
      image: '👩‍⚕️',
      bio: 'Former ER physician with 10+ years experience in emergency medicine',
    },
    { 
      name: 'Michael Torres', 
      role: 'CTO & Co-founder', 
      image: '👨‍💻',
      bio: 'AI researcher from Stanford, previously led ML teams at Google Health',
    },
    { 
      name: 'Dr. James Wilson', 
      role: 'Chief Medical Officer', 
      image: '👨‍⚕️',
      bio: 'Board-certified physician with expertise in clinical informatics',
    },
    { 
      name: 'Priya Sharma', 
      role: 'VP of Engineering', 
      image: '👩‍💻',
      bio: 'Former tech lead at Amazon Web Services, specialist in healthcare systems',
    },
    {
      name: 'Dr. Emily Park',
      role: 'Head of Medical AI',
      image: '👩‍⚕️',
      bio: 'MD-PhD with research focus on clinical decision support systems',
    },
    {
      name: 'David Martinez',
      role: 'VP of Product',
      image: '👨‍💼',
      bio: 'Product strategist with 15+ years in healthcare technology',
    },
  ];

  const stats = [
    { value: '2M+', label: 'Patients Served', icon: '👥' },
    { value: '50K+', label: 'Healthcare Providers', icon: '🏥' },
    { value: '95%', label: 'Triage Accuracy', icon: '🎯' },
    { value: '90%', label: 'Time Saved', icon: '⚡' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="public-page about-page-redesign">
      {/* Hero Section */}
      <motion.section className="about-hero" {...fadeInUp}>
        <div className="container">
          <div className="about-hero-content">
            <motion.span className="hero-badge" {...fadeInUp}>About ClinRoute</motion.span>
            <motion.h1 className="about-hero-title" {...fadeInUp}>
              Revolutionizing Healthcare Navigation with AI
            </motion.h1>
            <motion.p className="about-hero-description" {...fadeInUp}>
              We're on a mission to eliminate the confusion and delays in healthcare navigation, 
              connecting patients with the right care at the right time through intelligent AI-powered triage.
            </motion.p>
            <motion.div className="hero-stats-mini" {...fadeInUp}>
              <div className="mini-stat">
                <span className="mini-stat-value">2M+</span>
                <span className="mini-stat-label">Patients</span>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-value">50K+</span>
                <span className="mini-stat-label">Providers</span>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-value">95%</span>
                <span className="mini-stat-label">Accuracy</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="story-grid">
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Our Story</span>
              <h2>Born from Personal Experience</h2>
              <p>
                In 2023, Dr. Sarah Chen watched her father spend three frustrating weeks navigating 
                the healthcare system, bouncing between wrong specialists for a condition that could 
                have been diagnosed in days with proper triage.
              </p>
              <p>
                That experience sparked a question: In an age of artificial intelligence, why is 
                healthcare navigation still so broken? She partnered with AI researcher Michael Torres, 
                and together they assembled a team of physicians, data scientists, and engineers to build 
                something different.
              </p>
              <p>
                Today, ClinRoute uses advanced RAG (Retrieval-Augmented Generation) technology to analyze 
                symptoms, prioritize urgency, and connect patients with the right specialists — reducing 
                diagnostic time by 90% and improving care accuracy across the board.
              </p>
            </motion.div>
            <motion.div 
              className="story-visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="visual-card">
                <div className="visual-stat">
                  <span className="visual-number">73%</span>
                  <p>of patients report confusion about where to seek care</p>
                </div>
                <div className="visual-arrow">↓</div>
                <div className="visual-solution">
                  <span className="solution-badge">ClinRoute Solution</span>
                  <p>AI-powered guidance in under 5 minutes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header-center-about">
            <span className="section-label">Our Journey</span>
            <h2>Milestones That Matter</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div 
                key={index} 
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section-new">
        <div className="container">
          <div className="section-header-center-about">
            <span className="section-label">Our Values</span>
            <h2>What Drives Us Every Day</h2>
            <p className="values-subtitle">
              These principles guide every decision we make and every feature we build
            </p>
          </div>
          <div className="values-grid-new">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-card-new"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="value-icon-new">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-stats-section">
        <div className="container">
          <div className="section-header-center-about">
            <span className="section-label">Our Impact</span>
            <h2>Making Healthcare Better, One Patient at a Time</h2>
          </div>
          <div className="impact-stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="impact-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index  * 0.1 }}
              >
                <div className="impact-icon">{stat.icon}</div>
                <div className="impact-value">{stat.value}</div>
                <div className="impact-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section-new">
        <div className="container">
          <div className="section-header-center-about">
            <span className="section-label">Leadership Team</span>
            <h2>Meet the Minds Behind ClinRoute</h2>
            <p className="team-subtitle">
              A diverse team of physicians, engineers, and healthcare innovators
            </p>
          </div>
          <div className="team-grid-new">
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-card-new"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="team-avatar-new">{member.image}</div>
                <h4>{member.name}</h4>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div 
            className="about-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join Us in Transforming Healthcare</h2>
            <p>
              Whether you're a patient seeking better care navigation or a provider looking to 
              improve patient flow, ClinRoute is here to help.
            </p>
            <div className="cta-buttons-about">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/for-doctors" className="btn btn-outline btn-lg">
                For Healthcare Providers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
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
