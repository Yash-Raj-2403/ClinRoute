import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import '../public/PublicPages.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'patients', name: 'For Patients' },
    { id: 'doctors', name: 'For Doctors' },
    { id: 'technical', name: 'Technical' },
    { id: 'billing', name: 'Billing' }
  ];

  const faqs = [
    {
      category: 'general',
      question: 'What is ClinRoute?',
      answer: 'ClinRoute is an AI-powered healthcare platform that uses advanced triage technology to connect patients with the right healthcare providers quickly and efficiently. Our RAG (Retrieval-Augmented Generation) system analyzes symptoms and medical history to provide intelligent routing and recommendations.'
    },
    {
      category: 'general',
      question: 'How does the AI triage system work?',
      answer: 'Our AI triage system uses Llama 3.3 70B, a state-of-the-art language model, combined with RAG technology to analyze patient symptoms, medical history, and vital signs. It assesses urgency levels and recommends appropriate next steps, whether that\'s emergency care, urgent care, or scheduling a regular appointment.'
    },
    {
      category: 'patients',
      question: 'Is my medical information secure?',
      answer: 'Absolutely. ClinRoute is HIPAA compliant and SOC 2 Type II certified. We use bank-level encryption for all data transmission and storage. Your medical information is never shared without your explicit consent, and we employ multiple layers of security to protect your privacy.'
    },
    {
      category: 'patients',
      question: 'How do I register as a patient?',
      answer: 'Click the "Get Started" or "Register" button on our homepage. You\'ll need to provide basic information including your name, email, date of birth, and create a secure password. After registration, you can complete your medical profile at your own pace.'
    },
    {
      category: 'patients',
      question: 'Can I use ClinRoute for emergencies?',
      answer: 'While ClinRoute can assess the urgency of your condition, for life-threatening emergencies, always call 911 or go to the nearest emergency room immediately. Our AI can help determine if your situation requires emergency care, but should not delay emergency response.'
    },
    {
      category: 'patients',
      question: 'How much does ClinRoute cost?',
      answer: 'Creating a ClinRoute account and using our AI triage assistant is free. Consultation fees vary by provider and are clearly displayed before booking. Many providers accept insurance, and we\'re working to expand our insurance partnerships.'
    },
    {
      category: 'doctors',
      question: 'How do I join ClinRoute as a healthcare provider?',
      answer: 'Click "For Doctors" in the navigation menu and complete the provider registration form. You\'ll need to provide your medical license information, credentials, and specialty. Our team will verify your credentials, typically within 24-48 hours, before activating your account.'
    },
    {
      category: 'doctors',
      question: 'What are the benefits for healthcare providers?',
      answer: 'ClinRoute helps providers manage their patient flow more efficiently, reduce no-shows with automated reminders, access comprehensive patient histories before consultations, and expand their practice reach through telemedicine capabilities. Our AI pre-screens patients, so you can focus on providing care.'
    },
    {
      category: 'doctors',
      question: 'Can I set my own availability and fees?',
      answer: 'Yes! You have complete control over your schedule, consultation types, fees, and appointment duration. You can also block time slots for breaks, set different fees for different consultation types, and update your availability in real-time.'
    },
    {
      category: 'technical',
      question: 'What devices and browsers are supported?',
      answer: 'ClinRoute works on all modern web browsers including Chrome, Firefox, Safari, and Edge. We also offer mobile-responsive design, so you can access the platform from smartphones and tablets. We\'re currently developing native iOS and Android apps.'
    },
    {
      category: 'technical',
      question: 'Do I need special equipment for video consultations?',
      answer: 'You only need a device with a camera and microphone (laptop, tablet, or smartphone) and a stable internet connection. We recommend a download speed of at least 3 Mbps for smooth video consultations.'
    },
    {
      category: 'technical',
      question: 'What if I experience technical issues during a consultation?',
      answer: 'We have 24/7 technical support available. During a consultation, you\'ll see a "Help" button that connects you to immediate support. We also have a comprehensive troubleshooting guide in our Help Center, and consultations can continue via phone if video fails.'
    },
    {
      category: 'billing',
      question: 'How do payments work?',
      answer: 'Payments are processed securely through our platform after each consultation. We accept all major credit cards and many insurance plans. You\'ll receive an itemized receipt via email, and if you have insurance, we\'ll provide the necessary documentation for reimbursement.'
    },
    {
      category: 'billing',
      question: 'Do you accept insurance?',
      answer: 'We accept many major insurance plans, and coverage varies by provider. Check with individual providers or contact our support team to confirm if your insurance is accepted. We\'re actively working to expand our insurance partnerships.'
    },
    {
      category: 'billing',
      question: 'What is your cancellation and refund policy?',
      answer: 'Patients can cancel appointments up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may incur a cancellation fee (typically 50% of consultation fee). Emergency circumstances are handled on a case-by-case basis. Contact support for assistance.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="public-page">
      <div className="public-container">
        {/* Header */}
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Frequently Asked Questions</h1>
          <p className="subtitle">
            Find answers to common questions about ClinRoute
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="faq-search"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          className="faq-categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="faq-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <p>No results found for "{searchTerm}"</p>
              <p className="secondary">Try different keywords or browse all categories</p>
            </div>
          )}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          className="faq-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Still have questions?</h3>
          <p>Our support team is here to help</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Contact Support</a>
            <a href="/help-center" className="btn-secondary">Visit Help Center</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQs;
