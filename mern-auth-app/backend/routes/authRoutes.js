const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = express.Router();

const sendMail = require("../utils/sendMail");
const generateResetEmail = require("../utils/resetPasswordTemplate");

const User = require('../models/User');

// IN memory store reset token
const resetTokens = new Map();

// Base Frontend URL
const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Register User route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const user = new User({ name, email, password });

    // Sign token immediately after registration
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error registering user backend: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Login User route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid Credentials. Please try again." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials. Please try again." });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error logging user: ", error);
    res.status(500).json({ message: "Internal Server error." });
  }
});

// Forgot Password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found." });

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store the reset token in memory
    resetTokens.set(resetToken, user._id);

    // Send email with reset link
    const resetLink = `${baseURL}/reset-password/${resetToken}`;

    // Call sendMail function to send email
    const html = generateResetEmail(user.name, resetLink);
    await sendMail(user.email, "Password Reset", html);

    res.status(200).json({
      message: "Password reset link sent to your email.",
      resetLink,
    });
  } catch (error) {
    console.error("Error in forgot password backend: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

// Reset Password route
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Compare the token from the link with the token in resetTokens
    const userId = resetTokens.get(token);

    if (!userId) return res.status(400).json({ message: "Invalid or expired token." });

    // Then compare the userId with the userIds in User
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    resetTokens.delete(token);

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in reset password backend: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

module.exports = router;