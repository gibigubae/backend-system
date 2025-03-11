const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../.env"});
const database = require('../config/database');
const nodemailer = require('nodemailer');
const resetTokens = new Map();


// Email configuration (example with Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Register a new user
const registerUser = async (req, res) => {
  const { fullName, studentId, email, password,isAdmin} = req.body;
  const idPicture = req.file ? req.file.filename : null
  if(!idPicture){
    return res.status(422).json({
      success:false,
      message:"Image is required"
    })
  }
  
  if (!fullName || !studentId  || !email || !password ) {
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
    const adminStatus  = isAdmin == "true" || isAdmin == true ? true : false;
    // Create new user with only essential fields
    const user = await User.create({
      fullName,
      studentId,
      email,
      password: hashedPassword,
      isAdmin: adminStatus,
      idPicture
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
  console.log("Received body:", req.body)
  const email = req.body.email || req.body["email"];
  const password = req.body.password || req.body["password"];
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
    const isSelf = req.user.id === user.id || user.isAdmin;

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
    if (req.user.isAdmin === false && req.user.id !== user.id) {
      return res.status(403).json({ message: 'Only admin can delete an account and the user it' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Request password reset
async function requestPasswordReset(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const generateToken = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const getUniqueToken = () => {
      let resetToken = generateToken();
      let attempts = 0;
      const maxAttempts = 5;

      while (
        Array.from(resetTokens.values()).some(
          (tokenData) => tokenData.token === resetToken
        ) &&
        attempts < maxAttempts
      ) {
        resetToken = generateToken();
        attempts++;
      }
      return resetToken;
    };

    const resetToken = getUniqueToken();

    resetTokens.set(user.email, {
      token: resetToken,
      expires: Date.now() + 600000
    });

    // Complete HTML content from original code
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #2980b9;
          }
          .code {
            font-family: monospace;
            font-size: 3em;
            background-color: #ecf0f1;
            padding: 10px;
            border-radius: 4px;
            margin: 20px 0;
            display: inline-block;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #7f8c8d;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Request</h1>
          <p>You are receiving this email because you (or someone else) has requested to reset the password for your account.</p>
          <p>Please click the button below or use the code to reset your password. This link/code will expire in 10 minutes.</p>
          <a href="${process.env.APP_URL}/reset-password?token=${resetToken}" class="button">Reset Password</a>
          <p>Alternatively, you can use this code:</p>
          <div class="code">${resetToken}</div>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p>For security reasons, do not share this link or code with anyone.</p>
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} AASTU Gibi Gubae. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request - Action Required',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'A password reset link has been sent' });
  } catch (error) {
    console.error('Error sending reset token:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Reset password with token
async function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  try {
    let userEmail = null;
    for (const [email, tokenData] of resetTokens) {
      if (tokenData.token === token) {
        userEmail = email;
        break;
      }
    }

    const storedToken = resetTokens.get(userEmail);
    if (!storedToken || storedToken.token !== token || Date.now() > storedToken.expires) {
      return res.status(401).json({ error: 'Invalid or expired reset token' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await user.update({ password: hashedPassword });

    resetTokens.delete(userEmail);

    await sendPasswordChangedNotification(userEmail);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
// sendPasswordChangedNotification function
async function sendPasswordChangedNotification(email) {
  const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #2980b9;
          }
          .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #7f8c8d;
            text-align: center;
          }
          .security-tips {
            background-color: #ecf0f1;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Changed Successfully</h1>
          <p>Your password has been successfully changed on ${new Date().toLocaleString()}.</p>
          <p>If you did not make this change, please contact our support team immediately.</p>
          <a href="${process.env.APP_URL}/support" class="button">Contact Support</a>
          
          <div class="security-tips">
            <h3>Security Tips:</h3>
            <ul>
              <li>Never share your password with anyone</li>
              <li>Use a unique password for each of your accounts</li>
              <li>Consider using a password manager</li>
              <li>Enable two-factor authentication if available</li>
            </ul>
          </div>
  
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>Need help? <a href="${process.env.APP_URL}/help">Visit our Help Center</a></p>
            <p>© ${new Date().getFullYear()} AASTU Gibi Gubae. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Change Notification - Action May Be Required',
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password change notification:', error.message);
    // You might want to log this error but not throw it,
    // as the password reset was successful
  }
}
// Clean up expired tokens periodically
setInterval(() => {
  for (const [email, tokenData] of resetTokens) {
    if (Date.now() > tokenData.expires) {
      resetTokens.delete(email);
    }
  }
}, 300000); // Run every 5 minutes since tokens expire in 10 minutes


module.exports = { registerUser, loginUser, getUserById, deleteUser,requestPasswordReset, resetPassword };