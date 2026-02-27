import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, CheckCircle2, Activity, Shield, Clock, Smartphone, MessageSquare } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const specialties = [
    { name: 'Primary Care', icon: '🩺', color: 'bg-amber-100 text-amber-800' },
    { name: 'Cardiology', icon: '❤️', color: 'bg-rose-100 text-rose-800' },
    { name: 'Dermatology', icon: '✨', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Neurology', icon: '🧠', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Orthopedics', icon: '🦴', color: 'bg-orange-100 text-orange-800' },
    { name: 'Pediatrics', icon: '👶', color: 'bg-pink-100 text-pink-800' },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Describe Your Symptoms',
      description: 'Tell our RAG assistant about your symptoms, concerns, and medical history through our intelligent chat interface.',
      icon: '💬',
    },
    {
      step: 2,
      title: 'RAG Analyzes & Prioritizes',
      description: 'Our system uses medical knowledge bases to assess urgency and recommend the right care pathway.',
      icon: '🤖',
    },
    {
      step: 3,
      title: 'Connect with Specialists',
      description: 'Get matched with the right doctor based on your condition, location, and availability.',
      icon: '👨‍⚕️',
    },
  ];

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-primary-600" />,
      title: 'Instant Triage',
      description: 'Get AI-powered assessment in under 5 minutes',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary-600" />,
      title: 'Right Specialist Match',
      description: 'Connected to the perfect provider for your needs',
    },
    {
      icon: <Activity className="w-6 h-6 text-primary-600" />,
      title: 'Smart Prioritization',
      description: 'Urgent cases fast-tracked automatically',
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-600" />,
      title: 'HIPAA Compliant',
      description: 'Your health data is fully encrypted and secure',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary-600" />,
      title: 'Mobile Access',
      description: 'Triage and book appointments from anywhere',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary-600" />,
      title: '24/7 Support',
      description: 'Get help anytime, day or night',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-[120px] opacity-60 mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary-light rounded-full blur-[120px] opacity-60 mix-blend-multiply"></div>
        </div>

        <motion.div 
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
                AI-Powered Healthcare Routing
              </motion.div>
              
              <motion.h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight" variants={fadeInUp}>
                Smart healthcare routing<br />
                <span className="text-primary-600">powered by RAG</span>
              </motion.h1>
              
              <motion.p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10" variants={fadeInUp}>
                Skip the waiting room confusion. Our RAG-powered assistant instantly assesses your symptoms, 
                prioritizes your care needs, and connects you with the right specialist.
              </motion.p>
              
              {/* Search Box */}
              <motion.form 
                className="flex flex-col sm:flex-row items-center bg-surface rounded-3xl p-2 shadow-xl shadow-primary-900/5 border border-gray-100 focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-500/10 transition-all duration-300" 
                onSubmit={handleSearch} 
                variants={fadeInUp}
              >
                <div className="flex-1 w-full px-6 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Symptoms or Condition</label>
                  <input 
                    type="text" 
                    placeholder="e.g. chest pain, headache"
                    className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-base outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1 w-full px-6 py-3">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</label>
                  <input 
                    type="text" 
                    placeholder="City or ZIP code"
                    className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-base outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <motion.button 
                  type="submit" 
                  className="w-full sm:w-auto mt-2 sm:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search size={20} />
                  <span>Find care</span>
                </motion.button>
              </motion.form>
              
              <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p>Join <span className="font-bold text-gray-900">10,000+</span> patients finding better care</p>
              </motion.div>
            </div>

            {/* Hero Illustration */}
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-light rounded-[3rem] rotate-3 scale-105 opacity-50"></div>
                <div className="absolute inset-0 bg-surface rounded-[3rem] shadow-2xl border border-white/50 overflow-hidden flex items-center justify-center p-8">
                  <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Elements */}
                    <ellipse cx="400" cy="550" rx="350" ry="30" fill="#f0f0f0"/>
                    
                    {/* Clipboard - Left */}
                    <g transform="translate(50, 180)">
                      <rect x="0" y="20" width="80" height="100" rx="8" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="2"/>
                      <rect x="25" y="0" width="30" height="30" rx="4" fill="#d0d0d0"/>
                      <rect x="10" y="40" width="60" height="4" rx="2" fill="#c0c0c0"/>
                      <rect x="10" y="52" width="50" height="4" rx="2" fill="#c0c0c0"/>
                      <rect x="10" y="64" width="55" height="4" rx="2" fill="#c0c0c0"/>
                      <rect x="10" y="76" width="45" height="4" rx="2" fill="#c0c0c0"/>
                    </g>
                    
                    {/* Medical Cross - Top */}
                    <g transform="translate(300, 80)">
                      <circle cx="30" cy="30" r="28" fill="none" stroke="#f87171" strokeWidth="3"/>
                      <rect x="23" y="12" width="14" height="36" rx="2" fill="#f87171"/>
                      <rect x="12" y="23" width="36" height="14" rx="2" fill="#f87171"/>
                    </g>
                    
                    {/* Heart with Pulse - Top Right */}
                    <g transform="translate(480, 60)">
                      <path d="M40 25C40 15 32 8 22 8C12 8 4 18 4 28C4 50 40 70 40 70C40 70 76 50 76 28C76 18 68 8 58 8C48 8 40 15 40 25Z" fill="#fca5a5"/>
                      <path d="M15 35L25 35L30 25L35 45L40 35L50 35" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    </g>
                    
                    {/* Medicine Bottle - Right */}
                    <g transform="translate(680, 150)">
                      <rect x="10" y="0" width="40" height="15" rx="4" fill="#d0d0d0"/>
                      <rect x="5" y="15" width="50" height="80" rx="8" fill="#e8e8e8"/>
                      <rect x="15" y="45" width="30" height="3" rx="1" fill="#c0c0c0"/>
                      <rect x="15" y="55" width="25" height="3" rx="1" fill="#c0c0c0"/>
                    </g>
                    
                    {/* Thumbs Up - Left Top */}
                    <g transform="translate(30, 100)">
                      <path d="M30 5H40C45 5 50 10 50 15V45C50 50 45 55 40 55H20V30L30 5Z" fill="#e0e0e0"/>
                      <rect x="5" y="30" width="15" height="25" rx="3" fill="#d0d0d0"/>
                    </g>
                    
                    {/* Female Doctor - Left */}
                    <g transform="translate(180, 150)">
                      {/* Body */}
                      <path d="M60 180L55 350H45L50 230L35 230L40 350H30L35 180Z" fill="#f87171"/>
                      <path d="M30 180L75 180L80 250L25 250Z" fill="#f87171"/>
                      {/* Lab Coat */}
                      <path d="M20 180L85 180L90 320L15 320Z" fill="white" stroke="#e5e5e5" strokeWidth="2"/>
                      <path d="M35 180L35 320" stroke="#ef4444" strokeWidth="2"/>
                      {/* Head */}
                      <circle cx="52" cy="130" r="45" fill="#fcd5b8"/>
                      {/* Hair */}
                      <path d="M20 120C20 80 40 55 52 55C64 55 90 70 95 120C95 100 80 85 52 85C30 85 20 100 20 120Z" fill="#1f2937"/>
                      <path d="M15 130C10 150 15 180 25 200" stroke="#1f2937" strokeWidth="8" strokeLinecap="round"/>
                      <path d="M85 130C90 145 90 165 85 185" stroke="#1f2937" strokeWidth="8" strokeLinecap="round"/>
                      {/* Face */}
                      <ellipse cx="40" cy="125" rx="4" ry="5" fill="#1f2937"/>
                      <ellipse cx="65" cy="125" rx="4" ry="5" fill="#1f2937"/>
                      <path d="M45 148C48 152 56 152 60 148" stroke="#c9a090" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      {/* Arms */}
                      <path d="M20 190L5 230L15 280L25 275L18 235L30 200" fill="#fcd5b8"/>
                      <path d="M85 190L100 250" stroke="#fcd5b8" strokeWidth="20" strokeLinecap="round"/>
                      {/* Clipboard in hand */}
                      <rect x="90" y="230" width="35" height="50" rx="4" fill="#374151"/>
                    </g>
                    
                    {/* Male Doctor Center */}
                    <g transform="translate(340, 130)">
                      {/* Body */}
                      <path d="M40 200L100 200L105 370L35 370Z" fill="#f87171"/>
                      {/* Lab Coat */}
                      <path d="M30 200L110 200L120 370L20 370Z" fill="white" stroke="#e5e5e5" strokeWidth="2"/>
                      <line x1="70" y1="200" x2="70" y2="370" stroke="#e8e8e8" strokeWidth="1"/>
                      {/* Head */}
                      <circle cx="70" cy="140" r="50" fill="#d4a57b"/>
                      {/* Hair */}
                      <path d="M30 120C35 80 55 65 70 65C85 65 105 80 110 120C110 95 95 80 70 80C50 80 35 95 30 120Z" fill="#1f2937"/>
                      {/* Glasses */}
                      <circle cx="55" cy="135" r="15" fill="none" stroke="#374151" strokeWidth="2"/>
                      <circle cx="85" cy="135" r="15" fill="none" stroke="#374151" strokeWidth="2"/>
                      <path d="M70 135L70 135" stroke="#374151" strokeWidth="2"/>
                      <path d="M40 135L30 130" stroke="#374151" strokeWidth="2"/>
                      <path d="M100 135L110 130" stroke="#374151" strokeWidth="2"/>
                      {/* Eyes */}
                      <ellipse cx="55" cy="135" rx="3" ry="4" fill="#1f2937"/>
                      <ellipse cx="85" cy="135" rx="3" ry="4" fill="#1f2937"/>
                      {/* Smile */}
                      <path d="M60 160C65 167 75 167 80 160" stroke="#b8956e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      {/* Arms crossed */}
                      <path d="M30 210L20 270L50 290L70 260L90 290L120 270L110 210" fill="#d4a57b"/>
                      {/* Stethoscope */}
                      <path d="M55 200C55 220 50 250 70 250C90 250 85 220 85 200" stroke="#374151" strokeWidth="4" fill="none"/>
                      <circle cx="70" cy="255" r="8" fill="#374151"/>
                    </g>
                    
                    {/* Male Nurse - Right */}
                    <g transform="translate(530, 160)">
                      {/* Body - Scrubs */}
                      <path d="M40 170L100 170L110 350L30 350Z" fill="#f87171"/>
                      {/* V-neck */}
                      <path d="M55 170L70 200L85 170" stroke="#dc2626" strokeWidth="2" fill="#f87171"/>
                      {/* Head */}
                      <circle cx="70" cy="120" r="45" fill="#fcd5b8"/>
                      {/* Hair */}
                      <path d="M35 100C40 65 55 55 70 55C85 55 100 65 105 100C105 80 90 65 70 65C50 65 35 80 35 100Z" fill="#1f2937"/>
                      {/* Face */}
                      <ellipse cx="55" cy="115" rx="4" ry="5" fill="#1f2937"/>
                      <ellipse cx="85" cy="115" rx="4" ry="5" fill="#1f2937"/>
                      <path d="M60 140C65 145 75 145 80 140" stroke="#c9a090" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      {/* Arms */}
                      <path d="M30 180L15 240" stroke="#fcd5b8" strokeWidth="18" strokeLinecap="round"/>
                      <path d="M110 180L125 240" stroke="#fcd5b8" strokeWidth="18" strokeLinecap="round"/>
                      {/* Clipboard in hand */}
                      <rect x="110" y="220" width="35" height="50" rx="4" fill="#374151"/>
                      {/* Stethoscope */}
                      <path d="M60 170C55 190 60 210 70 210C80 210 85 190 80 170" stroke="#1f2937" strokeWidth="3" fill="none"/>
                      <circle cx="70" cy="215" r="6" fill="#374151"/>
                    </g>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Top Specialties */}
      <section className="py-20 bg-surface border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">RAG-Powered Triage for Any Specialty</h2>
            <p className="text-lg text-gray-600">Our system intelligently routes you to the right department based on your specific symptoms.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, index) => (
              <Link 
                to="/register" 
                key={index} 
                className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${specialty.color}`}
              >
                <div className="text-4xl mb-4 bg-white/50 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">{specialty.icon}</div>
                <span className="font-semibold text-sm text-center">{specialty.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Let's get you the right care, faster</h2>
            <p className="text-lg text-gray-600">Three simple steps to connect with the perfect healthcare provider.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 z-0"></div>

            {howItWorks.map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-surface rounded-full shadow-xl flex items-center justify-center text-4xl mb-8 border-4 border-white group-hover:scale-110 transition-transform duration-300 relative">
                  {item.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{item.description}</p>
                <button className="text-primary-600 font-semibold flex items-center gap-2 hover:text-primary-700 transition-colors group-hover:gap-3">
                  {index === 0 ? 'Start assessment' : index === 1 ? 'Learn about AI' : 'Find doctors'}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Healthcare Providers */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-primary-800/50 backdrop-blur-lg rounded-[3rem] p-8 md:p-16 border border-primary-700/50 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-video bg-primary-700/50 rounded-3xl overflow-hidden relative flex items-center justify-center border border-primary-600/50">
                  <div className="text-8xl">👩‍⚕️</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">✓</div>
                      <div>
                        <p className="font-semibold text-white">New Patient Match</p>
                        <p className="text-sm text-primary-200">High priority • Cardiology</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-800 text-primary-200 text-sm font-semibold tracking-wider uppercase mb-6 border border-primary-700">
                  For Private Practices
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
                  Optimize your patient flow with AI triage
                </h3>
                <ul className="space-y-4 mb-10">
                  {[
                    'Receive AI-triaged patient referrals',
                    'Reduce no-shows with smart scheduling',
                    'Access comprehensive patient summaries before visits'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                      <span className="text-primary-100 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/for-doctors" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 rounded-2xl font-bold hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl">
                  Learn more about practice solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Everything you need for smarter healthcare</h2>
            <p className="text-lg text-gray-600">Powerful features designed to simplify your healthcare journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-background p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600/5"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Ready to experience smarter healthcare?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover faster, more accurate healthcare routing with ClinRoute's 
            AI-powered platform. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-lg">
              Get started free
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors shadow-sm text-lg">
              Learn how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
