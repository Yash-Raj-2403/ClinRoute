import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, CheckCircle } from 'lucide-react';
import '../public/PublicPages.css';

const Cookies = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false
  });

  const cookieTypes = [
    {
      type: 'necessary',
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, authentication, and session management.',
      examples: ['Session ID', 'Authentication tokens', 'Security cookies'],
      canDisable: false
    },
    {
      type: 'functional',
      title: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
      examples: ['Language preferences', 'Theme settings', 'Notification preferences'],
      canDisable: true
    },
    {
      type: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Google Analytics', 'Page views', 'User behavior tracking'],
      canDisable: true
    },
    {
      type: 'marketing',
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertising.',
      examples: ['Ad targeting', 'Conversion tracking', 'Retargeting pixels'],
      canDisable: true
    }
  ];

  const handleToggle = (type) => {
    if (type !== 'necessary') {
      setPreferences({ ...preferences, [type]: !preferences[type] });
    }
  };

  const handleSavePreferences = () => {
    // In a real app, this would save to localStorage and update consent
    alert('Your cookie preferences have been saved!');
  };

  return (
    <div className="public-page legal-page">
      <div className="public-container">
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Cookie Policy</h1>
          <p className="subtitle">
            Learn about how we use cookies and manage your preferences
          </p>
          <p className="last-updated">Last Updated: February 27, 2026</p>
        </motion.div>

        <motion.div className="legal-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p>
            ClinRoute uses cookies and similar tracking technologies to improve your experience on our platform. This Cookie Policy explains what cookies are, how we use them, and how you can control them.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="section-header">
            <div className="section-icon"><Cookie size={24} /></div>
            <h2>What Are Cookies?</h2>
          </div>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies help us remember your preferences, understand how you use our platform, and improve your overall experience.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2>Types of Cookies We Use</h2>
          <div className="cookie-types">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                className="cookie-type-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="cookie-header">
                  <div>
                    <h3>{cookie.title}</h3>
                    {!cookie.canDisable && <span className="required-badge">Required</span>}
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences[cookie.type]}
                      onChange={() => handleToggle(cookie.type)}
                      disabled={!cookie.canDisable}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p>{cookie.description}</p>
                <div className="cookie-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {cookie.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2>Third-Party Cookies</h2>
          <p>We may use services from third-party providers that also set cookies on your device:</p>
          <ul className="legal-list">
            <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
            <li><strong>Supabase:</strong> For authentication and database services</li>
            <li><strong>Groq:</strong> For AI-powered triage services</li>
            <li><strong>Payment Processors:</strong> For secure payment processing</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2>Managing Your Cookie Preferences</h2>
          <p>You have several options to control or limit cookies:</p>
          <ul className="legal-list">
            <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings</li>
            <li><strong>Our Cookie Manager:</strong> Use the toggles above to manage your preferences on ClinRoute</li>
            <li><strong>Opt-Out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
            <li><strong>Clear Cookies:</strong> You can delete cookies already on your device</li>
          </ul>
          <div className="cookie-actions">
            <button className="btn-primary" onClick={handleSavePreferences}>
              <CheckCircle size={20} />
              Save Cookie Preferences
            </button>
            <button className="btn-secondary">
              <Settings size={20} />
              Advanced Settings
            </button>
          </div>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <h2>Cookie Duration</h2>
          <p>We use both session and persistent cookies:</p>
          <ul className="legal-list">
            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <h2>Impact of Disabling Cookies</h2>
          <p>
            While you can choose to disable certain cookies, please note that this may affect your experience on ClinRoute. Disabling necessary cookies will prevent the platform from functioning properly, and disabling functional cookies may limit personalization features.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
          </p>
        </motion.div>

        <motion.div className="legal-contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          <div className="contact-icon"><Cookie size={32} /></div>
          <h3>Questions About Cookies?</h3>
          <p>If you have questions about our use of cookies:</p>
          <div className="contact-details">
            <p><strong>Email:</strong> privacy@clinroute.com</p>
          </div>
          <a href="/contact" className="btn-primary">Contact Us</a>
        </motion.div>

        <motion.div className="related-links" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <h3>Related Policies</h3>
          <div className="links-grid">
            <a href="/privacy" className="link-card">Privacy Policy</a>
            <a href="/terms" className="link-card">Terms of Service</a>
            <a href="/security" className="link-card">Security</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
