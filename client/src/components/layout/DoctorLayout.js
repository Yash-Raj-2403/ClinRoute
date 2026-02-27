import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  ChevronRight,
  Heart
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
    { path: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/doctor/queue', icon: Users, label: 'Patient Queue' },
    { path: '/doctor/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/doctor/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-gray-800 overflow-hidden font-sans selection:bg-secondary selection:text-primary-900">
      {/* Background Ambient Color Mesh - Consistent Brand Theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
         <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-secondary-light rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-accent-blue rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
      </div>

      {/* Sidebar - Glassmorphism */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 100,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="relative z-50 h-full bg-surface/80 backdrop-blur-xl border-r border-white/50 flex flex-col justify-between shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="flex flex-col h-full py-8 px-4">
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center mb-6">
              <div className="relative group cursor-pointer flex items-center gap-3" onClick={() => navigate('/')}>
                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-secondary shadow-xl shadow-primary-900/10 transform group-hover:scale-105 transition-transform">
                  <Heart size={24} className="fill-current" />
                </div>
                {isSidebarOpen && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                  >
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-primary-900">ClinRoute</h1>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Doctor Portal</span>
                  </motion.div>
                )}
              </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pt-6">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group mx-2
                    ${isActive 
                      ? 'bg-primary-600 text-white font-bold shadow-lg shadow-primary-900/10' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-medium'
                    }
                    ${!isSidebarOpen && 'justify-center px-0'}
                  `}
                >
                  <item.icon 
                    size={24} 
                    className={`transition-all duration-300 ${isActive ? 'text-secondary' : 'group-hover:scale-110 group-hover:text-primary-600'}`}
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
          <div className="pt-6 mt-auto border-t border-gray-100">
             {isSidebarOpen ? (
                <div className="bg-surface rounded-2xl p-4 flex items-center justify-between gap-3 border border-gray-100 shadow-sm group hover:border-primary-200 transition-colors cursor-pointer" onClick={() => navigate('/doctor/settings')}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 text-white flex items-center justify-center font-serif font-bold text-lg shadow-md border-2 border-white">
                      Dr
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate font-serif">Dr. {user?.name?.split(' ')[1] || 'Smith'}</p>
                      <p className="text-xs text-gray-400 truncate font-medium group-hover:text-primary-600 transition-colors">View Profile</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-primary-500" />
                </div>
             ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full flex justify-center p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={24} />
                </button>
             )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-transparent">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 pt-6 z-30">
           <div className="flex flex-col">
               <h2 className="text-3xl font-serif font-bold text-primary-900 leading-tight flex items-center gap-3 drop-shadow-sm">
                 {navItems.find(i => location.pathname.startsWith(i.path))?.label || 'Overview'}
               </h2>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-surface/80 backdrop-blur-md rounded-full px-5 py-3 border border-white/50 shadow-sm focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-600/10 transition-all w-80">
                 <Search size={20} className="text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search patients, cases..." 
                   className="flex-1 border-none focus:ring-0 text-sm font-medium placeholder:text-gray-400 bg-transparent ml-2 outline-none"
                 />
              </div>
              <button className="p-3 bg-surface/80 backdrop-blur-md border border-white/50 rounded-full text-gray-600 hover:text-primary-600 hover:bg-surface transition-all shadow-sm relative hover:scale-105 active:scale-95">
                 <Bell size={22} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent-rose rounded-full ring-2 ring-white animate-pulse"></span>
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
