import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, Calendar, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultationStatus = () => {
    // Empty state driven - Supabase fetch hook would go here
    const activeConsultation = null;

    return (
        <div className="max-w-[1000px] mx-auto py-16 px-6">
            <div className="text-center mb-16">
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 text-amber-700 rounded-full text-base font-bold uppercase tracking-wider mb-8 border border-amber-100"
               >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  Live Status
               </motion.div>
               <h1 className="text-5xl font-serif font-bold text-primary-600 mb-6">Consultation Tracker</h1>
               <p className="text-slate-600 font-medium text-xl">Real-time updates on your medical requests and appointments.</p>
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white rounded-[3.5rem] border border-slate-100 shadow-nav p-16 min-h-[500px] flex items-center justify-center text-center relative overflow-hidden"
            >
               {/* Background decoration */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400" />

               {activeConsultation ? (
                  <div>{/* Active status logic */}</div>
               ) : (
                  <div className="z-10 relative">
                     <div className="relative inline-block mb-10 group">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center relative z-10">
                           <Clock size={64} className="text-blue-500" strokeWidth={1.5} />
                        </div>
                     </div>
                     <h3 className="text-3xl font-bold text-slate-800 mb-4">No Active Consultations</h3>
                     <p className="text-slate-500 font-medium text-lg mb-12 max-w-md mx-auto leading-relaxed">
                        You don't have any ongoing consultations or triage requests at the moment. Need medical advice?
                     </p>
                     
                     <Link 
                       to="/patient/consultation/new" 
                       className="inline-flex px-10 py-5 bg-primary-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all items-center gap-3 text-lg"
                     >
                        <PlusCircle size={24} />
                        Start New Request
                     </Link>
                  </div>
               )}
            </motion.div>
        </div>
    );
};

export default ConsultationStatus;
