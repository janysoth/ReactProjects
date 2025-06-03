const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { getDashboardData, deleteAllTransactions } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboardData);
router.delete("/delete-all", protect, deleteAllTransactions);

module.exports = router;