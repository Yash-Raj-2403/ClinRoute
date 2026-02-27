-- ============================================
-- ⚠️ WARNING: DO NOT USE THIS FILE FOR CLINROUTE APP
-- ============================================
-- This file contains a complex multi-table schema that is NOT
-- compatible with the current ClinRoute application.
--
-- The app uses a simpler single-table architecture (profiles table)
-- defined in supabase-setup.sql
--
-- ❌ DO NOT RUN THIS FILE - It will cause conflicts and errors
-- ✅ USE supabase-setup.sql instead
--
-- This file is kept for reference only.
-- ============================================

-- ============================================
-- ClinRoute Database Schema for Supabase
-- (REFERENCE ONLY - FOR COMPLEX MULTI-TABLE ARCHITECTURE)
-- ============================================
-- Copy and paste this entire file into Supabase SQL Editor
-- Run it to create all tables, indexes, and constraints

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  phone VARCHAR(20),
  avatar VARCHAR(255) DEFAULT 'default-avatar.png',
  date_of_birth DATE,
  gender VARCHAR(30) CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
  address JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  is_email_verified BOOLEAN DEFAULT false,
  two_factor_enabled BOOLEAN DEFAULT false,
  settings JSONB DEFAULT '{
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    },
    "privacy": {
      "showProfile": true,
      "shareData": false
    }
  }'::jsonb,
  reset_password_token VARCHAR(255),
  reset_password_expire TIMESTAMP,
  email_verification_token VARCHAR(255),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- DOCTORS TABLE
-- ============================================
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(10) DEFAULT 'Dr.' CHECK (title IN ('Dr.', 'Prof.', 'Mr.', 'Ms.')),
  specialty VARCHAR(100) NOT NULL,
  subspecialty VARCHAR(100),
  credentials JSONB DEFAULT '{}'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  board_certifications JSONB DEFAULT '[]'::jsonb,
  languages TEXT[],
  hospital_affiliations JSONB DEFAULT '[]'::jsonb,
  practice_settings JSONB DEFAULT '{
    "acceptingNewPatients": true,
    "virtualConsultations": true,
    "consultationFee": 0,
    "followUpFee": 0,
    "insuranceAccepted": []
  }'::jsonb,
  schedule JSONB DEFAULT '{
    "monday": {"available": true, "startTime": "09:00", "endTime": "17:00", "breaks": []},
    "tuesday": {"available": true, "startTime": "09:00", "endTime": "17:00", "breaks": []},
    "wednesday": {"available": true, "startTime": "09:00", "endTime": "17:00", "breaks": []},
    "thursday": {"available": true, "startTime": "09:00", "endTime": "17:00", "breaks": []},
    "friday": {"available": true, "startTime": "09:00", "endTime": "17:00", "breaks": []},
    "saturday": {"available": false, "startTime": null, "endTime": null, "breaks": []},
    "sunday": {"available": false, "startTime": null, "endTime": null, "breaks": []}
  }'::jsonb,
  appointment_types JSONB DEFAULT '[]'::jsonb,
  blocked_time_slots JSONB DEFAULT '[]'::jsonb,
  bio TEXT,
  rating JSONB DEFAULT '{
    "average": 0,
    "count": 0
  }'::jsonb,
  stats JSONB DEFAULT '{
    "totalPatients": 0,
    "totalConsultations": 0,
    "completedConsultations": 0,
    "averageWaitTime": 0,
    "responseRate": 100
  }'::jsonb,
  is_verified BOOLEAN DEFAULT false,
  verification_documents JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- PATIENTS TABLE
-- ============================================
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  medical_history JSONB DEFAULT '{
    "conditions": [],
    "allergies": [],
    "medications": [],
    "surgeries": [],
    "familyHistory": []
  }'::jsonb,
  vitals JSONB DEFAULT '{
    "bloodType": "Unknown",
    "height": null,
    "weight": null,
    "lastUpdated": null
  }'::jsonb,
  insurance JSONB DEFAULT '{}'::jsonb,
  emergency_contact JSONB DEFAULT '{}'::jsonb,
  primary_care_physician_id UUID REFERENCES doctors(id),
  favorite_doctors UUID[],
  health_metrics JSONB DEFAULT '[]'::jsonb,
  documents JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- CONSULTATIONS TABLE
