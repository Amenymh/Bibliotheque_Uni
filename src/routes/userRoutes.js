const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes for authenticated users
router.get('/me', auth, userController.getMe);
router.put('/updatep', auth, userController.updateProfile); // Profile update route for authenticated users

// Admin-only routes
router.post('/', userController.createUser);
router.get('/', auth, authorize('admin'), userController.getAllUsers);
router.get('/:id', auth, authorize('admin'), userController.getUserById);
router.put('/:id', auth, authorize('admin'), userController.updateUser);
router.delete('/:id', auth, authorize('admin'), userController.deleteUser);

module.exports = router;