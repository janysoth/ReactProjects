import express from "express";

import { deleteUser, getAllUsers } from "../controllers/auth/adminController.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from "../controllers/auth/userController.js";
import { adminMiddleware, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

/* Admin Routes */

// Delete User
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

// Get all Users
router.get("/admin/users", protect, adminMiddleware, getAllUsers);



export default router;