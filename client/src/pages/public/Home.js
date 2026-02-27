import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const specialties = [
    { name: 'Primary Care', icon: '🩺', color: '#FEF3C7' },
    { name: 'Cardiology', icon: '❤️', color: '#FEE2E2' },
    { name: 'Dermatology', icon: '✨', color: '#E0E7FF' },
    { name: 'Neurology', icon: '🧠', color: '#D1FAE5' },
    { name: 'Orthopedics', icon: '🦴', color: '#FEF3C7' },
    { name: 'Pediatrics', icon: '👶', color: '#FCE7F3' },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Describe Your Symptoms',
      description: 'Tell our RAG assistant about your symptoms, concerns, and medical history through our intelligent chat interface.',
      icon: '💬',
    },
    {
      step: 2,
      title: 'RAG Analyzes & Prioritizes',
      description: 'Our system uses medical knowledge bases to assess urgency and recommend the right care pathway.',
      icon: '🤖',
    },
    {
      step: 3,
      title: 'Connect with Specialists',
      description: 'Get matched with the right doctor based on your condition, location, and availability.',
      icon: '👨‍⚕️',
    },
  ];

  const stats = [
    { value: '2M+', label: 'Patients Helped' },
    { value: '50K+', label: 'Healthcare Providers' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '< 5min', label: 'Avg. Triage Time' },
  ];

  const testimonials = [
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      image: '👩',
      text: 'ClinRoute saved me hours of research. Within minutes, I was connected with the right specialist for my condition.',
      rating: 5,
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      image: '👨‍⚕️',
      text: 'The AI triage system is incredibly accurate. My patients arrive better prepared and we spend less time on initial assessments.',
      rating: 5,
    },
    {
      name: 'Sarah Thompson', 
      role: 'Patient',
      image: '👩‍🦰',
      text: 'As someone with anxiety about healthcare, ClinRoute made the process so much less overwhelming. Highly recommend!',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Instant Triage',
      description: 'Get AI-powered assessment in under 5 minutes',
    },
    {
      icon: '🎯',
      title: 'Right Specialist Match',
      description: 'Connected to the perfect provider for your needs',
    },
    {
      icon: '📊',
      title: 'Smart Prioritization',
      description: 'Urgent cases fast-tracked automatically',
    },
    {
      icon: '🔒',
      title: 'HIPAA Compliant',
      description: 'Your health data is fully encrypted and secure',
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Triage and book appointments from anywhere',
    },
    {
      icon: '💬',
      title: '24/7 AI Assistant',
      description: 'Get help anytime, day or night',
    },
  ];

  const trustBadges = [
    { icon: '🏆', text: 'Best Healthcare AI 2025' },
    { icon: '🛡️', text: 'SOC 2 Certified' },
    { icon: '⭐', text: '4.9/5 Patient Rating' },
    { icon: '✓', text: 'HIPAA Compliant' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="container"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="hero-content">
            <div className="hero-text">
              <motion.h1 className="hero-title" variants={fadeInUp}>
                Smart healthcare routing<br />
                <span className="hero-highlight">powered by RAG</span>
              </motion.h1>
              <motion.p className="hero-subtitle" variants={fadeInUp}>
                Skip the waiting room confusion. Our RAG-powered assistant instantly assesses your symptoms, 
                prioritizes your care needs, and connects you with the right specialist.
              </motion.p>
              
              {/* Search Box */}
              <motion.form className="hero-search" onSubmit={handleSearch} variants={fadeInUp}>
                <div className="search-field">
                  <label>Symptoms or Condition</label>
                  <input 
                    type="text" 
                    placeholder="e.g. chest pain, headache, skin rash"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="search-divider"></div>
                <div className="search-field">
                  <label>Location</label>
                  <input 
                    type="text" 
                    placeholder="City or ZIP code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <motion.button 
                  type="submit" 
                  className="search-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={20} />
                  Find care
                </motion.button>
              </motion.form>
            </div>

            {/* Hero Illustration */}
            <motion.div 
              className="hero-illustration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-image-wrapper">
                {/* Healthcare Team SVG Illustration */}
                <svg className="hero-team-illustration" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Elements */}
                  <ellipse cx="400" cy="550" rx="350" ry="30" fill="#f0f0f0"/>
                  
                  {/* Clipboard - Left */}
                  <g transform="translate(50, 180)">
                    <rect x="0" y="20" width="80" height="100" rx="8" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="2"/>
                    <rect x="25" y="0" width="30" height="30" rx="4" fill="#d0d0d0"/>
                    <rect x="10" y="40" width="60" height="4" rx="2" fill="#c0c0c0"/>
                    <rect x="10" y="52" width="50" height="4" rx="2" fill="#c0c0c0"/>
                    <rect x="10" y="64" width="55" height="4" rx="2" fill="#c0c0c0"/>
                    <rect x="10" y="76" width="45" height="4" rx="2" fill="#c0c0c0"/>
                  </g>
                  
                  {/* Medical Cross - Top */}
                  <g transform="translate(300, 80)">
                    <circle cx="30" cy="30" r="28" fill="none" stroke="#f87171" strokeWidth="3"/>
                    <rect x="23" y="12" width="14" height="36" rx="2" fill="#f87171"/>
                    <rect x="12" y="23" width="36" height="14" rx="2" fill="#f87171"/>
                  </g>
                  
                  {/* Heart with Pulse - Top Right */}
                  <g transform="translate(480, 60)">
                    <path d="M40 25C40 15 32 8 22 8C12 8 4 18 4 28C4 50 40 70 40 70C40 70 76 50 76 28C76 18 68 8 58 8C48 8 40 15 40 25Z" fill="#fca5a5"/>
                    <path d="M15 35L25 35L30 25L35 45L40 35L50 35" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </g>
                  
                  {/* Medicine Bottle - Right */}
                  <g transform="translate(680, 150)">
                    <rect x="10" y="0" width="40" height="15" rx="4" fill="#d0d0d0"/>
                    <rect x="5" y="15" width="50" height="80" rx="8" fill="#e8e8e8"/>
                    <rect x="15" y="45" width="30" height="3" rx="1" fill="#c0c0c0"/>
                    <rect x="15" y="55" width="25" height="3" rx="1" fill="#c0c0c0"/>
                  </g>
                  
                  {/* Thumbs Up - Left Top */}
                  <g transform="translate(30, 100)">
                    <path d="M30 5H40C45 5 50 10 50 15V45C50 50 45 55 40 55H20V30L30 5Z" fill="#e0e0e0"/>
                    <rect x="5" y="30" width="15" height="25" rx="3" fill="#d0d0d0"/>
                  </g>
                  
                  {/* Female Doctor - Left */}
                  <g transform="translate(180, 150)">
                    {/* Body */}
                    <path d="M60 180L55 350H45L50 230L35 230L40 350H30L35 180Z" fill="#f87171"/>
                    <path d="M30 180L75 180L80 250L25 250Z" fill="#f87171"/>
                    {/* Lab Coat */}
                    <path d="M20 180L85 180L90 320L15 320Z" fill="white" stroke="#e5e5e5" strokeWidth="2"/>
                    <path d="M35 180L35 320" stroke="#ef4444" strokeWidth="2"/>
                    {/* Head */}
                    <circle cx="52" cy="130" r="45" fill="#fcd5b8"/>
                    {/* Hair */}
                    <path d="M20 120C20 80 40 55 52 55C64 55 90 70 95 120C95 100 80 85 52 85C30 85 20 100 20 120Z" fill="#1f2937"/>
                    <path d="M15 130C10 150 15 180 25 200" stroke="#1f2937" strokeWidth="8" strokeLinecap="round"/>
                    <path d="M85 130C90 145 90 165 85 185" stroke="#1f2937" strokeWidth="8" strokeLinecap="round"/>
                    {/* Face */}
                    <ellipse cx="40" cy="125" rx="4" ry="5" fill="#1f2937"/>
                    <ellipse cx="65" cy="125" rx="4" ry="5" fill="#1f2937"/>
                    <path d="M45 148C48 152 56 152 60 148" stroke="#c9a090" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    {/* Arms */}
                    <path d="M20 190L5 230L15 280L25 275L18 235L30 200" fill="#fcd5b8"/>
                    <path d="M85 190L100 250" stroke="#fcd5b8" strokeWidth="20" strokeLinecap="round"/>
                    {/* Clipboard in hand */}
                    <rect x="90" y="230" width="35" height="50" rx="4" fill="#374151"/>
                  </g>
                  
                  {/* Male Doctor Center */}
                  <g transform="translate(340, 130)">
                    {/* Body */}
                    <path d="M40 200L100 200L105 370L35 370Z" fill="#f87171"/>
                    {/* Lab Coat */}
                    <path d="M30 200L110 200L120 370L20 370Z" fill="white" stroke="#e5e5e5" strokeWidth="2"/>
                    <line x1="70" y1="200" x2="70" y2="370" stroke="#e8e8e8" strokeWidth="1"/>
                    {/* Head */}
                    <circle cx="70" cy="140" r="50" fill="#d4a57b"/>
                    {/* Hair */}
                    <path d="M30 120C35 80 55 65 70 65C85 65 105 80 110 120C110 95 95 80 70 80C50 80 35 95 30 120Z" fill="#1f2937"/>
                    {/* Glasses */}
                    <circle cx="55" cy="135" r="15" fill="none" stroke="#374151" strokeWidth="2"/>
                    <circle cx="85" cy="135" r="15" fill="none" stroke="#374151" strokeWidth="2"/>
                    <path d="M70 135L70 135" stroke="#374151" strokeWidth="2"/>
                    <path d="M40 135L30 130" stroke="#374151" strokeWidth="2"/>
                    <path d="M100 135L110 130" stroke="#374151" strokeWidth="2"/>
                    {/* Eyes */}
                    <ellipse cx="55" cy="135" rx="3" ry="4" fill="#1f2937"/>
                    <ellipse cx="85" cy="135" rx="3" ry="4" fill="#1f2937"/>
                    {/* Smile */}
                    <path d="M60 160C65 167 75 167 80 160" stroke="#b8956e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    {/* Arms crossed */}
                    <path d="M30 210L20 270L50 290L70 260L90 290L120 270L110 210" fill="#d4a57b"/>
                    {/* Stethoscope */}
                    <path d="M55 200C55 220 50 250 70 250C90 250 85 220 85 200" stroke="#374151" strokeWidth="4" fill="none"/>
                    <circle cx="70" cy="255" r="8" fill="#374151"/>
                  </g>
                  
                  {/* Male Nurse - Right */}
                  <g transform="translate(530, 160)">
                    {/* Body - Scrubs */}
                    <path d="M40 170L100 170L110 350L30 350Z" fill="#f87171"/>
                    {/* V-neck */}
                    <path d="M55 170L70 200L85 170" stroke="#dc2626" strokeWidth="2" fill="#f87171"/>
                    {/* Head */}
                    <circle cx="70" cy="120" r="45" fill="#fcd5b8"/>
                    {/* Hair */}
                    <path d="M35 100C40 65 55 55 70 55C85 55 100 65 105 100C105 80 90 65 70 65C50 65 35 80 35 100Z" fill="#1f2937"/>
                    {/* Face */}
                    <ellipse cx="55" cy="115" rx="4" ry="5" fill="#1f2937"/>
                    <ellipse cx="85" cy="115" rx="4" ry="5" fill="#1f2937"/>
                    <path d="M60 140C65 145 75 145 80 140" stroke="#c9a090" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    {/* Arms */}
                    <path d="M30 180L15 240" stroke="#fcd5b8" strokeWidth="18" strokeLinecap="round"/>
                    <path d="M110 180L125 240" stroke="#fcd5b8" strokeWidth="18" strokeLinecap="round"/>
                    {/* Clipboard in hand */}
                    <rect x="110" y="220" width="35" height="50" rx="4" fill="#374151"/>
                    {/* Stethoscope */}
                    <path d="M60 170C55 190 60 210 70 210C80 210 85 190 80 170" stroke="#1f2937" strokeWidth="3" fill="none"/>
                    <circle cx="70" cy="215" r="6" fill="#374151"/>
                  </g>
                </svg>
                
                {/* Floating Cards */}
                <div className="floating-card card-1">
                  <div className="card-icon success">✓</div>
                  <div>
                    <strong>AI Assessment Complete</strong>
                    <span>Moderate Priority</span>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon primary">🩺</div>
                  <div>
                    <strong>Dr. Sarah Johnson</strong>
                    <span>Available in 2 hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </section>

      {/* Top Specialties */}
      <section className="specialties-section">
        <div className="container">
          <h2 className="section-title">RAG-Powered Triage for Any Specialty</h2>
          <p className="section-subtitle">Our system intelligently routes you to the right department</p>
          
          <div className="specialties-grid">
            {specialties.map((specialty, index) => (
              <Link to="/register" key={index} className="specialty-card" style={{ backgroundColor: specialty.color }}>
                <div className="specialty-icon">{specialty.icon}</div>
                <span className="specialty-name">{specialty.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="hiw-header">
            <h2 className="section-title">Let's get you the right care, faster</h2>
          </div>

          <div className="hiw-cards">
            {howItWorks.map((item, index) => (
              <div key={index} className="hiw-card">
                <div className="hiw-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="hiw-btn">
                  {index === 0 ? 'Start assessment' : index === 1 ? 'Learn about AI' : 'Find doctors'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-section">
        <div className="container">
          <div className="app-content">
            <div className="app-text">
              <h2>Intelligent triage.<br/>One app.</h2>
              <p>
                The ClinRoute app uses AI to assess your symptoms, 
                prioritize your care needs, and connect you with the right 
                healthcare provider - all from your phone.
              </p>
              <div className="app-qr">
                <div className="qr-placeholder">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#f0f0f0" rx="8"/>
                    <text x="50" y="55" textAnchor="middle" fontSize="12" fill="#666">QR Code</text>
                  </svg>
                </div>
                <span>Scan to download</span>
              </div>
              <div className="app-buttons">
                <a href="#" className="app-store-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div>
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </a>
                <a href="#" className="app-store-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.806 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div>
                    <span>GET IT ON</span>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>
            </div>
            <div className="app-mockup">
              <div className="phone-mockup">
                <div className="mockup-screen">
                  <div className="mockup-header">
                    <span className="mockup-logo">ClinRoute</span>
                    <span className="mockup-badge">AI Active</span>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-card">
                      <div className="urgency-badge urgent">Urgent</div>
                      <h4>Chest discomfort</h4>
                      <p>Recommended: Cardiology</p>
                      <div className="mockup-doctors">
                        <div className="doctor-avatar">SJ</div>
                        <div className="doctor-avatar">MK</div>
                        <div className="doctor-avatar">+3</div>
                      </div>
                    </div>
                    <div className="mockup-card">
                      <div className="urgency-badge low">Routine</div>
                      <h4>Annual checkup</h4>
                      <p>Recommended: Primary Care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Healthcare Providers */}
      <section className="providers-section">
        <div className="container">
          <div className="providers-grid">
            <div className="provider-card">
              <div className="provider-image">
                <div className="image-placeholder doctor-img">👩‍⚕️</div>
              </div>
              <div className="provider-content">
                <span className="provider-label">ClinRoute for Private Practices</span>
                <h3>Are you a practice looking to optimize patient flow?</h3>
                <ul>
                  <li>Receive AI-triaged patient referrals</li>
                  <li>Reduce no-shows with smart scheduling</li>
                  <li>Access comprehensive patient summaries before visits</li>
                </ul>
                <Link to="/for-doctors" className="btn btn-primary">
                  Learn more about practice solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Systems */}
      <section className="health-systems-section">
        <div className="container">
          <div className="systems-header">
            <span className="systems-label">ClinRoute for health systems</span>
            <h2>Trusted by leading healthcare organizations</h2>
          </div>
          <div className="systems-logos">
            <div className="system-logo">🏥 MedStar Health</div>
            <div className="system-logo">🏥 Mount Sinai</div>
            <div className="system-logo">🏥 Cleveland Clinic</div>
            <div className="system-logo">🏥 Mayo Clinic</div>
          </div>
          <Link to="/for-hospitals" className="btn btn-secondary">
            Explore enterprise solutions
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="features-grid-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Everything you need for smarter healthcare</h2>
            <p className="section-subtitle">Powerful features designed to simplify your healthcare journey</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Trusted by millions of patients</h2>
            <p className="section-subtitle">See what our users are saying about ClinRoute</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="testimonial-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.image}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="trust-badges-section">
        <div className="container">
          <div className="trust-badges-grid">
            {trustBadges.map((badge, index) => (
              <motion.div 
                key={index} 
                className="trust-badge"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="trust-icon">{badge.icon}</span>
                <span className="trust-text">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to experience smarter healthcare?</h2>
            <p>
              Join millions of patients who've discovered faster, more accurate 
              healthcare routing with ClinRoute's RAG-powered platform.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get started free
              </Link>
              <Link to="/how-it-works" className="btn btn-outline btn-lg">
                Learn how it works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
