import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Scale, AlertCircle } from 'lucide-react';
import '../public/PublicPages.css';

const Terms = () => {
  const lastUpdated = 'February 27, 2026';

  return (
    <div className="public-page legal-page">
      <div className="public-container">
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Terms of Service</h1>
          <p className="subtitle">
            Please read these terms carefully before using ClinRoute
          </p>
          <p className="last-updated">Last Updated: {lastUpdated}</p>
        </motion.div>

        <motion.div className="legal-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p>
            Welcome to ClinRoute. By accessing or using our platform, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="section-header">
            <div className="section-icon"><Users size={24} /></div>
            <h2>1. Acceptance of Terms</h2>
          </div>
          <p>
            By creating an account and using ClinRoute, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. These terms apply to all users, including patients, healthcare providers, and visitors.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2>2. Service Description</h2>
          <p>ClinRoute provides an AI-powered healthcare platform that includes:</p>
          <ul className="legal-list">
            <li>AI-driven triage and symptom assessment using RAG (Retrieval-Augmented Generation) technology</li>
            <li>Connection with licensed healthcare providers</li>
            <li>Telemedicine and video consultation services</li>
            <li>Medical record management</li>
            <li>Appointment scheduling and management</li>
          </ul>
          <div className="alert-box">
            <AlertCircle size={20} />
            <p><strong>Important:</strong> ClinRoute is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          </div>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2>3. User Accounts</h2>
          <ul className="legal-list">
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You agree to provide accurate and complete information</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must notify us immediately of any unauthorized use</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2>4. Medical Disclaimer</h2>
          <ul className="legal-list">
            <li>ClinRoute's AI system provides assessments, not diagnoses</li>
            <li>Always consult with a licensed healthcare provider for medical advice</li>
            <li>In case of emergency, call 911 or go to the nearest emergency room</li>
            <li>The platform does not replace in-person medical examinations</li>
            <li>Results and recommendations are for informational purposes only</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h2>5. User Conduct</h2>
          <p>You agree NOT to:</p>
          <ul className="legal-list">
            <li>Provide false or misleading medical information</li>
            <li>Use the platform for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the platform's operation</li>
            <li>Upload viruses or malicious code</li>
            <li>Harass, abuse, or harm other users or healthcare providers</li>
            <li>Share your account credentials with others</li>
            <li>Use automated systems to access the platform without permission</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2>6. Payment Terms</h2>
          <ul className="legal-list">
            <li>Fees for consultations are set by individual healthcare providers</li>
            <li>Payment is required before or at the time of service</li>
            <li>All fees are in U.S. dollars unless otherwise stated</li>
            <li>Refunds are subject to our cancellation policy</li>
            <li>You are responsible for any applicable taxes</li>
            <li>Insurance coverage varies by provider</li>
          </ul>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2>7. Intellectual Property</h2>
          <p>
            All content, features, and functionality on ClinRoute, including but not limited to text, graphics, logos, AI models, and software, are owned by ClinRoute, Inc. and protected by copyright, trademark, and other intellectual property laws.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 1 }}>
          <div className="section-header">
            <div className="section-icon"><Scale size={24} /></div>
            <h2>8. Limitation of Liability</h2>
          </div>
          <p>
            To the fullest extent permitted by law, ClinRoute shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, including but not limited to medical outcomes, loss of data, or loss of profits.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <h2>9. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or through the platform. Your continued use of ClinRoute after such modifications constitutes acceptance of the updated terms.
          </p>
        </motion.div>

        <motion.div className="legal-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          <h2>11. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
          </p>
        </motion.div>

        <motion.div className="legal-contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <div className="contact-icon"><FileText size={32} /></div>
          <h3>Questions About Our Terms?</h3>
          <p>If you have questions about these Terms of Service:</p>
          <div className="contact-details">
            <p><strong>Email:</strong> legal@clinroute.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
          <a href="/contact" className="btn-primary">Contact Us</a>
        </motion.div>

        <motion.div className="related-links" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <h3>Related Policies</h3>
          <div className="links-grid">
            <a href="/privacy" className="link-card">Privacy Policy</a>
            <a href="/hipaa" className="link-card">HIPAA Compliance</a>
            <a href="/cookies" className="link-card">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
