import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="20" cy="20" r="20" fill="currentColor"/>
              <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white"/>
            </svg>
          </div>
          <span className="text-2xl font-serif font-bold text-primary-900 tracking-tight">ClinRoute</span>
        </Link>

        {/* Navigation */}
        <nav className={`hidden md:flex items-center gap-8`}>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">How It Works</Link>
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">About</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to={user?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-all duration-300 shadow-soft hover:shadow-md hover:-translate-y-0.5">
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Log in
              </Link>
              <Link to="/register" className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-all duration-300 shadow-soft hover:shadow-md hover:-translate-y-0.5">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          <Link to="/" className="text-base font-medium text-gray-800 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/how-it-works" className="text-base font-medium text-gray-800 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
          <Link to="/about" className="text-base font-medium text-gray-800 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <div className="h-px bg-gray-100 my-2"></div>
          {isAuthenticated ? (
            <>
              <Link to={user?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} className="text-base font-medium text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left text-base font-medium text-gray-800 hover:text-primary-600">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-base font-medium text-gray-800 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="text-base font-medium text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
