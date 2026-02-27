import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, ChevronRight, User, Filter, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Consultations = () => {
    // Requirements: No dummy data. Driven by empty states for now.
    const consultations = [];

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

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <motion.div 
               className="relative mb-12 group"
               whileHover={{ scale: 1.05 }}
            >
                <div className="w-40 h-40 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center shadow-sm transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <MessageSquare className="text-indigo-500" size={56} strokeWidth={1.5} />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce-slow">
                   <Sparkles className="text-amber-400 fill-current" size={24} />
                </div>
            </motion.div>
            
            <h3 className="text-4xl font-serif font-bold text-[#0f4c3a] mb-6">Start your journey</h3>
            <p className="text-slate-600 max-w-lg mb-12 text-xl font-medium leading-relaxed">
                Connect with our AI assistant or a specialist to begin your health consultation. It's safe, secure, and fast.
            </p>
            
            <Link 
                to="/patient/consultation/new" 
                className="group px-10 py-5 bg-[#0f4c3a] text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
            >
                Start New Consultation
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
        </div>
    );

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1600px] mx-auto min-h-screen px-6 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                   <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-indigo-100"
                   >
                      <Calendar size={14} className="fill-current" />
                      History & Active
                   </motion.div>
                   <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0f4c3a] tracking-tight">Your Consultations</h1>
                </div>
                
                <div className="flex items-center gap-4">
                    <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm text-lg">
                        <Filter size={20} />
                        Filter
                    </button>
                    <Link 
                        to="/patient/consultation/new" 
                        className="px-8 py-4 bg-[#FBBF24] text-[#0f4c3a] rounded-full font-bold hover:bg-[#F59E0B] hover:shadow-lg transition-all shadow-sm text-lg flex items-center gap-2"
                    >
                        <MessageSquare size={20} />
                        New Request
                    </Link>
                </div>
            </div>

            <motion.div 
                variants={item}
                className="bg-white rounded-[3rem] border border-slate-100 shadow-nav min-h-[600px] p-4 flex flex-col"
            >
                {consultations.length > 0 ? (
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {/* Consultation Cards would map here */}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <EmptyState />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Consultations;
