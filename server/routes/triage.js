/**
 * AI Triage Routes
 */

const express = require('express');
const router = express.Router();
const triageController = require('../controllers/triageController');
const { protect, authorize } = require('../middleware/auth');

// Public quick check (no auth)
router.post('/quick-check', triageController.quickTriageCheck);

// All other routes require authentication
router.use(protect);

// Patient/Doctor can submit symptoms for AI analysis
router.post('/analyze', triageController.analyzeTriageSymptoms);

// Doctor routes
router.get('/:consultationId/insights', authorize('doctor', 'admin'), triageController.getTriageInsights);
router.put('/:consultationId', authorize('doctor', 'admin'), triageController.updateTriageAssessment);

// Analytics (admin/doctor dashboard)
router.get('/analytics', authorize('doctor', 'admin'), triageController.getTriageAnalytics);

module.exports = router;
