import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('clinroute_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    // Simulated login - replace with actual API call
    const mockUser = {
      id: '1',
      email,
      role,
      name: role === 'doctor' ? 'Dr. Sarah Johnson' : 'John Patient',
      avatar: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('clinroute_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (userData) => {
    // Simulated registration - replace with actual API call
    const mockUser = {
      id: '1',
      email: userData.email,
      role: userData.role,
      name: userData.name,
      avatar: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('clinroute_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clinroute_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isDoctor: user?.role === 'doctor',
    isPatient: user?.role === 'patient',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
