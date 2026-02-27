import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createChatCompletion, assessUrgency } from '../../lib/groq';
import './AIHealthAssistant.css';

const AIHealthAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      sender: 'assistant',
      text: "Hello! I'm ClinRoute RAG Assistant, your medical triage helper. I'm powered by advanced retrieval-augmented generation to help assess your symptoms and guide you to the right care. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [urgencyAssessment, setUrgencyAssessment] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      // Get AI response using Groq
      const allMessages = [...messages, userMessage];
      const aiResponse = await createChatCompletion(allMessages);
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        sender: 'assistant',
        text: aiResponse,
        timestamp: new Date()
      }]);

      // Assess urgency for triage
      if (messages.length >= 3) {
        const assessment = await assessUrgency(currentInput);
        if (assessment) {
          setUrgencyAssessment(assessment);
        }
      }
    } catch (err) {
      console.error('Chat Error:', err);
      setError('Failed to get response. Please try again.');
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        sender: 'assistant',
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or if you're experiencing a medical emergency, please call emergency services immediately.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    "I have a severe headache",
    "I'm experiencing chest pain",
    "I have a persistent cough",
    "I feel nauseous and dizzy"
  ];

  const handleQuickPrompt = (prompt) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="ai-health-assistant">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#319795"/>
                <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h2>ClinRoute RAG Assistant <span className="ai-badge">Powered by Llama 3.3</span></h2>
              <span className="status-online">● Online</span>
            </div>
          </div>
          <div className="chat-header-actions">
            {urgencyAssessment && (
              <span className={`urgency-badge ${urgencyAssessment.level}`}>
                {urgencyAssessment.level}
              </span>
            )}
            <span className="user-greeting">Hello, {user?.firstName || 'User'}</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="chat-messages">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div 
                key={message.id} 
                className={`message ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layout
              >
              {message.type === 'bot' && (
                <div className="message-avatar">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#319795"/>
                    <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white"/>
                  </svg>
                </div>
              )}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
          
          {isTyping && (
            <div className="message message-bot">
              <div className="message-avatar">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#319795"/>
                  <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white"/>
                </svg>
              </div>
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="chat-error">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="quick-prompts">
            <p>Quick start:</p>
            <div className="quick-prompts-grid">
              {quickPrompts.map((prompt, index) => (
                <button 
                  key={index}
                  className="quick-prompt-btn"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your symptoms..."
            className="chat-input"
          />
          <button 
            type="submit" 
            className="chat-send-btn"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </form>

        {/* Disclaimer */}
        <div className="chat-disclaimer">
          <p>⚠️ This RAG assistant provides general health guidance only. For emergencies, call your local emergency services. Always consult a healthcare professional for medical advice.</p>
        </div>
      </div>
    </div>
  );
};

export default AIHealthAssistant;
