import React from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import CustomPieChart from '../Charts/CustomPieChart';

// const COLORS = ["#875CF5", "#FA2c37", "#FF6900"];
const COLORS = ["purple", "green", "red"];

const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default FinanceOverview;