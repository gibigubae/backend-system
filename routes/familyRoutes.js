// familyRoutes.js
const express = require("express");
const router = express.Router();
const { createFamily, getFamilyById, deleteFamily } = require("../controllers/familyController");
const authMiddleware = require('../middleware/authMiddleware');


router.post("/families", authMiddleware, createFamily);

router.get("/families/:id", authMiddleware, getFamilyById);

router.delete("/families/:id", authMiddleware, deleteFamily);

module.exports = router;
