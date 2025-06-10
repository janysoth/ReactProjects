const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Environment checks
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// App setup
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error);
  });

// Routes
app.use("/api/auth", authRoutes);
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Server start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});