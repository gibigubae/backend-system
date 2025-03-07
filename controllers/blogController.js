const Blog = require("../models/Blog");
const { Op } = require("sequelize");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, ExpiredAt } = req.body;
    const createdBy = req.user.id;
    const blog = await Blog.create({
      title,
      content,
      createdAt: new Date(),
      ExpiredAt: ExpiredAt || null,
      createdBy,
    });

    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog post created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        [Op.or]: [{ ExpiredAt: { [Op.gt]: new Date() } }, { ExpiredAt: null }],
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: blogs,
      message: "All blog posts fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.params.id,
        [Op.or]: [{ ExpiredAt: { [Op.gt]: new Date() } }, { ExpiredAt: null }],
      },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: "Blog post fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete blog post by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found",
      });
    }

    if (blog.createdBy !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to delete this post",
      });
    }

    await blog.destroy();

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, deleteBlog };
