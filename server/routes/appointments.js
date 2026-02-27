/**
 * Appointment Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// Appointment booking validation
const bookingValidation = [
  body('doctor')
    .notEmpty().withMessage('Doctor ID is required')
    .isMongoId().withMessage('Invalid doctor ID'),
  body('dateTime')
    .notEmpty().withMessage('Date and time is required')
    .isISO8601().withMessage('Invalid date format'),
  body('reason')
    .notEmpty().withMessage('Reason is required')
    .isLength({ max: 500 }).withMessage('Reason must be less than 500 characters')
];

// Get available slots (public)
router.get('/slots', appointmentController.getAvailableSlots);

// All routes require authentication
router.use(protect);

// Patient routes
router.post(
  '/',
  authorize('patient'),
  bookingValidation,
  validate,
  appointmentController.bookAppointment
);
router.get('/my', authorize('patient'), appointmentController.getMyAppointments);

// Appointment operations
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.put('/:id/cancel', appointmentController.cancelAppointment);
router.put('/:id/reschedule', appointmentController.rescheduleAppointment);

// Doctor routes
router.get('/doctor', authorize('doctor'), appointmentController.getDoctorAppointments);
router.put('/:id/confirm', authorize('doctor'), appointmentController.confirmAppointment);
router.put('/:id/complete', authorize('doctor'), appointmentController.completeAppointment);
router.put('/:id/no-show', authorize('doctor'), appointmentController.markNoShow);

// Calendar view
router.get('/calendar', appointmentController.getCalendarView);

module.exports = router;
