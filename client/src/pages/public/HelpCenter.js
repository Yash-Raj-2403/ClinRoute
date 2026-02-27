import React from 'react';
import { motion } from 'framer-motion';
import { Book, Video, FileText, MessageCircle, Headphones, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../public/PublicPages.css';

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: <Book size={32} />,
      title: 'Getting Started',
      description: 'Learn the basics of using ClinRoute',
      articles: [
        'How to create an account',
        'Setting up your profile',
        'Understanding AI triage',
        'Booking your first consultation'
      ],
      link: '#getting-started'
    },
    {
      icon: <MessageCircle size={32} />,
      title: 'Consultations',
      description: 'Everything about online consultations',
      articles: [
        'Preparing for your consultation',
        'Video consultation guide',
        'Rescheduling appointments',
        'Post-consultation care'
      ],
      link: '#consultations'
    },
    {
      icon: <FileText size={32} />,
      title: 'Medical Records',
      description: 'Managing your health information',
      articles: [
        'Accessing your records',
        'Uploading documents',
        'Sharing with providers',
        'Privacy and security'
      ],
      link: '#records'
    },
    {
      icon: <Video size={32} />,
      title: 'Technical Support',
      description: 'Troubleshooting and technical help',
      articles: [
        'Video not working',
        'Audio issues',
        'Browser requirements',
        'Mobile app guide'
      ],
      link: '#technical'
    }
  ];

  const quickLinks = [
    { icon: <Headphones size={20} />, label: 'Live Chat Support', path: '/contact' },
    { icon: <MessageCircle size={20} />, label: 'FAQs', path: '/faqs' },
    { icon: <FileText size={20} />, label: 'System Status', path: '/status' },
    { icon: <Book size={20} />, label: 'Documentation', path: '#docs' }
  ];

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
          <h1>Help Center</h1>
          <p className="subtitle">
            Find guides, tutorials, and answers to help you get the most out of ClinRoute
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="help-search"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Search size={24} />
          <input
            type="text"
            placeholder="Search for help articles, guides, or tutorials..."
          />
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="quick-links-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="quick-link-card">
              <div className="icon-wrapper">{link.icon}</div>
              <span>{link.label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Help Categories */}
        <motion.div
          className="help-categories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {helpCategories.map((category, index) => (
              <motion.a
                key={index}
                href={category.link}
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul className="article-list">
                  {category.articles.map((article, idx) => (
                    <li key={idx}>{article}</li>
                  ))}
                </ul>
                <span className="view-all">View all articles →</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          className="popular-articles"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2>Popular Articles</h2>
          <div className="articles-list">
            <a href="#" className="article-item">
              <FileText size={20} />
              <div>
                <h4>How to use the AI triage system effectively</h4>
                <p>Learn how to get the most accurate assessments from our AI assistant</p>
              </div>
            </a>
            <a href="#" className="article-item">
              <FileText size={20} />
              <div>
                <h4>Understanding your consultation results</h4>
                <p>A guide to interpreting your medical consultation reports</p>
              </div>
            </a>
            <a href="#" className="article-item">
              <FileText size={20} />
              <div>
                <h4>Setting up video consultations</h4>
                <p>Step-by-step guide to preparing for your first video call</p>
              </div>
            </a>
            <a href="#" className="article-item">
              <FileText size={20} />
              <div>
                <h4>Managing your medical records</h4>
                <p>How to upload, organize, and share your health documents</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="help-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3>Can't find what you're looking for?</h3>
          <p>Our support team is ready to assist you</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              <Headphones size={20} />
              Contact Support
            </Link>
            <Link to="/faqs" className="btn-secondary">
              Browse FAQs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
