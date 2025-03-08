const express = require('express');
const router = express.Router();
const { createTravel, getAllTravels, getTravelById, updateTravel, deleteTravel } = require('../controllers/travelController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Define routes
router.post('/', authMiddleware, createTravel);
router.get('/', getAllTravels);
router.get('/:id', getTravelById);
router.put('/:id', authMiddleware, updateTravel);
router.delete('/:id', authMiddleware, deleteTravel);

// Export the router
module.exports = router;
