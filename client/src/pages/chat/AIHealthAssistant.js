import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Activity, Mic, Paperclip, Image, Phone, Heart, FileText, X } from 'lucide-react';
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
      text: "Hello! I'm your ClinRoute Health Assistant. I can help assess symptoms, explain medical reports, or guide you to the right specialist. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [urgencyAssessment, setUrgencyAssessment] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
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
    setShowOptions(false);

    try {
      const allMessages = [...messages, userMessage];
      const aiResponse = await createChatCompletion(allMessages);
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        sender: 'assistant',
        text: aiResponse,
        timestamp: new Date()
      }]);

      if (messages.length >= 2) {
        const assessment = await assessUrgency(currentInput);
        if (assessment) setUrgencyAssessment(assessment);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        sender: 'assistant',
        text: "I'm having trouble connecting. Please try again or call emergency services if this is urgent.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: "Check Symptoms", icon: Activity, color: "bg-orange-100 text-orange-700 hover:bg-orange-200", prompt: "I want to check some symptoms I'm feeling." },
    { label: "Analyze Report", icon: FileText, color: "bg-blue-100 text-blue-700 hover:bg-blue-200", prompt: "Can you help me understand my medical report?" },
    { label: "Mental Health", icon: Heart, color: "bg-rose-100 text-rose-700 hover:bg-rose-200", prompt: "I'm feeling anxious and need someone to talk to." },
    { label: "Emergency", icon: AlertCircle, color: "bg-red-100 text-red-700 hover:bg-red-200", prompt: "This might be an emergency." }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 relative">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-6 border-b border-slate-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0f4c3a] to-teal-500 flex items-center justify-center text-white shadow-lg">
             <Activity size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-serif">Medical Assistant</h2>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Juno AI Online</span>
            </div>
          </div>
        </div>
        
        {urgencyAssessment && (
          <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 animate-pulse ${
             urgencyAssessment.level === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'
          }`}>
             <AlertCircle size={16} />
             {urgencyAssessment.level} Urgency
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10 relative">
        {messages.map((message) => (
          <motion.div 
            key={message.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[80%] p-5 rounded-3xl text-lg leading-relaxed shadow-sm
              ${message.sender === 'user' 
                ? 'bg-[#0f4c3a] text-white rounded-br-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-md'
              }
            `}>
              {message.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-3xl rounded-bl-none flex gap-2 items-center">
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Options */}
      <AnimatePresence>
        {showOptions && messages.length < 3 && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 20 }}
             className="p-4 bg-slate-50/50 backdrop-blur-sm border-t border-slate-100 z-10"
           >
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-2">Suggested Actions</div>
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                 {quickPrompts.map((p, i) => (
                    <button 
                      key={i}
                      onClick={() => setInputValue(p.prompt)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap transition-transform hover:scale-105 font-bold text-sm shadow-sm ${p.color}`}
                    >
                       <p.icon size={18} />
                       {p.label}
                    </button>
                 ))}
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 z-20 rounded-b-[2.5rem]">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
           <button type="button" className="p-3 text-slate-400 hover:text-[#0f4c3a] hover:bg-slate-50 rounded-full transition-colors">
              <Paperclip size={24} />
           </button>
           <input
             ref={inputRef}
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Type your symptoms or questions..."
             className="flex-1 bg-slate-50 border-transparent focus:bg-white focus:border-[#0f4c3a]/20 focus:ring-4 focus:ring-[#0f4c3a]/5 rounded-2xl py-4 px-6 text-lg font-medium transition-all"
           />
           <button 
             type="submit" 
             disabled={!inputValue.trim() || isTyping}
             className="p-4 bg-[#FBBF24] text-[#0f4c3a] rounded-2xl hover:bg-[#F59E0B] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
           >
             <Send size={24} />
           </button>
        </form>
      </div>
    </div>
  );
};

export default AIHealthAssistant;