-- ============================================
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id VARCHAR(50) UNIQUE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id),
  type VARCHAR(20) DEFAULT 'ai-triage' CHECK (type IN ('ai-triage', 'video', 'in-person', 'chat', 'phone')),
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'in-queue', 'assigned', 'in-progress', 'completed', 'cancelled', 'no-show')),
  symptoms JSONB NOT NULL,
  patient_vitals JSONB DEFAULT '{}'::jsonb,
  triage JSONB DEFAULT '{
    "priority": "routine",
    "score": null,
    "recommendation": null,
    "riskFactors": [],
    "differentialDiagnosis": [],
    "recommendedTests": [],
    "aiConfidence": null,
    "analyzedAt": null
  }'::jsonb,
  queue_position INTEGER,
  estimated_wait_time INTEGER,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  duration INTEGER,
  diagnosis JSONB DEFAULT '{
    "primary": null,
    "secondary": [],
    "notes": null,
    "icd10Codes": []
  }'::jsonb,
  treatment JSONB DEFAULT '{
    "plan": null,
    "prescriptions": [],
    "procedures": [],
    "referrals": [],
    "followUp": {}
  }'::jsonb,
  notes JSONB DEFAULT '[]'::jsonb,
  attachments JSONB DEFAULT '[]'::jsonb,
  messages JSONB DEFAULT '[]'::jsonb,
  video_session JSONB DEFAULT '{}'::jsonb,
  feedback JSONB DEFAULT '{}'::jsonb,
  billing JSONB DEFAULT '{
    "consultationFee": null,
    "additionalCharges": [],
    "totalAmount": null,
    "paymentStatus": "pending",
    "paymentMethod": null,
    "invoiceId": null
  }'::jsonb,
  flags JSONB DEFAULT '{
    "isUrgent": false,
    "isFollowUp": false,
    "requiresSpecialist": false,
    "hasAllergies": false
  }'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES consultations(id),
  appointment_date DATE NOT NULL,
  time_slot JSONB NOT NULL,
  type VARCHAR(20) DEFAULT 'in-person' CHECK (type IN ('in-person', 'video', 'phone', 'follow-up')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked-in', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled')),
  reason TEXT NOT NULL,
  notes JSONB DEFAULT '{
    "patient": null,
    "doctor": null,
    "internal": null
  }'::jsonb,
  is_new_patient BOOLEAN DEFAULT false,
  reminders JSONB DEFAULT '{
    "email": {"sent": false, "sentAt": null},
    "sms": {"sent": false, "sentAt": null}
  }'::jsonb,
  check_in JSONB DEFAULT '{}'::jsonb,
  cancellation JSONB DEFAULT '{}'::jsonb,
  reschedule JSONB DEFAULT '{}'::jsonb,
  billing JSONB DEFAULT '{
    "amount": null,
    "status": "pending"
  }'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Patients indexes
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_primary_physician ON patients(primary_care_physician_id);

-- Doctors indexes
CREATE INDEX idx_doctors_user_id ON doctors(user_id);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_verified ON doctors(is_verified);
CREATE INDEX idx_doctors_accepting_patients ON doctors((practice_settings->>'acceptingNewPatients'));

