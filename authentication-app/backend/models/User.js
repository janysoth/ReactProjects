const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required.']
  },

  email: {
    type: String,
    required: [true, 'Email is required.']
  },

  password: {
    type: String,
    required: [true, 'Password is required.']
  },

  profileImageUrl: {
    type: String,
    default: '',
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password was modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;