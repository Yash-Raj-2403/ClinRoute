import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Calendar, Filter, ChevronRight, Clock, Shield, Stethoscope, Heart, Brain, Baby, Activity } from 'lucide-react';

const NearbyDoctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]); // Fetched from Supabase

  // Soft color palette for categories
  const specialties = [
    { id: 'all', label: 'All Specialists', color: 'bg-slate-100 text-slate-700', icon: Activity },
    { id: 'general', label: 'General Physician', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100', icon: Stethoscope },
    { id: 'cardiology', label: 'Cardiology', color: 'bg-rose-50 text-rose-700 hover:bg-rose-100', icon: Heart },
    { id: 'dermatology', label: 'Dermatology', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100', icon: Shield },
    { id: 'pediatrics', label: 'Pediatrics', color: 'bg-teal-50 text-teal-700 hover:bg-teal-100', icon: Baby },
    { id: 'neurology', label: 'Neurology', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100', icon: Brain }
  ];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
       <div className="relative mb-8 group cursor-pointer">
          <div className="w-40 h-40 bg-amber-50 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
             <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center animate-pulse">
                <MapPin size={48} className="text-amber-600" />
             </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="absolute top-0 right-0 bg-white p-4 rounded-2xl shadow-lg border border-slate-100"
          >
             <Search size={24} className="text-primary-600" />
          </motion.div>
       </div>
       
       <h3 className="text-3xl font-serif font-bold text-primary-600 mb-4">Find your specialist</h3>
       <p className="text-slate-600 font-medium max-w-md mx-auto mb-10 text-lg leading-relaxed">
         Search for top-rated doctors in your area. Filter by specialty, availability, and insurance.
       </p>
       
       <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 text-lg">
         <Filter size={20} />
         Adjust Filters
       </button>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen pb-12 px-6">
      {/* Header Section */}
      <div className="mb-12">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-emerald-100"
              >
                  <Shield size={14} className="fill-current" />
                  Verified Specialists
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-600 tracking-tight mb-6">Find a Doctor</h1>
              <p className="text-slate-600 text-xl font-medium max-w-2xl leading-relaxed">
                Connect with world-class healthcare providers near you. Read reviews, check availability, and book instantly.
              </p>
            </div>
         </div>

         {/* Search & Filter Bar */}
         <div className="bg-white p-4 rounded-[2.5rem] shadow-nav border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full group">
               <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Search by doctor name, condition, or hospital..." 
                 className="w-full pl-16 pr-8 py-5 bg-slate-50 border-transparent rounded-[2rem] focus:bg-white focus:ring-2 focus:ring-[primary-600]/20 text-slate-800 placeholder:text-slate-400 text-lg font-semibold transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>
         
         {/* Categories */}
         <div className="flex gap-4 overflow-x-auto py-8 custom-scrollbar">
            {specialties.map(spec => (
              <button 
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`px-8 py-4 rounded-full whitespace-nowrap text-lg font-bold transition-all flex items-center gap-3 border-2 ${
                  selectedSpecialty === spec.id 
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg transform -translate-y-1' 
                  : `${spec.color} border-transparent hover:border-current/20`
                }`}
              >
                {spec.icon && <spec.icon size={20} className={selectedSpecialty === spec.id ? 'text-white' : ''} />}
                {spec.label}
              </button>
            ))}
         </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {doctors.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
             {/* Map over doctors */}
          </motion.div>
        ) : (
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="bg-white rounded-[3rem] border border-slate-100 min-h-[500px] flex items-center justify-center shadow-sm"
          >
             <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NearbyDoctors;