-- Consultations indexes
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_consultations_doctor_id ON consultations(doctor_id);
CREATE INDEX idx_consultations_consultation_id ON consultations(consultation_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_type ON consultations(type);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_consultations_patient_created ON consultations(patient_id, created_at DESC);
CREATE INDEX idx_consultations_doctor_status ON consultations(doctor_id, status);
CREATE INDEX idx_consultations_priority ON consultations((triage->>'priority'));

-- Appointments indexes
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_consultation_id ON appointments(consultation_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_patient_date ON appointments(patient_id, appointment_date DESC);
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, appointment_date);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGER FOR CONSULTATION ID GENERATION
-- ============================================

CREATE OR REPLACE FUNCTION generate_consultation_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.consultation_id IS NULL THEN
    NEW.consultation_id := 'CLN-' || 
                          EXTRACT(YEAR FROM NOW())::TEXT || '-' || 
                          LPAD((
                            SELECT COUNT(*) + 1 
                            FROM consultations 
                            WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW())
                          )::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_consultation_id BEFORE INSERT ON consultations
  FOR EACH ROW EXECUTE FUNCTION generate_consultation_id();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- View for full user profiles with role-specific data
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
  u.id,
  u.first_name,
  u.last_name,
  u.email,
  u.phone,
  u.avatar,
  u.date_of_birth,
  u.gender,
  u.address,
  u.role,
  u.is_active,
  u.is_email_verified,
  u.last_login,
  u.created_at,
  CASE 
    WHEN u.role = 'patient' THEN p.id
    WHEN u.role = 'doctor' THEN d.id
    ELSE NULL
  END as profile_id,
  CASE 
    WHEN u.role = 'patient' THEN p.medical_history
    ELSE NULL
  END as patient_data,
  CASE 
    WHEN u.role = 'doctor' THEN jsonb_build_object(
      'specialty', d.specialty,
      'credentials', d.credentials,
      'rating', d.rating,
      'is_verified', d.is_verified
    )
    ELSE NULL
  END as doctor_data
FROM users u
LEFT JOIN patients p ON u.id = p.user_id AND u.role = 'patient'
LEFT JOIN doctors d ON u.id = d.user_id AND u.role = 'doctor';

-- View for consultation queue
CREATE OR REPLACE VIEW consultation_queue AS
SELECT 
  c.id,
  c.consultation_id,
  c.patient_id,
  u.first_name || ' ' || u.last_name as patient_name,
  c.symptoms,
  c.triage,
  c.status,
  c.queue_position,
  c.estimated_wait_time,
  c.created_at
FROM consultations c
JOIN patients p ON c.patient_id = p.id
JOIN users u ON p.user_id = u.id
WHERE c.status IN ('submitted', 'in-queue')
ORDER BY 
  CASE 
    WHEN c.triage->>'priority' = 'critical' THEN 1
    WHEN c.triage->>'priority' = 'urgent' THEN 2
    WHEN c.triage->>'priority' = 'moderate' THEN 3
    ELSE 4
  END,
  c.created_at;

-- View for upcoming appointments
CREATE OR REPLACE VIEW upcoming_appointments AS
SELECT 
  a.id,
  a.appointment_date,
  a.time_slot,
  a.type,
  a.status,
  a.reason,
  up.first_name || ' ' || up.last_name as patient_name,
  up.email as patient_email,
  ud.first_name || ' ' || ud.last_name as doctor_name,
  d.specialty as doctor_specialty,
  a.created_at
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN users up ON p.user_id = up.id
JOIN doctors d ON a.doctor_id = d.id
JOIN users ud ON d.user_id = ud.id
WHERE a.appointment_date >= CURRENT_DATE
  AND a.status NOT IN ('cancelled', 'completed')
ORDER BY a.appointment_date, a.time_slot->>'start';

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Patients can read their own data
CREATE POLICY "Patients can read own data" ON patients
  FOR SELECT USING (user_id = auth.uid());

-- Patients can update their own data
CREATE POLICY "Patients can update own data" ON patients
  FOR UPDATE USING (user_id = auth.uid());

-- Doctors can read their own data
CREATE POLICY "Doctors can read own data" ON doctors
  FOR SELECT USING (user_id = auth.uid());

-- Doctors can update their own data
CREATE POLICY "Doctors can update own data" ON doctors
  FOR UPDATE USING (user_id = auth.uid());

-- Patients can read their consultations
CREATE POLICY "Patients can read own consultations" ON consultations
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

-- Doctors can read their assigned consultations
CREATE POLICY "Doctors can read assigned consultations" ON consultations
  FOR SELECT USING (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
  );

-- Patients can read their appointments
CREATE POLICY "Patients can read own appointments" ON appointments
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

-- Doctors can read their appointments
CREATE POLICY "Doctors can read assigned appointments" ON appointments
  FOR SELECT USING (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
  );

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment below to insert sample data

/*
-- Sample admin user
INSERT INTO users (first_name, last_name, email, password, role, is_email_verified)
VALUES ('Admin', 'User', 'admin@clinroute.com', '$2a$10$YourHashedPasswordHere', 'admin', true);

-- Sample patient user
INSERT INTO users (first_name, last_name, email, password, role, date_of_birth, gender, is_email_verified)
VALUES ('John', 'Doe', 'patient@example.com', '$2a$10$YourHashedPasswordHere', 'patient', '1990-01-15', 'male', true);

-- Sample doctor user
INSERT INTO users (first_name, last_name, email, password, role, is_email_verified)
VALUES ('Sarah', 'Smith', 'doctor@example.com', '$2a$10$YourHashedPasswordHere', 'doctor', true);
*/

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ ClinRoute database schema created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Tables created:';
  RAISE NOTICE '  - users';
  RAISE NOTICE '  - patients';
  RAISE NOTICE '  - doctors';
  RAISE NOTICE '  - consultations';
  RAISE NOTICE '  - appointments';
  RAISE NOTICE '';
  RAISE NOTICE '🔍 Views created:';
  RAISE NOTICE '  - user_profiles';
  RAISE NOTICE '  - consultation_queue';
  RAISE NOTICE '  - upcoming_appointments';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 RLS policies enabled for all tables';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Ready to use!';
END $$;
