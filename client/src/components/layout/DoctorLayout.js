import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  User, 
  LogOut, 
  Settings,
  Bell,
  Search,
  Heart,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

const DoctorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/doctor', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/doctor/queue', icon: Users, label: 'Patient Queue' },
    { path: '/doctor/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/doctor/profile', icon: User, label: 'My Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-slate-800 overflow-hidden font-sans selection:bg-[#FBBF24] selection:text-[#0f4c3a]">
      {/* Background Ambient Color Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-100 rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
         <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-amber-100 rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-indigo-100 rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 100,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="relative z-50 h-full bg-white/80 backdrop-blur-xl border-r border-white/50 flex flex-col justify-between shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="flex flex-col h-full py-8 px-4">
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center mb-6">
              <div className="relative group cursor-pointer flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f4c3a] flex items-center justify-center text-[#FBBF24] shadow-xl shadow-green-900/10 transform group-hover:scale-105 transition-transform">
                  <Heart size={24} className="fill-current" />
                </div>
                {isSidebarOpen && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                  >
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-[#0f4c3a]">ClinRoute</h1>
                    <span className="text-xs text-slate-400 font-medium">Doctor Portal</span>
                  </motion.div>
                )}
              </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pt-6">
            {navItems.map((item) => {
              const isActive = item.end 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group mx-2
                    ${isActive 
                      ? 'bg-[#0f4c3a] text-white font-bold shadow-lg shadow-green-900/10' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
                    }
                    ${!isSidebarOpen && 'justify-center px-0'}
                  `}
                >
                  <item.icon 
                    size={24} 
                    className={`transition-all duration-300 ${isActive ? 'text-[#FBBF24]' : 'group-hover:scale-110 group-hover:text-[#0f4c3a]'}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  
                  {isSidebarOpen && (
                    <span className="text-base truncate">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="pt-6 mt-auto border-t border-slate-100">
             {isSidebarOpen ? (
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between gap-3 border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors cursor-pointer" onClick={() => navigate('/doctor/settings')}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f4c3a] to-emerald-600 text-white flex items-center justify-center shadow-md">
                      <Stethoscope size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate font-serif">Dr. {user?.name || 'Doctor'}</p>
                      <p className="text-xs text-slate-400 truncate font-medium group-hover:text-emerald-600 transition-colors">Settings</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500" />
                </div>
             ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full flex justify-center p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={24} />
                </button>
             )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-transparent">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 pt-6 z-30">
           <div className="flex flex-col">
               <h2 className="text-3xl font-serif font-bold text-[#0f4c3a] leading-tight flex items-center gap-3 drop-shadow-sm">
                 {navItems.find(i => 
                    i.end ? location.pathname === i.path : location.pathname.startsWith(i.path)
                 )?.label || (location.pathname.includes('settings') ? 'Settings' : 'Dashboard')}
               </h2>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/80 backdrop-blur-md rounded-full px-5 py-3 border border-white/50 shadow-sm focus-within:border-[#0f4c3a] focus-within:ring-4 focus-within:ring-[#0f4c3a]/10 transition-all w-80">
                 <Search size={20} className="text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search patients..." 
                   className="flex-1 border-none focus:ring-0 text-sm font-medium placeholder:text-slate-400 bg-transparent ml-2"
                 />
              </div>
              <button className="p-3 bg-white/80 backdrop-blur-md border border-white/50 rounded-full text-slate-600 hover:text-[#0f4c3a] hover:bg-white transition-all shadow-sm relative hover:scale-105 active:scale-95">
                 <Bell size={22} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
              </button>
              <button 
                 onClick={() => navigate('/doctor/settings')}
                 className="p-3 bg-white/80 backdrop-blur-md border border-white/50 rounded-full text-slate-600 hover:text-[#0f4c3a] hover:bg-white transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                 <Settings size={22} />
              </button>
           </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto scroll-smooth p-6 md:p-8 md:pt-4">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
