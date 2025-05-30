import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/auth/UserModel.js";

// To Check if the user is logged in
// next function needs to pass as parameter
export const protect = asyncHandler(async (req, res, next) => {
  try {
    // Check if User is logged in
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ success: false, message: "User not authenticated." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get User details from the token --> exclude password
    const user = await User.findById(decoded.id).select("-password");

    // Check if User exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Set User details in the request object
    req.user = user;

    // Go to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
});

// Admin middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // If User is admin, move to the next middleware/controller
    next();
    return;
  }

  // If User is not admin, send 403 Forbidden --> terminate the request
  res.status(403).json({ message: "Not Authorized to perform this function." });
});

// Creator middleware
export const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if ((req.user && req.user.role === "creator") || (req.user && req.user.role === "admin")) {
    // If User is creator or admin, move to the next middleware/controller
    next();
    return;
  }

  // If not, send 403 Forbidden --> terminate the request
  res.status(403).json({ message: "Not Authorized to perform this function." });
});

// Verified middleware
export const verifiedMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    // If user is verified, move to the next middleware/controller
    next();
    return;
  }

  // If not, send 403 Forbidden --> terminate the request
  res.status(403).json({ message: "Please verify your email." });
});