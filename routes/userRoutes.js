const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/:id', authMiddleware, getUserById);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;