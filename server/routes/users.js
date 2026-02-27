/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes below require authentication
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), userController.getAllUsers);
router.get('/stats', authorize('admin'), userController.getUserStats);

// User routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/avatar', userController.updateAvatar);
router.delete('/account', userController.deleteAccount);
router.put('/settings', userController.updateSettings);
router.get('/notifications', userController.getNotifications);
router.put('/notifications/:id/read', userController.markNotificationRead);

module.exports = router;
