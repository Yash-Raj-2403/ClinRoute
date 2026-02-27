import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Shield, Zap, BarChart3, Globe, Headphones, Lock, CheckCircle, Mail, Phone } from 'lucide-react';
import '../public/PublicPages.css';

const Enterprise = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    size: '',
    message: ''
  });

  const enterpriseFeatures = [
    {
      icon: <Shield size={32} />,
      title: 'Enterprise-Grade Security',
      description: 'SOC 2 Type II compliance, dedicated infrastructure, custom BAAs, and advanced security controls'
    },
    {
      icon: <Users size={32} />,
      title: 'Unlimited Users',
      description: 'Scale without limits - add unlimited providers, patients, and admin accounts'
    },
    {
      icon: <Zap size={32} />,
      title: 'Priority Performance',
      description: '99.99% uptime SLA, dedicated resources, and guaranteed response times'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Advanced Analytics',
      description: 'Custom dashboards, detailed reporting, and AI-powered insights for your organization'
    },
    {
      icon: <Globe size={32} />,
      title: 'White-Label Solutions',
      description: 'Fully customizable interface with your branding, domain, and patient experience'
    },
    {
      icon: <Headphones size={32} />,
      title: 'Dedicated Support',
      description: '24/7 priority support, dedicated account manager, and custom SLAs'
    }
  ];

  const plans = [
    {
      name: 'Professional',
      price: '$2,999',
      period: '/month',
      description: 'For growing healthcare organizations',
      features: [
        'Up to 50 providers',
        'Unlimited patients',
        'Standard support (48h response)',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        '99.9% uptime SLA',
        'HIPAA compliance'
      ],
      highlight: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large healthcare systems',
      features: [
        'Unlimited providers',
        'Unlimited patients',
        'Priority 24/7 support',
        'Dedicated account manager',
        'White-label options',
        'Custom infrastructure',
        '99.99% uptime SLA',
        'Advanced security controls',
        'Custom BAA agreements',
        'On-premise deployment options'
      ],
      highlight: true
    },
    {
      name: 'Healthcare System',
      price: 'Custom',
      period: '',
      description: 'For multi-facility organizations',
      features: [
        'Everything in Enterprise',
        'Multi-facility management',
        'Cross-facility analytics',
        'Custom AI model training',
        'Dedicated infrastructure',
        'On-site implementation',
        'Custom compliance requirements',
        'Professional services included'
      ],
      highlight: false
    }
  ];

  const integrations = [
    'Epic EHR',
    'Cerner',
    'Allscripts',
    'Athenahealth',
    'eClinicalWorks',
    'NextGen',
    'Practice Fusion',
    'Meditech'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Our enterprise team will contact you within 24 hours.');
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      size: '',
      message: ''
    });
  };

  return (
    <div className="public-page">
      <div className="public-container">
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Enterprise Solutions</h1>
          <p className="subtitle">
            Powerful, scalable healthcare triage for organizations of all sizes
          </p>
        </motion.div>

        <motion.div className="hero-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Building2 size={80} className="hero-icon" />
          <h2>Transform Healthcare Delivery at Scale</h2>
          <p>
            ClinRoute Enterprise provides healthcare organizations with the tools to modernize patient 
            triage and routing. From small clinics to large hospital systems, our platform scales to 
            meet your needs while maintaining the highest standards of security and compliance.
          </p>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2>Enterprise Features</h2>
          <div className="features-grid">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2>Enterprise Pricing</h2>
          <p className="section-subtitle">Choose the plan that fits your organization's needs</p>
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`pricing-card ${plan.highlight ? 'highlighted' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {plan.highlight && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="price-amount">{plan.price}</span>
                  {plan.period && <span className="price-period">{plan.period}</span>}
                </div>
                <p className="plan-description">{plan.description}</p>
                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={plan.highlight ? 'btn-primary btn-large' : 'btn-secondary btn-large'}>
                  Contact Sales
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          <h2>Seamless Integrations</h2>
          <p>Connect ClinRoute with your existing healthcare systems</p>
          <div className="integrations-grid">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                className="integration-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.05 }}
              >
                <Building2 size={32} />
                <span>{integration}</span>
              </motion.div>
            ))}
          </div>
          <p className="integration-note">
            Don't see your system? We offer custom integration services for any EHR or healthcare platform.
          </p>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}>
          <h2>Why Healthcare Organizations Choose ClinRoute</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Healthcare Organizations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2M+</div>
              <div className="stat-label">Patients Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">40%</div>
              <div className="stat-label">Reduction in Wait Times</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.99%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section security-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
          <Lock size={48} />
          <h2>Enterprise Security & Compliance</h2>
          <div className="two-column-grid">
            <div className="info-card">
              <h3>Certifications</h3>
              <ul>
                <li>HIPAA Compliant</li>
                <li>SOC 2 Type II</li>
                <li>HITRUST Certified</li>
                <li>ISO 27001</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Security Features</h3>
              <ul>
                <li>End-to-end encryption</li>
                <li>Role-based access control</li>
                <li>Audit logging</li>
                <li>Multi-factor authentication</li>
                <li>Regular security audits</li>
                <li>Penetration testing</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section contact-form-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}>
          <h2>Contact Enterprise Sales</h2>
          <p>Let's discuss how ClinRoute can transform your organization's patient care</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization *</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="size">Organization Size *</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <option value="">Select organization size</option>
                <option value="1-50">1-50 providers</option>
                <option value="51-200">51-200 providers</option>
                <option value="201-500">201-500 providers</option>
                <option value="500+">500+ providers</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell us about your needs *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-large">
              Request Enterprise Demo
            </button>
          </form>

          <div className="contact-methods">
            <div className="contact-method">
              <Mail size={24} />
              <div>
                <strong>Email Sales</strong>
                <p>enterprise@clinroute.com</p>
              </div>
            </div>
            <div className="contact-method">
              <Phone size={24} />
              <div>
                <strong>Call Us</strong>
                <p>1-800-CLINROUTE</p>
                <span className="contact-hours">Mon-Fri, 9am-6pm EST</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Enterprise;
