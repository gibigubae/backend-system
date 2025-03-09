const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload')

// Public routes
router.post('/register', upload.single('idPicture'),registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/:id', authMiddleware, getUserById);
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;