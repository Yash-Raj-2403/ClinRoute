import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background text-slate-800 font-sans selection:bg-secondary selection:text-primary-600 overflow-x-hidden relative">
      {/* Background Ambient Color Mesh - Consistent with Patient Layout */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-100 rounded-full blur-[120px] opacity-40 mix-blend-multiply"></div>
         <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-amber-100 rounded-full blur-[120px] opacity-40 mix-blend-multiply"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-indigo-100 rounded-full blur-[120px] opacity-40 mix-blend-multiply"></div>
      </div>

      <Header />
      
      <main className="relative z-10 pt-24 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicLayout;
