import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// Chat Page (Protected)
import Chatpage from './pages/chat/Chatpage';

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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ToastProvider>
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
          <Route path="/chat" element={<Chatpage />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="consultation/new" element={<SymptomSubmission />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="consultation/:id" element={<ConsultationStatus />} />
          <Route path="doctors-nearby" element={<NearbyDoctors />} />
          <Route path="reports" element={<PatientReports />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="queue" element={<PatientQueue />} />
          <Route path="case/:id" element={<CaseView />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
