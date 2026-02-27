import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallback = () => {
  const { handleOAuthCallback } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const role = searchParams.get('role') || 'patient';
    handleOAuthCallback(role)
      .then(profile => {
        if (profile.role === 'doctor') {
          navigate(profile.profileComplete ? '/doctor' : '/doctor/settings', { replace: true });
        } else {
          navigate(profile.profileComplete ? '/patient' : '/patient/account-settings', { replace: true });
        }
      })
      .catch(err => setError(err.message || 'Authentication failed.'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#dc2626', marginBottom: 16 }}>{error}</p>
        <a href="/login" style={{ color: '#0d9488', fontWeight: 600 }}>Back to login</a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', color: '#64748b' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#0d9488', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 16px' }} />
        <p>Completing sign-in…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};

export default AuthCallback;
