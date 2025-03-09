// familyRoutes.js
const express = require("express");
const router = express.Router();
const { createFamily, getFamilyById, deleteFamily } = require("../controllers/familyController");
const authMiddleware = require('../middleware/authMiddleware');


router.post("/", authMiddleware, createFamily);

router.get("/:id", authMiddleware, getFamilyById);

router.delete("/:id", authMiddleware, deleteFamily);

module.exports = router;
