/**
 * AI Triage Routes
 */

const express = require('express');
const router = express.Router();
const triageController = require('../controllers/triageController');
const { protect, authorize } = require('../middleware/auth');

// Public quick check (no auth)
router.post('/quick-check', triageController.quickTriageCheck);

// RAG-powered AI endpoints (public access for demo)
router.post('/ai-analyze', triageController.aiAnalyzeSymptoms);
router.get('/search', triageController.semanticSearch);
router.get('/rag-status', triageController.getRagStatus);

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
