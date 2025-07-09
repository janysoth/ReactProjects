const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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