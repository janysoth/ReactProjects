require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);
// mongoose.connect(process.env.MONGODB_URI);

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const admin = require("./firebase");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName)
    return res.status(400).json({ error: true, message: "Full Name is required." });

  if (!email)
    return res.status(400).json({ error: true, message: "Email is required." });

  if (!password)
    return res.status(400).json({ error: true, message: "Password is required." });

  const isUser = await User.findOne({ email: email });

  if (isUser) return res.json({
    error: true,
    message: "Email already exists."
  });

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user },
    process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email is required." });

  if (!password)
    return res.status(400).json({ message: "Password is required." });

  // Find the userInfo with the mongoDB database
  const userInfo = await User.findOne({ email: email });

  if (!userInfo)
    return res.status(400).json({ message: "User not found" });

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successfully",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials"
    });
  }
});

// Verify Firebase ID Token
const authenticateFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Google Login Endpoint
app.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    // Check if user exists in database, or create a new one
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullName: name,
        email: email,
        firebaseUid: uid,
      });
      await user.save();
    }

    // Generate your app's custom JWT if needed
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Google login successful",
    });
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!user) return res.status(401);

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      "_id": isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title)
    return res.status(400).json({
      error: true,
      message: "Title is required",
    });

  if (!content)
    return res.status(400).json({
      error: true,
      message: "Content is required",
    });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.status(201).json({
      error: false,
      note,
      message: "Note Added Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags)
    return res.status(400).json({
      error: true,
      message: "No changed provided"
    });

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (!note)
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({
      userId: user._id
    }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All Notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (!note)
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });

    await Note.deleteOne({
      _id: noteId,
      userId: user._id,
    });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }

});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (!note)
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });

    note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Search Notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query)
    return res.status(400).json({
      error: true,
      message: "Search query is required.",
    });

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(8000);

module.exports = app;