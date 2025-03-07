const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

router
  .post("/", authMiddleware, blogController.createBlog)
  .get("/", blogController.getAllBlogs)
  .get("/:id", blogController.getBlogById)
  .delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
