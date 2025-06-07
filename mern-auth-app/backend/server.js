const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

// App Set-up
const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // ✅ add PATCH here
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("MongoDB connection error: ", error);
  });

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});