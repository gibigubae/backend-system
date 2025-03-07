const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new user
const registerUser = async (req, res) => {
  const { fullName, studentId, gender, email, password, batch } = req.body;
  if (!fullName || !studentId || !gender || !email || !password || !batch) {
    return res.status(422).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  // Additional validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
  if (!emailRegex.test(email)) {
    return res.status(422).json({
      success: false,
      message: "Invalid email format",
    });
  }
  if (password.length < 8) {
    return res.status(422).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    // Check if user already exists by email or studentId
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }
    const existingStudentId = await User.findOne({ where: { studentId } });
    if (existingStudentId) {
      return res.status(409).json({
        success: false,
        message: "Student ID is already taken"
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with only essential fields
    const user = await User.create({
      fullName,
      studentId,
      gender,
      email,
      password: hashedPassword,
      batch,
    });

    // Return success response without token
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error); // Log for debugging
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    },
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user by ID (protected route)
const getUserById = async (req, res) => {
  const { id } = req.params;

  // Ensure req.user is set by middleware
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No user authenticated",
    });
  }

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Exclude password from response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Restrict access to the user themselves or an admin
    const isSelf = req.user.id === user.id;

    if (!isSelf) {
      return res.status(403).json({
        message: "Forbidden: You can only view your own profile or must be an admin",
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Delete user by ID (protected route)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No user authenticated",
    });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Optionally, restrict deletion to the user themselves or an admin
    if (req.user.id !== user.id) {
      return res.status(403).json({ message: 'You can only delete your own account' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserById, deleteUser };