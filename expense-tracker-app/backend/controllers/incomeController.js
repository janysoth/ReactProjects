const User = require('../models/User');
const Income = require('../models/Income');

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation Check for missing fields
    if (!source || !amount) {
      return res.status(400).json({ message: 'Please fill all fields' });
    };

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date)
    });

    await newIncome.save();

    res.status(201).json({
      message: "Income source added successfully",
      newIncome
    });

  } catch (error) {
    res.status(500).json({
      message: "Error in adding income source: ",
      error: error.message
    });
  }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => { };

// Delete Income Source
exports.deleteIncome = async (req, res) => { };

// Download Income Sources as Excel
exports.downloadIncomeExcel = async (req, res) => { };