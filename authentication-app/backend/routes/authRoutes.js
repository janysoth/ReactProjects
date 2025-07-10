const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserProfile,
  forgotPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/getUser', protect, getUserInfo);
router.patch('/update-profile', protect, updateUserProfile);

router.post("/forgot-password", forgotPassword);

module.exports = router;