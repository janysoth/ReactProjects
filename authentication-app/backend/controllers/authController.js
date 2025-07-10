const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sendMail = require("../utils/sendEmail");
const generateResetEmail = require("../utils/ResetPasswordTemplate");

// Base frontend URL (for things like reset password links)
const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Extract safe user data
const getSafeUserData = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  profileImageUrl: user.profileImageUrl,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// @desc   Register new user
// @route  POST /api/v1/auth/register
// @access Public
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      user: getSafeUserData(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user (backend)",
      error: error.message,
    });
  }
};

// @desc   Login user
// @route  POST /api/v1/auth/login
// @access Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      user: getSafeUserData(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in (backend)",
      error: error.message,
    });
  }
};

// @desc   Get user profile
// @route  GET /api/v1/auth/getUser
// @access Private
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(getSafeUserData(user));
  } catch (error) {
    res.status(500).json({
      message: "Error getting user info (backend)",
      error: error.message,
    });
  }
};

// @desc   Update user profile
// @route  PATCH /api/v1/auth/update-profile
// @access Private
exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, profileImageUrl, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (profileImageUrl) user.profileImageUrl = profileImageUrl;
    if (password && password.trim() !== "") user.password = password; // triggers hashing via pre-save

    await user.save();

    // Destructure the fields you want to return
    const {
      _id,
      fullName: name,
      email: userEmail,
      profileImageUrl: avatar,
      createdAt,
      updatedAt,
    } = user;

    res.status(200).json({
      id: _id,
      fullName: name,
      email: userEmail,
      profileImageUrl: avatar,
      createdAt,
      updatedAt,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating user profile.",
      error: error.message,
    });
  }
};

// @desc   Generate Forgot password link
// @route  POST /api/v1/auth/forgot-password
// @access Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate token and hash it
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token and expiration
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 30 * 1000; // 1 hour

    await user.save();

    const resetLink = `${baseURL}/reset-password/${resetToken}`;
    const html = generateResetEmail(user.fullName, resetLink);

    await sendMail(user.email, "Password Reset Request", html);

    res.status(200).json({
      message: "Password reset link sent to email.",
      resetLink, // 🔁 Optional to send in dev mode only
    });

  } catch (error) {
    res.status(500).json({
      message: "Error in forgotPassword controller (backend).",
      error: error.message,
    });
  }
};