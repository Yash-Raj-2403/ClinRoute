/**
 * Consultation Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const consultationController = require('../controllers/consultationController');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// Symptom submission validation
const symptomValidation = [
  body('symptoms')
    .isArray({ min: 1 }).withMessage('At least one symptom is required'),
  body('symptoms.*.name')
    .notEmpty().withMessage('Symptom name is required'),
  body('symptoms.*.severity')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('Severity must be between 1 and 10')
];

// All routes require authentication
router.use(protect);

// Patient routes
router.post(
  '/', 
  authorize('patient'), 
  symptomValidation, 
  validate, 
  consultationController.submitSymptoms
);
router.get('/:id', consultationController.getConsultation);
router.put('/:id', consultationController.updateConsultation);
router.put('/:id/cancel', authorize('patient'), consultationController.cancelConsultation);

// Chat/messaging
router.get('/:id/messages', consultationController.getMessages);
router.post('/:id/messages', consultationController.addMessage);

// Video consultation
router.post('/:id/video/start', authorize('doctor'), consultationController.startVideoSession);
router.post('/:id/video/end', consultationController.endVideoSession);

// Feedback
router.post('/:id/feedback', authorize('patient'), consultationController.submitFeedback);

// Close consultation
router.put('/:id/close', authorize('doctor'), consultationController.closeConsultation);

// Admin routes
router.get('/', authorize('admin'), consultationController.getAllConsultations);

module.exports = router;
