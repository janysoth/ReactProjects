import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardSummary from '../../components/Dashboard/DashboardSummary';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import DashboardSkeleton from '../../components/Skeletons/DashboardSkeleton';
import { useDashboard } from '../../hooks/useDashboard';
import { useUserAuth } from '../../hooks/useUserAuth';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const {
    dashboardData,
    loading,
    error,
    refreshDashboard,
  } = useDashboard();

  const {
    totalBalance = 0,
    totalIncome = 0,
    totalExpense = 0,
    recentTransactions = [],
    last30DaysExpenses = { transactions: [] },
    last60DaysIncome = { transactions: [] },
  } = dashboardData || {};

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {loading ? (
          <DashboardSkeleton />
        ) : error ? (
          <p className="text-center text-red-500 py-10">
            {error}
            <button onClick={refreshDashboard} className="ml-2 text-blue-600 underline cursor-pointer">Retry</button>
          </p>
        ) : (
          <>
            <DashboardSummary
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              totalBalance={totalBalance}
              navigate={navigate}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentTransactions
                transactions={recentTransactions}
                onSeeMore={() => navigate("/all-transactions")}
              />
              <FinanceOverview
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />
              <ExpenseTransactions
                transactions={last30DaysExpenses.transactions}
                onSeeMore={() => navigate("/expense")}
                refreshDashboard={refreshDashboard}
              />
              <Last30DaysExpenses data={last30DaysExpenses.transactions} />
              <RecentIncomeWithChart
                data={last60DaysIncome.transactions}
                totalIncome={last60DaysIncome.total}
              />
              <RecentIncome
                transactions={last60DaysIncome.transactions}
                onSeeMore={() => navigate("/income")}
                refreshDashboard={refreshDashboard}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;