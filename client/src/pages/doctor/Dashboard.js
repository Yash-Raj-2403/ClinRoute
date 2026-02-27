import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Stethoscope,
  Sun,
  Activity,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingCases: 0,
    completedToday: 0,
    totalPatientsThisWeek: 0
  });
  const [urgentCases, setUrgentCases] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const { data: statsData, error: statsError } = await supabase
        .rpc('get_doctor_stats', { doc_id: user.id });
      
      if (!statsError && statsData) {
        setStats(statsData);
      }

      const { data: queueData, error: queueError } = await supabase
        .rpc('get_doctor_patient_queue', { doc_id: user.id });
      
      if (!queueError && queueData) {
        const urgent = queueData
          .filter(c => c.triage_priority === 'critical' || c.triage_priority === 'urgent')
          .slice(0, 3);
        setUrgentCases(urgent);
      }

      const { data: appointmentsData, error: appointmentsError } = await supabase
        .rpc('get_doctor_upcoming_appointments', { doc_id: user.id, days_ahead: 1 });
      
      if (!appointmentsError && appointmentsData) {
        const today = new Date().toDateString();
        const todayAppts = appointmentsData
          .filter(a => new Date(a.date_time).toDateString() === today)
          .map(a => ({
            ...a,
            time: new Date(a.date_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            status: a.status === 'completed' ? 'completed' : 
                    new Date(a.date_time) <= new Date() ? 'current' : 'upcoming'
          }));
        setTodaySchedule(todayAppts);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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
       
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/30 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );

  const StatCard = ({ icon: Icon, value, label, color, bgColor }) => (
    <motion.div 
      variants={item}
      whileHover={{ y: -3 }}
      className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center`}>
          <Icon size={28} className={color} />
        </div>
        <div>
          <p className="text-3xl font-bold text-[#0f4c3a] font-serif">{value}</p>
          <p className="text-slate-500 font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0f4c3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto pb-12 px-6"
    >
      {/* Hero Welcome Section */}
      <motion.div 
        variants={item}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0f4c3a] via-[#13614d] to-[#0A3D30] text-white p-10 md:p-16 mb-12 shadow-2xl shadow-green-900/20"
      >
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
              <Sun size={16} className="fill-current animate-pulse" />
              Good Morning
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8">
              Ready to <br/>
              <span className="text-[#FBBF24] italic font-light">heal today.</span>
            </h1>
            <p className="text-emerald-50/90 text-xl font-medium max-w-lg leading-relaxed mb-10">
              Welcome back, <strong className="text-white border-b-2 border-[#FBBF24]">Dr. {user?.name || 'Doctor'}</strong>. 
              You have {urgentCases.length > 0 ? `${urgentCases.length} urgent cases` : 'no urgent cases'} requiring attention.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <Link to="/doctor/queue" className="px-10 py-5 bg-[#FBBF24] text-[#0f4c3a] rounded-full font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all text-lg flex items-center gap-3">
                 <Users size={20} />
                 View Patient Queue
               </Link>
               <Link to="/doctor/appointments" className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
                 View Schedule
               </Link>
            </div>
          </div>
          
          <div className="hidden md:block relative h-full min-h-[300px]">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute right-0 top-1/2 -translate-y-1/2 w-80 bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl relative z-10"
             >
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#0f4c3a]">
                        <Stethoscope size={20} />
                      </div>
                      <span className="font-bold text-white">Today's Stats</span>
                   </div>
                   <span className="text-emerald-200 font-serif">Live</span>
                </div>
                
                <div className="space-y-6">
                   <div className="p-4 bg-black/20 rounded-2xl flex items-center gap-4">
                      <div className="text-3xl">📋</div>
                      <div>
                         <div className="text-xs text-white/60 uppercase font-bold tracking-wider">Pending</div>
                         <div className="text-xl font-bold text-white">{stats.pendingCases} <span className="text-sm font-normal text-white/60">cases</span></div>
                      </div>
                   </div>
                   <div className="p-4 bg-black/20 rounded-2xl flex items-center gap-4">
                      <div className="text-3xl">✅</div>
                      <div>
                         <div className="text-xs text-white/60 uppercase font-bold tracking-wider">Completed</div>
                         <div className="text-xl font-bold text-white">{stats.completedToday} <span className="text-sm font-normal text-white/60">today</span></div>
                      </div>
                   </div>
                </div>
             </motion.div>
             
             <div className="absolute top-0 right-10 w-20 h-20 bg-[#FBBF24] rounded-full blur-xl opacity-40"></div>
             <div className="absolute bottom-0 right-60 w-32 h-32 bg-teal-400 rounded-full blur-2xl opacity-30"></div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={Clock} 
          value={stats.pendingCases} 
          label="Pending Cases" 
          color="text-amber-600" 
          bgColor="bg-amber-100" 
        />
        <StatCard 
          icon={CheckCircle2} 
          value={stats.completedToday} 
          label="Completed Today" 
          color="text-emerald-600" 
          bgColor="bg-emerald-100" 
        />
        <StatCard 
          icon={AlertTriangle} 
          value={urgentCases.length} 
          label="Urgent Cases" 
          color="text-rose-600" 
          bgColor="bg-rose-100" 
        />
        <StatCard 
          icon={Calendar} 
          value={stats.todayAppointments} 
          label="Today's Appointments" 
          color="text-blue-600" 
          bgColor="bg-blue-100" 
        />
      </div>

      {/* Urgent Cases Section */}
      {urgentCases.length > 0 && (
        <motion.div variants={item} className="mb-12">
          <h3 className="text-2xl font-serif font-bold text-[#0f4c3a] mb-6 flex items-center gap-3">
            <AlertTriangle className="text-rose-500" />
            Urgent Cases Requiring Attention
          </h3>
          <div className="grid gap-4">
            {urgentCases.map((caseItem) => (
              <motion.div 
                key={caseItem.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-rose-100 shadow-sm hover:shadow-lg transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
                    caseItem.triage_priority === 'critical' 
                      ? 'bg-rose-100 text-rose-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {caseItem.triage_priority}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f4c3a]">{caseItem.patient_name}, {caseItem.patient_age}y</h4>
                    <p className="text-slate-500 text-sm">{caseItem.symptoms?.primary || 'No symptoms listed'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-sm">⏳ {Math.round(caseItem.wait_time_minutes)} min wait</span>
                  <Link 
                    to={`/doctor/cases/${caseItem.id}`}
                    className="px-6 py-3 bg-[#0f4c3a] text-white rounded-full font-bold hover:bg-[#0A3D30] transition-all flex items-center gap-2"
                  >
                    Review <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <h3 className="text-2xl font-serif font-bold text-[#0f4c3a] mb-8 flex items-center gap-3">
        <Activity className="fill-[#FBBF24] text-[#FBBF24]" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <ActionCard 
            title="Patient Queue" 
            description="Review and manage incoming patient cases." 
            icon={Users} 
            to="/doctor/queue" 
            bgGradient="bg-gradient-to-br from-indigo-50 to-purple-50"
            iconColor="text-indigo-600"
            btnColor="bg-indigo-600 hover:bg-indigo-700"
         />
         <ActionCard 
            title="Appointments" 
            description="View and manage your schedule." 
            icon={Calendar} 
            to="/doctor/appointments" 
            bgGradient="bg-gradient-to-br from-orange-50 to-amber-50"
            iconColor="text-orange-600"
            btnColor="bg-orange-600 hover:bg-orange-700"
         />
         <ActionCard 
            title="My Profile" 
            description="Update your professional information." 
            icon={Stethoscope} 
            to="/doctor/profile" 
            bgGradient="bg-gradient-to-br from-emerald-50 to-teal-50"
            iconColor="text-emerald-600"
            btnColor="bg-emerald-600 hover:bg-emerald-700"
         />
         <ActionCard 
            title="Analytics" 
            description="View performance insights and stats." 
            icon={TrendingUp} 
            to="/doctor/settings" 
            bgGradient="bg-gradient-to-br from-blue-50 to-sky-50"
            iconColor="text-blue-600"
            btnColor="bg-blue-600 hover:bg-blue-700"
         />
      </div>
    </motion.div>
  );
};

export default Dashboard;
