import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  MoreVertical,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from an API
  const stats = [
    { title: "Upcoming Appointments", value: "12", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Pending Reviews", value: "5", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Active Patients", value: "28", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Critical Cases", value: "3", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" }
  ];

  const recentPatients = [
    { id: 1, name: "Sarah Johnson", age: 34, symptoms: "Severe Migraine, Nausea", status: "Critical", time: "10:30 AM" },
    { id: 2, name: "Michael Chen", age: 45, symptoms: "Chest Pain (Mild)", status: "High Priority", time: "11:00 AM" },
    { id: 3, name: "Emma Wilson", age: 28, symptoms: "Annual Checkup", status: "Routine", time: "11:30 AM" },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto pb-12"
    >
      {/* Hero Welcome Section */}
      <motion.div 
        variants={item}
        className="relative overflow-hidden rounded-[2.5rem] bg-primary-600 text-white p-10 md:p-14 mb-10 shadow-2xl shadow-green-900/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-secondary text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Live Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              Good Morning, <br/>
              <span className="text-secondary">Dr. {user?.name?.split(' ')[1] || 'Smith'}</span>
            </h1>
            <p className="text-emerald-100/80 text-lg max-w-xl">
              You have <strong className="text-white">3 urgent cases</strong> requiring immediate attention today. Your schedule is clear until 10:30 AM.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => navigate('/doctor/queue')} className="px-6 py-3 bg-white text-primary-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
              View Queue <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/doctor/appointments')} className="px-6 py-3 bg-secondary text-primary-600 rounded-xl font-bold hover:bg-secondary-dark transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2">
              <Calendar size={18} /> Schedule
            </button>
          </div>
        </div>

        {/* Background Visuals */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.value > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1 font-serif">{stat.value}</h3>
            <p className="text-slate-500 font-medium text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Urgent Triage Queue */}
        <motion.div 
          variants={item}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm min-h-[400px]"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-3">
                <AlertCircle className="text-rose-500 fill-rose-100" />
                Urgent Triage
              </h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Patients requiring immediate review</p>
            </div>
            <button className="text-sm font-bold text-primary-600 hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="group flex items-center p-4 rounded-2xl border border-slate-100 hover:border-primary-600/20 hover:bg-slate-50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mr-4 group-hover:bg-indigo-200 transition-colors">
                  {patient.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-slate-800 truncate">{patient.name}</h4>
                    <span className="text-xs font-bold text-slate-400">{patient.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    {patient.symptoms}
                  </p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                  ${patient.status === 'Critical' ? 'bg-rose-100 text-rose-700 animate-pulse' : 
                    patient.status === 'High Priority' ? 'bg-orange-100 text-orange-700' : 
                    'bg-emerald-100 text-emerald-700'}`}
                >
                  {patient.status}
                </div>
                <ChevronRight className="ml-4 text-slate-300 group-hover:text-primary-600" size={20} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Summary */}
        <motion.div 
          variants={item}
          className="bg-primary-600 text-white rounded-[2.5rem] p-8 border border-white/10 shadow-xl shadow-green-900/10 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="text-secondary" />
              Performance
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-sm text-emerald-100 mb-1 font-medium">Avg. Wait Time</div>
                <div className="text-3xl font-bold font-serif">14 <span className="text-lg font-normal text-emerald-200">min</span></div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-sm text-emerald-100 mb-1 font-medium">Patients Seen</div>
                <div className="text-3xl font-bold font-serif">18 <span className="text-lg font-normal text-emerald-200">/ 24</span></div>
                <div className="mt-2 h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                   <div className="h-full w-[75%] bg-secondary rounded-full"></div>
                </div>
              </div>

               <div className="p-4 rounded-2xl bg-gradient-to-br from-[secondary] to-orange-500 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                   <Briefcase size={20} className="text-white/80" />
                   <div className="text-sm font-bold uppercase tracking-wide text-white/90">Next Shift</div>
                </div>
                <div className="text-xl font-bold font-serif">Tomorrow, 08:00 AM</div>
              </div>
            </div>
          </div>
          
          {/* Decorative rings */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border-8 border-white/5 rounded-full"></div>
          <div className="absolute top-20 -left-10 w-60 h-60 border-8 border-white/5 rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;
