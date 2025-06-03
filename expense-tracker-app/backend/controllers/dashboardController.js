const { Types } = require('mongoose');
const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const { month } = req.query;
    let monthStart = null;
    let monthEnd = null;

    if (month) {
      const [year, monthStr] = month.split('-');
      const parsedMonth = parseInt(monthStr) - 1;
      monthStart = new Date(Date.UTC(+year, parsedMonth, 1));
      monthEnd = new Date(Date.UTC(+year, parsedMonth + 1, 0, 23, 59, 59, 999));
    }

    const dateFilter = monthStart && monthEnd ? { date: { $gte: monthStart, $lte: monthEnd } } : {};

    // Total Income and Expense (month-aware)
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId, ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId, ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income in last 60 days or restricted month
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      ...(monthStart && monthEnd
        ? { date: { $gte: monthStart, $lte: monthEnd } }
        : { date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) } }),
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Expense in last 30 days or restricted month
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      ...(monthStart && monthEnd
        ? { date: { $gte: monthStart, $lte: monthEnd } }
        : { date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // All income/expense transactions (filtered if month param exists)
    const allIncome = await Income.find({ userId: userObjectId, ...dateFilter })
      .sort({ date: -1 }).lean();
    const allExpense = await Expense.find({ userId: userObjectId, ...dateFilter })
      .sort({ date: -1 }).lean();

    // Combine for recent 5
    const recentIncome = allIncome.slice(0, 5);
    const recentExpense = allExpense.slice(0, 5);

    const lastTransactions = [
      ...recentIncome.map(txn => ({ ...txn, type: 'income' })),
      ...recentExpense.map(txn => ({ ...txn, type: 'expense' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const allTransactions = [
      ...allIncome.map(txn => ({ ...txn, type: 'income' })),
      ...allExpense.map(txn => ({ ...txn, type: 'expense' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
      allTransactions: allTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error in getting Dashboard Data in backend.',
      error,
    });
  }
};

exports.deleteAllTransactions = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const userId = req.user.id;

    await Income.deleteMany({ userId });
    await Expense.deleteMany({ userId });

    res.status(200).json({ message: "All Income and Expense transactions deleted successfully." });
  } catch (error) {
    console.error('Error in deleting transactions backend: ', error);
    res.status(500).json({ message: "Failed to delete transaction backend.", error });
  }
};