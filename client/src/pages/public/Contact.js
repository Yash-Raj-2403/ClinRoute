import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import '../public/PublicPages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    }, 1500);
  };

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
          <h1>Contact Us</h1>
          <p className="subtitle">
            Have questions? We're here to help. Get in touch with our team.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Information */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="info-card">
              <div className="icon-wrapper">
                <Mail size={24} />
              </div>
              <h3>Email Us</h3>
              <p>support@clinroute.com</p>
              <p className="secondary">sales@clinroute.com</p>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <Phone size={24} />
              </div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
              <p className="secondary">Mon-Fri, 9AM-6PM EST</p>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <MapPin size={24} />
              </div>
              <h3>Visit Us</h3>
              <p>123 Healthcare Plaza</p>
              <p className="secondary">San Francisco, CA 94102</p>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <Clock size={24} />
              </div>
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="secondary">Weekend: Emergency support only</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <div className="success-message">
                <MessageSquare size={48} />
                <h3>Thank you for contacting us!</h3>
                <p>We've received your message and will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Inquiry Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="media">Media/Press</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
