import React from 'react';
import {motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import '../public/PublicPages.css';

const Privacy = () => {
  const lastUpdated = 'February 27, 2026';

  const sections = [
    {
      icon: <Database size={24} />,
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email, phone number, date of birth, contact details',
        'Medical Information: Health history, symptoms, vital signs, medications, allergies',
        'Usage Data: How you interact with our platform, pages visited, features used',
        'Technical Data: IP address, browser type, device information, operating system',
        'Communication Data: Messages sent through our platform, consultation notes'
      ]
    },
    {
      icon: <Lock size={24} />,
      title: 'How We Use Your Information',
      content: [
        'Providing and improving our healthcare services',
        'Connecting you with appropriate healthcare providers',
        'AI-powered triage and symptom analysis',
        'Processing appointments and consultations',
        'Sending appointment reminders and health updates',
        'Ensuring platform security and preventing fraud',
        'Complying with legal obligations and regulations',
        'Analyzing and improving our services'
      ]
    },
    {
      icon: <Shield size={24} />,
      title: 'Data Security',
      content: [
        'End-to-end encryption for all data transmission',
        'AES-256 encryption for data at rest',
        'SOC 2 Type II certified infrastructure',
        'Regular security audits and penetration testing',
        'Multi-factor authentication options',
        'Secure data centers with 24/7 monitoring',
        'HIPAA-compliant data handling procedures',
        'Regular staff training on data protection'
      ]
    },
    {
      icon: <Eye size={24} />,
      title: 'Information Sharing',
      content: [
        'Healthcare Providers: Shared only with your chosen doctors for consultations',
        'Service Providers: Trusted partners who help us operate our platform',
        'Legal Requirements: When required by law or to protect rights and safety',
        'With Your Consent: Only when you explicitly authorize sharing',
        'We NEVER sell your personal or medical information to third parties',
        'All partners are bound by strict confidentiality agreements'
      ]
    },
    {
      icon: <UserCheck size={24} />,
      title: 'Your Rights',
      content: [
        'Access: Request copies of your personal and medical data',
        'Correction: Update or correct inaccurate information',
        'Deletion: Request deletion of your account and data',
        'Portability: Export your data in a common format',
        'Restriction: Limit how we process your information',
        'Objection: Object to certain types of processing',
        'Withdrawal: Withdraw consent at any time',
        'Complaint: File complaints with data protection authorities'
      ]
    }
  ];

  return (
    <div className="public-page legal-page">
      <div className="public-container">
        {/* Header */}
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Privacy Policy</h1>
          <p className="subtitle">
            Your privacy is our priority. Learn how we collect, use, and protect your information.
          </p>
          <p className="last-updated">Last Updated: {lastUpdated}</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="legal-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p>
            At ClinRoute, we understand that your medical information is highly sensitive and private. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our AI-powered healthcare platform.
          </p>
          <p>
            By using ClinRoute, you agree to the collection and use of information in accordance with 
            this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="legal-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="section-header">
              <div className="section-icon">{section.icon}</div>
              <h2>{section.title}</h2>
            </div>
            <ul className="legal-list">
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Additional Sections */}
        <motion.div
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. 
            For detailed information about our cookie practices, please see our{' '}
            <a href="/cookies">Cookie Policy</a>.
          </p>
        </motion.div>

        <motion.div
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children. If you are a parent or guardian and believe 
            your child has provided us with personal information, please contact us immediately.
          </p>
        </motion.div>

        <motion.div
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on servers located in the United States. 
            We ensure appropriate safeguards are in place to protect your information in compliance with 
            applicable data protection laws.
          </p>
        </motion.div>

        <motion.div
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2>Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date. Significant 
            changes will be communicated via email or prominent notice on our platform.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="legal-contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <div className="contact-icon">
            <FileText size={32} />
          </div>
          <h3>Questions About Our Privacy Policy?</h3>
          <p>If you have questions or concerns about this Privacy Policy or our data practices:</p>
          <div className="contact-details">
            <p><strong>Email:</strong> privacy@clinroute.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Mail:</strong> ClinRoute, Inc.<br/>123 Healthcare Plaza<br/>San Francisco, CA 94102</p>
          </div>
          <a href="/contact" className="btn-primary">Contact Us</a>
        </motion.div>

        {/* Related Links */}
        <motion.div
          className="related-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h3>Related Policies</h3>
          <div className="links-grid">
            <a href="/terms" className="link-card">Terms of Service</a>
            <a href="/hipaa" className="link-card">HIPAA Compliance</a>
            <a href="/cookies" className="link-card">Cookie Policy</a>
            <a href="/security" className="link-card">Security Practices</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
