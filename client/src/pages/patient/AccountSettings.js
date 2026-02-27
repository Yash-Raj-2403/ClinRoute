import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Lock, Shield, Mail, Phone, MapPin, Save, LogOut, Camera, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Personal Profile', icon: User, color: 'text-blue-600 bg-blue-50' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-amber-600 bg-amber-50' },
    { id: 'security', label: 'Security & Privacy', icon: Lock, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'insurance', label: 'Insurance Info', icon: Shield, color: 'text-purple-600 bg-purple-50' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen pb-20 px-6">
      <div className="mb-12">
         <h1 className="text-5xl font-serif font-bold text-[#0f4c3a] mb-4 tracking-tight">Settings</h1>
         <p className="text-slate-600 font-medium text-xl">Manage your account preferences and personal details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-6 shadow-nav border border-slate-100 flex flex-col gap-2">
              {menuItems.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => setActiveSection(item.id)}
                   className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold group ${
                      activeSection === item.id 
                      ? 'bg-[#0f4c3a] text-white shadow-lg transform scale-105' 
                      : 'text-slate-600 hover:bg-slate-50 hover:pl-6'
                   }`}
                 >
                    <div className="flex items-center gap-4">
                       <div className={`p-2 rounded-xl ${activeSection === item.id ? 'bg-white/20' : item.color}`}>
                          <item.icon size={20} />
                       </div>
                       {item.label}
                    </div>
                    {activeSection === item.id && <ChevronRight size={18} />}
                 </button>
              ))}
           </div>

           <button 
             onClick={handleLogout}
             className="w-full bg-red-50 text-red-600 font-bold p-6 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-red-100 transition-colors shadow-sm"
           >
             <LogOut size={22} />
             Sign Out
           </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
           <motion.div 
             key={activeSection}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ type: "spring", stiffness: 50 }}
             className="bg-white rounded-[3rem] border border-slate-100 shadow-nav p-10 md:p-14 min-h-[700px]"
           >
             {activeSection === 'profile' && (
               <div className="space-y-12">
                  <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                     <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-full bg-[#FFE4E6] flex items-center justify-center text-[#BE123C] font-serif font-bold text-5xl shadow-xl ring-8 ring-slate-50 group-hover:ring-[#0f4c3a]/10 transition-all">
                           {user?.name?.charAt(0) || 'P'}
                        </div>
                        <div className="absolute bottom-0 right-0 p-3 bg-[#0f4c3a] text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                           <Camera size={20} />
                        </div>
                     </div>
                     <div>
                        <h2 className="text-4xl font-serif font-bold text-[#0f4c3a] mb-2">{user?.name || 'Patient Name'}</h2>
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">Patient ID: #839210</span>
                           <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold">Active Member</span>
                        </div>
                     </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                     <div className="space-y-3">
                        <label className="text-sm font-bold uppercase text-slate-500 tracking-wider ml-1">Full Name</label>
                        <div className="relative group">
                           <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f4c3a] transition-colors" size={22} />
                           <input type="text" defaultValue={user?.name} className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#0f4c3a]/20 focus:ring-0 outline-none font-bold text-lg text-slate-800 transition-all" />
                        </div>
                     </div>
                     
                     <div className="space-y-3">
                        <label className="text-sm font-bold uppercase text-slate-500 tracking-wider ml-1">Email Address</label>
                        <div className="relative group">
                           <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f4c3a] transition-colors" size={22} />
                           <input type="email" defaultValue={user?.email} className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#0f4c3a]/20 focus:ring-0 outline-none font-bold text-lg text-slate-800 transition-all" />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-sm font-bold uppercase text-slate-500 tracking-wider ml-1">Phone Number</label>
                        <div className="relative group">
                           <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f4c3a] transition-colors" size={22} />
                           <input type="tel" placeholder="+1 (555) 000-0000" className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#0f4c3a]/20 focus:ring-0 outline-none font-bold text-lg text-slate-800 transition-all" />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-sm font-bold uppercase text-slate-500 tracking-wider ml-1">Location</label>
                        <div className="relative group">
                           <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f4c3a] transition-colors" size={22} />
                           <input type="text" placeholder="New York, NY" className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#0f4c3a]/20 focus:ring-0 outline-none font-bold text-lg text-slate-800 transition-all" />
                        </div>
                     </div>

                     <div className="md:col-span-2 pt-8 flex justify-end border-t border-slate-100">
                        <button className="px-10 py-5 bg-[#0f4c3a] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3">
                           <Save size={22} />
                           Save Changes
                        </button>
                     </div>
                  </form>
               </div>
             )}
             
             {/* Placeholders for other sections */}
             {activeSection !== 'profile' && (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center">
                   <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                      <Lock size={48} className="text-slate-300" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-700 mb-2">Section Under Construction</h3>
                   <p className="text-slate-500 font-medium text-lg">We are updating this part of the interface.</p>
                </div>
             )}
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
