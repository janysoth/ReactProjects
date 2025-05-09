const xlsx = require('xlsx');

const Income = require('../models/Income');

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation Check for missing fields
    if (!source || !amount || !date) {
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
      message: "Error in adding income source on the backend: ",
      error: error.message
    });
  }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching income sources on the backend: ",
      error: error.message
    });

  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income source not found." });
    }

    res.json({ message: "Income source deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting income source on the backend.",
      error: error.message
    });
  }
};

// Download Income Sources as Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // item.date
    }));

    // Convert to Excel format
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");

    res.download('income_details.xlsx');
  } catch (error) {
    res.status(500).json({
      message: "Error in downloading income sources as excel on the backend: ",
      error: error.message
    });

  }
};

// Update Income
exports.updateIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const { id } = req.params;

    const { icon, source, amount, date } = req.body;

    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({ message: "No income was found." });
    }

    // Check if the authenticated user is the owner of the Income (by userId)
    if (!income.userId || !income.userId.equals(userId)) {
      return res.status(401).json({ message: "Not authorized." });
    }

    // Update the income with the new data if provided or keep the old data
    income.icon = icon || income.icon;
    income.source = source || income.source;
    income.amount = amount || income.amount;
    income.date = date || income.date;

    await income.save();

    return res.status(200).json(income);
  } catch (error) {
    console.log("Error in updateIncome in incomeController backend: ", error.message);
    res.status(500).json(error.message);
  }
};