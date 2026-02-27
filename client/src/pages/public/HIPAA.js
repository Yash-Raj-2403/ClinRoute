import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, FileText, CheckCircle, UserCheck } from 'lucide-react';
import '../public/PublicPages.css';

const HIPAA = () => {
  const complianceAreas = [
    {
      icon: <Lock size={32} />,
      title: 'Physical Safeguards',
      items: [
        'Secure, access-controlled data centers',
        '24/7 physical security monitoring',
        'Backup power and environmental controls',
        'Strict facility access policies'
      ]
    },
    {
      icon: <Shield size={32} />,
      title: 'Technical Safeguards',
      items: [
        'AES-256 encryption for data at rest',
        'TLS 1.3 encryption for data in transit',
        'Multi-factor authentication',
        'Unique user identification',
        'Automatic session timeouts',
        'Audit controls and monitoring'
      ]
    },
    {
      icon: <FileText size={32} />,
      title: 'Administrative Safeguards',
      items: [
        'Comprehensive security policies',
        'Regular risk assessments',
        'Employee training programs',
        'Business Associate Agreements',
        'Incident response procedures',
        'Designated Privacy Officer'
      ]
    },
    {
      icon: <UserCheck size={32} />,
      title: 'Privacy Rule Compliance',
      items: [
        'Minimum necessary standard',
        'Patient rights to access records',
        'Notice of Privacy Practices',
        'Consent for use and disclosure',
        'Breach notification procedures',
        'De-identification when appropriate'
      ]
    }
  ];

  return (
    <div className="public-page legal-page">
      <div className="public-container">
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>HIPAA Compliance</h1>
          <p className="subtitle">
            Our commitment to protecting your health information
          </p>
        </motion.div>

        <motion.div className="compliance-badge-large" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Shield size={64} />
          <h2>HIPAA Compliant Platform</h2>
          <p>Certified and audited for healthcare data security</p>
        </motion.div>

        <motion.div className="legal-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p>
            ClinRoute is committed to maintaining the highest standards of security and privacy in handling Protected Health Information (PHI). We are fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) of 1996 and its subsequent amendments, including the HITECH Act.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2>What is HIPAA?</h2>
          <p>
            The Health Insurance Portability and Accountability Act (HIPAA) establishes national standards to protect individuals' medical records and other personal health information. HIPAA requires appropriate safeguards to protect the privacy of personal health information and sets limits and conditions on the uses and disclosures that may be made without patient authorization.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2>Our HIPAA Compliance Framework</h2>
          <div className="compliance-grid">
            {complianceAreas.map((area, index) => (
              <motion.div
                key={index}
                className="compliance-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="card-icon">{area.icon}</div>
                <h3>{area.title}</h3>
                <ul>
                  {area.items.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2>Data Encryption</h2>
          <div className="encryption-grid">
            <div className="encryption-item">
              <Key size={24} />
              <h4>In Transit</h4>
              <p>TLS 1.3 encryption for all data transmitted between your device and our servers</p>
            </div>
            <div className="encryption-item">
              <Lock size={24} />
              <h4>At Rest</h4>
              <p>AES-256 encryption for all stored data in our secure, HIPAA-compliant databases</p>
            </div>
            <div className="encryption-item">
              <Shield size={24} />
              <h4>End-to-End</h4>
              <p>Additional encryption layer for sensitive medical communications</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <h2>Regular Audits and Assessments</h2>
          <ul className="legal-list">
            <li>Annual third-party HIPAA compliance audits</li>
            <li>Quarterly internal security assessments</li>
            <li>Regular penetration testing</li>
            <li>Continuous vulnerability scanning</li>
            <li>SOC 2 Type II certification</li>
            <li>Documentation of all security measures and policies</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <h2>Employee Training</h2>
          <p>
            All ClinRoute employees undergo comprehensive HIPAA training upon hire and receive annual refresher training. Our team is educated on:
          </p>
          <ul className="legal-list">
            <li>HIPAA Privacy and Security Rules</li>
            <li>Proper handling of PHI</li>
            <li>Breach notification procedures</li>
            <li>Security best practices</li>
            <li>Incident response protocols</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <h2>Business Associate Agreements</h2>
          <p>
            We maintain Business Associate Agreements (BAAs) with all third-party vendors who have access to PHI. These agreements ensure that our partners also maintain HIPAA compliance and protect your health information with the same high standards we uphold.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          <h2>Breach Notification</h2>
          <p>
            In the unlikely event of a data breach involving PHI, we have established procedures to:
          </p>
          <ul className="legal-list">
            <li>Identify and contain the breach immediately</li>
            <li>Assess the scope and impact</li>
            <li>Notify affected individuals within 60 days</li>
            <li>Report to the Department of Health and Human Services if required</li>
            <li>Take corrective action to prevent future breaches</li>
            <li>Provide credit monitoring services if appropriate</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <h2>Your Rights Under HIPAA</h2>
          <p>As a patient using ClinRoute, you have the right to:</p>
          <ul className="legal-list">
            <li><strong>Access:</strong> Obtain copies of your health records</li>
            <li><strong>Amendment:</strong> Request corrections to your health information</li>
            <li><strong>Accounting:</strong> Receive an accounting of disclosures</li>
            <li><strong>Restriction:</strong> Request restrictions on uses and disclosures</li>
            <li><strong>Confidential Communication:</strong> Request communication through alternative means</li>
            <li><strong>Privacy Practices:</strong> Receive a copy of our Notice of Privacy Practices</li>
            <li><strong>Complaint:</strong> File a complaint if you believe your privacy rights have been violated</li>
          </ul>
        </motion.div>

        <motion.div className="legal-contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <div className="contact-icon"><Shield size={32} /></div>
          <h3>HIPAA Privacy Officer</h3>
          <p>If you have questions about our HIPAA compliance or wish to exercise your rights:</p>
          <div className="contact-details">
            <p><strong>Email:</strong> privacy@clinroute.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Mail:</strong> HIPAA Privacy Officer<br/>ClinRoute, Inc.<br/>123 Healthcare Plaza<br/>San Francisco, CA 94102</p>
          </div>
          <a href="/contact" className="btn-primary">Contact Privacy Officer</a>
        </motion.div>

        <motion.div className="related-links" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          <h3>Related Information</h3>
          <div className="links-grid">
            <a href="/privacy" className="link-card">Privacy Policy</a>
            <a href="/security" className="link-card">Security Practices</a>
            <a href="/terms" className="link-card">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HIPAA;
