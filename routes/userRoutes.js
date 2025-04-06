const express = require("express");
const router = express.Router();
const {registerUser,loginUser,getUser,deleteUser} = require("../controllers/userController");
const {verifyToken} = require("../middlewares/auth");
router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/getUser/:id",verifyToken,getUser); 
router.delete("/deleteUser/:id",verifyToken,deleteUser);
module.exports = router;