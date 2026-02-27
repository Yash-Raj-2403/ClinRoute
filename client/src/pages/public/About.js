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
              <h2>Born from a Vision</h2>
              <p>
                Healthcare navigation has been broken for decades. Patients spend weeks bouncing 
                between wrong specialists, urgent cases get missed, and the system wastes countless 
                hours on inefficient routing.
              </p>
              <p>
                ClinRoute was founded to solve this problem using cutting-edge artificial intelligence. 
                Our team of physicians, data scientists, and engineers built a platform that can analyze 
                symptoms, prioritize urgency, and connect patients with the right specialists instantly.
              </p>
              <p>
                Today, ClinRoute uses advanced RAG (Retrieval-Augmented Generation) technology powered by 
                Llama 3.3 70B to deliver accurate medical triage. The platform reduces diagnostic time, 
                improves care accuracy, and makes healthcare navigation simple for everyone.
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
