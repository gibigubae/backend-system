const express = require("express");
const router = express.Router();
const {registerUser,loginUser,getUser} = require("../controllers/userController");
const {verifyToken} = require("../middlewares/auth");
router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/getUser/:id",verifyToken,getUser); 
module.exports = router;