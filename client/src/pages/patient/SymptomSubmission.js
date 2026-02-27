import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Thermometer,
  Zap,
  Coffee,
  Frown,
  Bone
} from 'lucide-react';

const SymptomSubmission = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [formData, setFormData] = useState({
    symptoms: [],
    severity: 5,
    duration: '',
    description: '',
    history: ''
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  // Replaced Emojis with Lucide Icons
  const commonSymptoms = [
    { id: 'headache', label: 'Headache', icon: Zap, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { id: 'fever', label: 'Fever', icon: Thermometer, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { id: 'cough', label: 'Cough', icon: Frown, color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { id: 'fatigue', label: 'Fatigue', icon: Coffee, color: 'text-stone-500 bg-stone-50 border-stone-100' },
    { id: 'nausea', label: 'Nausea', icon: Frown, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { id: 'pain', label: 'Body Pain', icon: Bone, color: 'text-purple-500 bg-purple-50 border-purple-100' },
  ];

  const renderStep1 = () => (
    <div className="space-y-10">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-serif font-bold text-[#0f4c3a] mb-4">How are you feeling?</h3>
        <p className="text-slate-600 text-xl font-medium">Select the symptoms that best describe your condition.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {commonSymptoms.map((symptom) => {
          const Icon = symptom.icon;
          const isSelected = formData.symptoms.includes(symptom.id);
          
          return (
            <button
              key={symptom.id}
              className={`p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-4 group hover:shadow-lg hover:-translate-y-1 ${
                 isSelected
                 ? 'border-[#0f4c3a] bg-[#0f4c3a] text-white'
                 : `bg-white hover:border-current ${symptom.color}`
              }`}
              onClick={() => {
                 const newSymptoms = isSelected
                   ? formData.symptoms.filter(id => id !== symptom.id)
                   : [...formData.symptoms, symptom.id];
                 setFormData({ ...formData, symptoms: newSymptoms });
              }}
            >
               <div className={`p-4 rounded-full ${isSelected ? 'bg-white/20' : 'bg-white'} transition-colors`}>
                  <Icon size={32} strokeWidth={2.5} />
               </div>
               <span className="font-bold text-lg">{symptom.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-10">
         <label className="block text-lg font-bold text-slate-700 mb-4 ml-2">Other Symptoms?</label>
         <input 
           type="text" 
           placeholder="e.g. Dizziness, Sore throat..." 
           className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-[#0f4c3a] focus:bg-white focus:border-transparent outline-none transition-all text-lg font-medium text-slate-800"
         />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-10">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-serif font-bold text-[#0f4c3a] mb-4">Tell us more</h3>
        <p className="text-slate-600 text-xl font-medium">Help us understand the severity and duration.</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
         <div>
            <div className="flex justify-between mb-6">
              <label className="font-bold text-slate-800 text-xl">Severity Scale</label>
              <span className={`px-4 py-2 rounded-xl font-bold text-lg ${
                 formData.severity < 4 ? 'bg-green-100 text-green-700' :
                 formData.severity < 8 ? 'bg-yellow-100 text-yellow-700' :
                 'bg-red-100 text-red-700'
              }`}>
                 {formData.severity} / 10
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: parseInt(e.target.value)})}
              className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#0f4c3a]"
            />
            <div className="flex justify-between text-sm font-bold text-slate-400 mt-4 uppercase tracking-wide">
              <span>Mild Discomfort</span>
              <span>Severe Pain</span>
            </div>
         </div>

         <div>
            <label className="block font-bold text-slate-800 text-xl mb-6">Detailed Description</label>
            <textarea 
              className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-[#0f4c3a] focus:bg-white outline-none resize-none transition-all placeholder:text-slate-400 text-lg font-medium leading-relaxed"
              placeholder="Please describe exactly what you're feeling, when it started, and any pattern you've noticed..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
         </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 text-center flex flex-col items-center justify-center py-12">
       <motion.div 
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center mb-8 text-emerald-600 shadow-lg"
       >
         <CheckCircle2 size={56} strokeWidth={2} />
       </motion.div>
       
       <div>
         <h3 className="text-4xl font-serif font-bold text-[#0f4c3a] mb-6">Ready to Submit?</h3>
         <p className="text-slate-600 font-medium max-w-lg mx-auto mb-10 text-xl leading-relaxed">
           Our AI will analyze your symptoms and recommend the best specialist for your case immediately.
         </p>
       </div>
       
       <div className="bg-amber-50 p-8 rounded-[2rem] max-w-2xl w-full text-left border border-amber-100 flex gap-5">
          <AlertCircle className="text-amber-600 shrink-0 mt-1" size={28} />
          <div>
            <h4 className="font-bold text-amber-800 text-lg mb-2">Important Medical Disclaimer</h4>
            <p className="text-amber-900/80 font-medium leading-relaxed">
              This tool is for non-emergency guidance only. If you are experiencing a medical emergency, please call emergency services immediately.
            </p>
          </div>
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-24 px-6">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#0f4c3a]">
          <Stethoscope size={32} />
        </div>
        <div>
           <h1 className="text-4xl font-serif font-bold text-[#0f4c3a] mb-1">Symptom Checker</h1>
           <p className="text-slate-500 font-medium text-lg">AI-Powered Triage Assistant</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
           className="absolute top-0 left-0 h-full bg-[#0f4c3a]"
           initial={{ width: 0 }}
           animate={{ width: `${(step / totalSteps) * 100}%` }}
           transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Main Card */}
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-[3rem] shadow-nav border border-slate-100 p-8 md:p-14 min-h-[600px] flex flex-col"
      >
         <div className="flex-1">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
         </div>

         {/* Navigation */}
         <div className="flex items-center justify-between mt-16 pt-10 border-t border-slate-100">
            {step > 1 ? (
              <button 
                onClick={handlePrev}
                className="px-10 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center gap-3 text-lg"
              >
                <ChevronLeft size={24} />
                Back
              </button>
            ) : <div></div>}

            {step < totalSteps ? (
              <button 
                onClick={handleNext}
                className="px-10 py-4 rounded-full bg-[#0f4c3a] text-white font-bold shadow-lg hover:bg-[#065F46] hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
              >
                Next Step
                <ChevronRight size={24} />
              </button>
            ) : (
               <button 
                className="px-12 py-4 rounded-full bg-[#FBBF24] text-[#0f4c3a] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
              >
                Submit Assessment
                <Send size={20} />
              </button>
            )}
         </div>
      </motion.div>
    </div>
  );
};

export default SymptomSubmission;
