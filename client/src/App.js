import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';

// Layout
import PublicLayout from './components/layout/PublicLayout';
import PatientLayout from './components/layout/PatientLayout';
import DoctorLayout from './components/layout/DoctorLayout';

// Context
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import ForDoctors from './pages/public/ForDoctors';
import ForHospitals from './pages/public/ForHospitals';
import Security from './pages/public/Security';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import AuthCallback from './pages/public/AuthCallback';
import Contact from './pages/public/Contact';
import FAQs from './pages/public/FAQs';
import HelpCenter from './pages/public/HelpCenter';
import SystemStatus from './pages/public/SystemStatus';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import HIPAA from './pages/public/HIPAA';
import Cookies from './pages/public/Cookies';
import RAGTechnology from './pages/public/RAGTechnology';
import Enterprise from './pages/public/Enterprise';
import APIAccess from './pages/public/APIAccess';

// Chat Page (Protected)
import AIHealthAssistant from './pages/chat/AIHealthAssistant';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import SymptomSubmission from './pages/patient/SymptomSubmission';
import Consultations from './pages/patient/Consultations';
import ConsultationStatus from './pages/patient/ConsultationStatus';
import NearbyDoctors from './pages/patient/NearbyDoctors';
import PatientReports from './pages/patient/Reports';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientQueue from './pages/doctor/PatientQueue';
import CaseView from './pages/doctor/CaseView';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorProfile from './pages/doctor/Profile';
import DoctorSettings from './pages/doctor/DoctorSettings';

// Patient Settings
import PatientAccountSettings from './pages/patient/AccountSettings';

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Profile Guard — redirects to settings if profile not yet completed
const ProfileGuard = ({ children, settingsPath }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.profileComplete) return <Navigate to={settingsPath} replace />;
  return children;
};

function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-doctors" element={<ForDoctors />} />
          <Route path="/for-hospitals" element={<ForHospitals />} />
          <Route path="/security" element={<Security />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Footer Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/status" element={<SystemStatus />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/hipaa" element={<HIPAA />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/rag-technology" element={<RAGTechnology />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/api-access" element={<APIAccess />} />
        </Route>

        {/* Protected Chat Route */}
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <AIHealthAssistant />
            </ProtectedRoute>
          } 
        />

        {/* Patient Routes */}
        <Route path="/patient" element={<ProfileGuard settingsPath="/patient/account-settings"><PatientLayout /></ProfileGuard>}>
          <Route index element={<PatientDashboard />} />
          <Route path="consultation/new" element={<SymptomSubmission />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="consultation/:id" element={<ConsultationStatus />} />
          <Route path="doctors-nearby" element={<NearbyDoctors />} />
          <Route path="reports" element={<PatientReports />} />
        </Route>

        {/* Patient Account Settings (standalone, no layout wrapper) */}
        <Route path="/patient/account-settings" element={<PatientAccountSettings />} />

        {/* Doctor Routes */}
        <Route path="/doctor" element={<ProfileGuard settingsPath="/doctor/settings"><DoctorLayout /></ProfileGuard>}>
          <Route index element={<DoctorDashboard />} />
          <Route path="queue" element={<PatientQueue />} />
          <Route path="case/:id" element={<CaseView />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>

        {/* Doctor Settings (standalone, no layout wrapper) */}
        <Route path="/doctor/settings" element={<DoctorSettings />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
