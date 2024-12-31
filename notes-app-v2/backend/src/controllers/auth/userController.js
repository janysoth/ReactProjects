import asyncHandler from "express-async-handler";

import generateToken from "../../helpers/generateToken.js";
import User from "../../models/auth/UserModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password)
    res.status(400).json({ message: "All Fields are Required." });

  // Check Password Length
  if (password.length < 6)
    res.status(400).json({ message: "Password Must Be At Least 6 Characters." });

  // Check If User Already Exists
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User Already Exists." });

  // Create A Nea User
  const user = await User.create({
    name,
    email,
    password
  });

  // Generate Token with User Id
  const token = generateToken(user._id);

  // Send back the User and Token in the response to the Client
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,// 30 days
    sameSite: "none", // cross-site access --> allow all third-party cookies
    secure: true // only send over HTTPS
  });

  if (user) {
    const { _id, name, email, role, photo, bio, isVerified } = user;

    // Status 201 Created
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid User Data." });
  }
});