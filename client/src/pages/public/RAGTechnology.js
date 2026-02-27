import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Database, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import '../public/PublicPages.css';

const RAGTechnology = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'Advanced Language Model',
      description: 'Powered by Llama 3.3 70B, one of the most sophisticated AI models for medical understanding'
    },
    {
      icon: <Database size={32} />,
      title: 'Medical Knowledge Base',
      description: 'Access to comprehensive medical databases and up-to-date clinical guidelines'
    },
    {
      icon: <Zap size={32} />,
      title: 'Real-Time Analysis',
      description: 'Instant symptom assessment and triage recommendations in seconds'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Continuous Learning',
      description: 'System improves over time by learning from validated medical outcomes'
    }
  ];

  const benefits = [
    'More accurate triage recommendations',
    'Reduced wait times for patients',
    'Better resource allocation for healthcare providers',
    'Improved patient outcomes through faster care',
    'Reduced burden on emergency departments',
    ' 24/7 availability for initial assessments'
  ];

  return (
    <div className="public-page">
      <div className="public-container">
        <motion.div
          className="public-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>RAG Technology</h1>
          <p className="subtitle">
            Retrieval-Augmented Generation: The AI powering intelligent healthcare triage
          </p>
        </motion.div>

        <motion.div className="hero-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Brain size={80} className="hero-icon" />
          <h2>Next-Generation AI for Healthcare</h2>
          <p>
            ClinRoute leverages cutting-edge RAG (Retrieval-Augmented Generation) technology to provide 
            intelligent medical triage and patient routing. Our AI system combines the reasoning capabilities 
            of large language models with real-time access to medical knowledge bases.
          </p>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2>What is RAG Technology?</h2>
          <p>
            Retrieval-Augmented Generation (RAG) is an advanced AI approach that enhances language models by 
            combining two key capabilities:
          </p>
          <div className="two-column-grid">
            <div className="info-card">
              <Database size={48} />
              <h3>Retrieval</h3>
              <p>
                The system retrieves relevant medical information from curated databases, including symptoms, 
                conditions, treatments, and clinical guidelines. This ensures recommendations are grounded in 
                established medical knowledge.
              </p>
            </div>
            <div className="info-card">
              <Brain size={48} />
              <h3>Generation</h3>
              <p>
                A powerful language model processes this retrieved information along with patient symptoms and 
                history to generate personalized, context-aware assessments and recommendations.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Patient Input</h3>
              <p>Patient describes symptoms, medical history, and current condition through our conversational interface</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Information Retrieval</h3>
              <p>AI retrieves relevant medical knowledge from our comprehensive database</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>AI Analysis</h3>
              <p>Llama 3.3 70B processes information and generates personalized assessment</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Recommendation</h3>
              <p>System provides urgency level, next steps, and provider recommendations</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2>Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2>Benefits of RAG-Powered Triage</h2>
          <div className="benefits-list">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
              >
                <CheckCircle size={24} className="check-icon" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="content-section security-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <Shield size={48} />
          <h2>Safety & Accuracy</h2>
          <p>
            While our RAG technology is highly sophisticated, it's designed to assist, not replace, 
            healthcare professionals. All AI recommendations are:
          </p>
          <ul className="safety-list">
            <li>Based on established medical guidelines and research</li>
            <li>Reviewed and validated by medical professionals</li>
            <li>Continuously monitored for accuracy</li>
            <li>Updated with the latest medical knowledge</li>
            <li>Compliant with HIPAA and healthcare regulations</li>
          </ul>
          <div className="disclaimer-box">
            <p><strong>Important:</strong> Our AI triage system provides assessments and recommendations, 
            not diagnoses. Always consult with a licensed healthcare provider for medical advice. 
            In emergencies, call 911 immediately.</p>
          </div>
        </motion.div>

        <motion.div className="cta-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <h2>Experience RAG-Powered Healthcare</h2>
          <p>Join thousands of patients and providers using AI-driven triage</p>
          <div className="cta-buttons">
            <a href="/register" className="btn-primary btn-large">Get Started Free</a>
            <a href="/about" className="btn-secondary btn-large">Learn More</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RAGTechnology;
