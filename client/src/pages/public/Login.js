import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Phone, CreditCard, Stethoscope, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.805.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const Logo = () => (
  <Link to="/" className="login-logo">
    <div className="logo-icon">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#319795" />
        <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM25 21H21V25C21 25.553 20.553 26 20 26C19.447 26 19 25.553 19 25V21H15C14.447 21 14 20.553 14 20C14 19.447 14.447 19 15 19H19V15C19 14.447 19.447 14 20 14C20.553 14 21 14.447 21 15V19H25C25.553 19 26 19.447 26 20C26 20.553 25.553 21 25 21Z" fill="white" />
      </svg>
    </div>
    <span>ClinRoute</span>
  </Link>
);

const Login = () => {
  const [role, setRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorLicense, setDoctorLicense] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle(role);
      // browser redirects — no navigate needed
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
      setLoading(false);
    }
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(patientEmail, patientPassword, 'patient');
      navigate(user.profileComplete ? '/patient' : '/patient/account-settings');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(doctorEmail, doctorLicense, 'doctor', doctorPhone);
      navigate(user.profileComplete ? '/doctor' : '/doctor/settings');
    } catch {
      setError('Invalid credentials. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-decoration">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>

      <motion.div
        className="login-wrapper"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="login-panel login-panel--left">
          <Logo />
          <div className="login-hero">
            <div className="login-hero-badge">AI-Powered Healthcare</div>
            <h1 className="login-hero-title">Your health, intelligently managed</h1>
            <p className="login-hero-sub">
              ClinRoute connects patients and doctors through smart triage, real-time consultations, and AI-driven insights.
            </p>
          </div>
        </div>

        <div className="login-panel login-panel--right">
          <div className="login-card">
            <h2 className="login-card-title">Welcome back</h2>
            <p className="login-card-sub">Sign in to your ClinRoute account</p>

            <div className="login-role-toggle">
              <button type="button" className={`lrt-btn ${role === 'patient' ? 'lrt-btn--active' : ''}`} onClick={() => { setRole('patient'); setError(''); }}>
                <User size={16} /> Patient
              </button>
              <button type="button" className={`lrt-btn ${role === 'doctor' ? 'lrt-btn--active' : ''}`} onClick={() => { setRole('doctor'); setError(''); }}>
                <Stethoscope size={16} /> Doctor
              </button>
            </div>

            {error && (
              <motion.div className="login-error-box" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                {error}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {role === 'patient' ? (
                <motion.form key="patient" onSubmit={handlePatientSubmit} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}>
                  <div className="lf-group">
                    <label>Email Address</label>
                    <div className="lf-input-wrap">
                      <Mail className="lf-icon" size={18} />
                      <input type="email" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} placeholder="Enter your email" required />
                    </div>
                  </div>
                  <div className="lf-group">
                    <label>Password</label>
                    <div className="lf-input-wrap">
                      <Lock className="lf-icon" size={18} />
                      <input type={showPassword ? 'text' : 'password'} value={patientPassword} onChange={e => setPatientPassword(e.target.value)} placeholder="" required />
                      <button type="button" className="lf-eye" onClick={() => setShowPassword(p => !p)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="lf-options">
                    <label className="lf-remember">
                      <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="lf-forgot">Forgot password?</Link>
                  </div>
                  <motion.button type="submit" className="lf-submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                    {loading ? <span className="lf-spinner" /> : 'Sign In as Patient'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form key="doctor" onSubmit={handleDoctorSubmit} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  <div className="lf-group">
                    <label>Email Address</label>
                    <div className="lf-input-wrap">
                      <Mail className="lf-icon" size={18} />
                      <input type="email" value={doctorEmail} onChange={e => setDoctorEmail(e.target.value)} placeholder="Enter your email" required />
                    </div>
                  </div>
                  <div className="lf-group">
                    <label>Doctor License Number</label>
                    <div className="lf-input-wrap">
                      <CreditCard className="lf-icon" size={18} />
                      <input type="text" value={doctorLicense} onChange={e => setDoctorLicense(e.target.value)} placeholder="Enter license number" required />
                    </div>
                  </div>
                  <div className="lf-group">
                    <label>Phone Number</label>
                    <div className="lf-input-wrap">
                      <Phone className="lf-icon" size={18} />
                      <input type="tel" value={doctorPhone} onChange={e => setDoctorPhone(e.target.value)} placeholder="Enter phone number" required />
                    </div>
                  </div>
                  <motion.button type="submit" className="lf-submit lf-submit--doctor" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                    {loading ? <span className="lf-spinner" /> : 'Sign In as Doctor'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="lf-divider"><span>or</span></div>
            <button type="button" className="lf-google-btn" onClick={handleGoogle} disabled={loading}>
              <GoogleIcon /> Continue with Google
            </button>

            <p className="login-card-footer">
              Don't have an account? <Link to="/register">Create account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
