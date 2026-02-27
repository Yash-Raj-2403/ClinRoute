import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  Clock, 
  FileText, 
  MessageSquare, 
  ChevronRight,
  Star,
  Sun,
  ArrowRight,
  Heart,
  Shield,
  Zap,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const upcomingAppointments = []; 
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40 } }
  };

  const ActionCard = ({ icon: Icon, title, description, to, bgGradient, iconColor, btnColor }) => (
    <motion.div 
      variants={item}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 transition-all duration-300 border border-white/40 shadow-sm ${bgGradient}`}
    >
       <div className={`w-16 h-16 rounded-[2rem] bg-white flex items-center justify-center mb-6 shadow-md shadow-black/5 group-hover:scale-110 transition-transform duration-300 ${iconColor}`}>
          <Icon size={32} strokeWidth={2} />
       </div>
       <h3 className="text-2xl font-serif font-bold text-[#0f4c3a] mb-3">{title}</h3>
       <p className="text-slate-600 font-medium mb-8 leading-relaxed text-lg min-h-[3.5rem] relative z-10">{description}</p>
       
       <Link 
         to={to}
         className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg hover:scale-110 transition-all ${btnColor}`}
       >
         <ArrowRight size={24} />
       </Link>
       
       {/* Decorative Shapes */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/30 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto pb-12 px-6"
    >
      {/* Hero Welcome Section - Vibrant & Eye Catchy */}
      <motion.div 
        variants={item}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0f4c3a] via-[#13614d] to-[#0A3D30] text-white p-10 md:p-16 mb-12 shadow-2xl shadow-green-900/20"
      >
        {/* Abstract Background Art */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FBBF24] rounded-full mix-blend-overlay opacity-20 blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400 rounded-full mix-blend-overlay opacity-20 blur-[60px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#FBBF24] text-sm font-bold uppercase tracking-widest mb-8 border border-white/20"
            >
              <Sun size={16} className="fill-current animate-pulse-slow" />
              Good Morning
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8">
              Mental health <br/>
              <span className="text-[#FBBF24] italic font-light">is wealth.</span>
            </h1>
            <p className="text-emerald-50/90 text-xl font-medium max-w-lg leading-relaxed mb-10">
              Welcome back, <strong className="text-white border-b-2 border-[#FBBF24]">{user?.name?.split(' ')[0] || 'Friend'}</strong>. 
              We've organized everything for your well-being today.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <Link to="/patient/consultation/new" className="px-10 py-5 bg-[#FBBF24] text-[#0f4c3a] rounded-full font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all text-lg flex items-center gap-3">
                 <Activity size={20} />
                 Check Symptoms
               </Link>
               <Link to="/patient/consultations" className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
                 Book Visit
               </Link>
            </div>
          </div>
          
          {/* Glass Card Illustration */}
          <div className="hidden md:block relative h-full min-h-[300px]">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute right-0 top-1/2 -translate-y-1/2 w-80 bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl relative z-10"
             >
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#0f4c3a]">
                        <Heart size={20} className="fill-current" />
                      </div>
                      <span className="font-bold text-white">Daily Vitels</span>
                   </div>
                   <span className="text-emerald-200 font-serif">Today</span>
                </div>
                
                <div className="space-y-6">
                   <div className="p-4 bg-black/20 rounded-2xl flex items-center gap-4">
                      <div className="text-3xl">❤️</div>
                      <div>
                         <div className="text-xs text-white/60 uppercase font-bold tracking-wider">Heart Rate</div>
                         <div className="text-xl font-bold text-white">72 <span className="text-sm font-normal text-white/60">bpm</span></div>
                      </div>
                   </div>
                   <div className="p-4 bg-black/20 rounded-2xl flex items-center gap-4">
                      <div className="text-3xl">😴</div>
                      <div>
                         <div className="text-xs text-white/60 uppercase font-bold tracking-wider">Sleep</div>
                         <div className="text-xl font-bold text-white">7h 30m</div>
                      </div>
                   </div>
                </div>
             </motion.div>
             
             {/* Abstract floating circles */}
             <div className="absolute top-0 right-10 w-20 h-20 bg-[#FBBF24] rounded-full blur-xl opacity-40"></div>
             <div className="absolute bottom-0 right-60 w-32 h-32 bg-teal-400 rounded-full blur-2xl opacity-30"></div>
          </div>
        </div>
      </motion.div>

      {/* Action Grid - Colorful & Engaging */}
      <h3 className="text-2xl font-serif font-bold text-[#0f4c3a] mb-8 flex items-center gap-3">
        <Zap className="fill-[#FBBF24] text-[#FBBF24]" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <ActionCard 
            title="Chat Assistance" 
            description="Talk to our AI for instant medical guidance." 
            icon={MessageSquare} 
            to="/patient/consultations" 
            bgGradient="bg-gradient-to-br from-indigo-50 to-purple-50"
            iconColor="text-indigo-600"
            btnColor="bg-indigo-600 hover:bg-indigo-700"
         />
         <ActionCard 
            title="Symptom Check" 
            description="Identify conditions with AI triage." 
            icon={Activity} 
            to="/patient/consultation/new" 
            bgGradient="bg-gradient-to-br from-orange-50 to-amber-50"
            iconColor="text-orange-600"
            btnColor="bg-orange-600 hover:bg-orange-700"
         />
         <ActionCard 
            title="Nearby Doctors" 
            description="Find and book specialists near you." 
            icon={MapPin} 
            to="/patient/doctors-nearby" 
            bgGradient="bg-gradient-to-br from-emerald-50 to-teal-50"
            iconColor="text-emerald-600"
            btnColor="bg-emerald-600 hover:bg-emerald-700"
         />
         <ActionCard 
            title="My Records" 
            description="Lab results, prescriptions & history." 
            icon={FileText} 
            to="/patient/reports" 
            bgGradient="bg-gradient-to-br from-blue-50 to-sky-50"
            iconColor="text-blue-600"
            btnColor="bg-blue-600 hover:bg-blue-700"
         />
      </div>
    </motion.div>
  );
};

export default Dashboard;
