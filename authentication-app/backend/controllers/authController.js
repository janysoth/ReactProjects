const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";

// sendMail = require("../utils/SendEmail");
// generateResetEmail = require("../utils/ResetPasswordTemplate");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Validation Check for missing fields
  if (!fullName || !email || !password)
    return res.status(400).json({ message: 'Please fill all fields.' });

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'Email already in use.' });

    // Create a new User
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error registering user (backend): ',
      error: error.message
    });
  }
};