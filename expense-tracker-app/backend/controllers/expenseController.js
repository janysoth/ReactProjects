const xlsx = require('xlsx');

const Expense = require('../models/Expense');

// Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validation Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Please fill all fields' });
    };

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date)
    });

    await newExpense.save();

    res.status(201).json({
      message: "Expense source added successfully",
      newExpense
    });

  } catch (error) {
    res.status(500).json({
      message: "Error in adding expense source on the backend: ",
      error: error.message
    });
  }
};

// Get All Expense Sources
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching income sources on the backend: ",
      error: error.message
    });

  }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense source not found." });
    }

    res.json({ message: "Expense source deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting expense source on the backend.",
      error: error.message
    });
  }
};

// Download Expense Sources as Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // item.date
    }));

    // Convert to Excel format
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");

    res.download('expense_details.xlsx');
  } catch (error) {
    res.status(500).json({
      message: "Error in downloading income sources as excel on the backend: ",
      error: error.message
    });

  }
};

// Update Expense 
exports.updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const { id } = req.params;

    const { icon, category, amount, date } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "No expense was found." });
    };

    // Check if the authenticated user is the owner of the Expense (by userId)
    if (!expense.userId || !expense.userId.equals(userId)) {
      return res.status(401).json({ message: "Not authorized." });
    }

    // Update the income with the new data if provided or keep the old data
    expense.icon = icon || expense.icon;
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

    await expense.save();

    return res.status(200).json(expense);
  } catch (error) {
    console.log("Error in updateExpense in expenseController backend: ", error.message);
    res.status(500).json(error.message);
  }
};