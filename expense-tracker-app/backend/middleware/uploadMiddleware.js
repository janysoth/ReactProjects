const multer = require('multer');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  fileName: (req, file, cb) => {
    cb(null, `{Date.now()}-${file.originalname}`);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG and JPG are allowed."));
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // Limit file size to 50MB
  },
  fileFilter
});

module.exports = upload;