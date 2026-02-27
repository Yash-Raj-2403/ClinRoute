import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Share2, Filter, Search, FileHeart, FilePlus } from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('all');
  const reports = []; // Fetched via Supabase

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
       <motion.div 
         className="w-40 h-40 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-sm"
         animate={{ rotate: [0, 5, 0] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
       >
          <FileHeart size={64} className="text-rose-500" strokeWidth={1.5} />
       </motion.div>
       
       <h3 className="text-4xl font-serif font-bold text-primary-600 mb-6">No Records Found</h3>
       <p className="text-slate-600 font-medium max-w-lg mx-auto mb-12 text-xl leading-relaxed">
         Your medical reports, lab results, and prescriptions will be safely stored here.
       </p>
       
       <button className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm text-lg flex items-center gap-3">
         <FilePlus size={24} className="text-primary-600" />
         Upload External Report
       </button>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen pb-12 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
         <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-600 mb-6 tracking-tight">Medical Records</h1>
            <p className="text-slate-600 font-medium text-xl">Securely access and manage your complete health history.</p>
         </div>

         <div className="flex gap-4">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
               <input 
                 type="text" 
                 placeholder="Search records..." 
                 className="pl-14 pr-8 py-4 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[primary-600]/20 w-80 shadow-sm transition-all text-lg font-medium" 
               />
            </div>
            <button className="p-4 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
               <Filter size={24} />
            </button>
         </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-nav min-h-[700px] overflow-hidden flex flex-col">
         {/* Tabs */}
         <div className="border-b border-slate-100 px-10 pt-10 flex gap-10 overflow-x-auto">
            {['All Records', 'Lab Results', 'Prescriptions', 'Imaging'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab.toLowerCase())}
                 className={`pb-5 px-4 text-base font-bold uppercase tracking-wider border-b-4 transition-all ${
                    activeTab === tab.toLowerCase() || (activeTab === 'all' && tab === 'All Records')
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                 }`}
               >
                 {tab}
               </button>
            ))}
         </div>

         <div className="p-10 flex-1 relative">
            <AnimatePresence mode="wait">
               {reports.length > 0 ? (
                  <div className="grid gap-6">
                     {/* Report Items */}
                  </div>
               ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex items-center justify-center"
                  >
                     <EmptyState />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

export default Reports;
