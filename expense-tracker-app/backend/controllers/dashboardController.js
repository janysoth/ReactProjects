const { isValidObjectId, Types } = require('mongoose');
const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total Incomes
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Fetch total Expenses
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Expense in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // All Income
    const allIncome = await Income.find({ userId: userObjectId })
      .sort({ date: -1 }).lean();

    // All Expense
    const allExpense = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 }).lean();

    // Last 5 transactions from both
    const recentIncome = await Income.find({ userId: userObjectId })
      .sort({ date: -1 }).limit(5).lean();
    const recentExpense = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 }).limit(5).lean();

    // All transactions
    const allTransactions = [
      ...allIncome.map(txn => ({ ...txn, type: 'income' })),
      ...allExpense.map(txn => ({ ...txn, type: 'expense' }))
    ];

    // Sort transactions by date
    const sortedAllTransactions = allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const lastTransactions = [
      ...recentIncome.map(txn => ({ ...txn, type: 'income' })),
      ...recentExpense.map(txn => ({ ...txn, type: 'expense' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    // Final Response
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
      allTransactions: sortedAllTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error in getting Dashboard Data in backend.',
      error,
    });
  }
};