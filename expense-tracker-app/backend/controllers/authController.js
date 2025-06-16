const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";

const sendMail = require("../utils/SendEmail");
const generateResetEmail = require("../utils/ResetPasswordTemplate");

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
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create a new User
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: "Error in registering user backend: ",
      error: error.message
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in logging in user backend: ",
      error: error.message
    });
  }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error in getting user info backend: ",
      error: error.message
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, profileImageUrl, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found." });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (profileImageUrl) user.profileImageUrl = profileImageUrl;

    if (password && password.trim() !== '') {
      user.password = password;
    }

    await user.save();
    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error in updating User Profile backend: ",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 minutes

    await user.save();

    const resetLink = `${baseURL}/reset-password/${resetToken}`;
    const html = generateResetEmail(user.fullName, resetLink);

    await sendMail(user.email, "Password Reset", html);

    res.status(200).json({ message: "Password reset link sent", resetLink });
  } catch (error) {
    res.status(500).json({
      message: "Error in forgot password backend: ",
      error: error.message,
    });
  }
};
