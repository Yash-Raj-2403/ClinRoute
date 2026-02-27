/**
 * Doctor Routes
 */

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

// Public routes (no auth required)
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctor);
router.get('/:id/availability', doctorController.getAvailability);

// Protected routes
router.use(protect);
router.use(authorize('doctor', 'admin'));

// Dashboard
router.get('/dashboard', doctorController.getDashboard);

// Queue management
router.get('/queue', doctorController.getPatientQueue);

// Case management
router.get('/cases/:id', doctorController.getCase);
router.put('/cases/:id/status', doctorController.updateCaseStatus);
router.put('/cases/:id/diagnosis', doctorController.addDiagnosis);
router.post('/cases/:id/prescription', doctorController.addPrescription);
router.post('/cases/:id/tests', doctorController.orderTests);

// Profile management
router.get('/me', doctorController.getMyProfile);
router.put('/me', doctorController.updateProfile);
router.put('/schedule', doctorController.updateSchedule);

// Analytics
router.get('/analytics', doctorController.getAnalytics);

module.exports = router;
