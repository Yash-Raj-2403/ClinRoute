/**
 * Patient Routes
 */

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);
router.use(authorize('patient', 'admin'));

// Patient dashboard
router.get('/dashboard', patientController.getDashboard);

// Patient profile
router.get('/me', patientController.getMyProfile);
router.put('/me', patientController.updateProfile);

// Medical history
router.get('/medical-history', patientController.getMedicalHistory);
router.put('/medical-history', patientController.updateMedicalHistory);

// Medical records
router.get('/records', patientController.getMedicalRecords);
router.post('/records', patientController.addMedicalRecord);

// Documents
router.get('/documents', patientController.getDocuments);
router.post('/documents', patientController.uploadDocument);
router.delete('/documents/:id', patientController.deleteDocument);

// Vitals
router.put('/vitals', patientController.updateVitals);

// Prescriptions
router.get('/prescriptions', patientController.getPrescriptions);

// Consultations
router.get('/consultations', patientController.getConsultationHistory);

// Find nearby doctors
router.get('/nearby-doctors', patientController.getNearbyDoctors);

module.exports = router;
