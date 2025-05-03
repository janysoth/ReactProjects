import React, { useEffect, useState } from 'react';
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import InfoCard from '../../components/Cards/InfoCard';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { addThousandsSeparator } from '../../utils/helper';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Error in fetchDashboardData frontend: ", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const {
    totalBalance = 0,
    totalIncome = 0,
    totalExpense = 0,
    recentTransactions = [],
    last30DaysExpenses = { transactions: [] },
    last60DaysIncome = { transactions: [] },
  } = dashboardData || {};

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandsSeparator(totalBalance)}
                color="bg-primary"
              />
              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value={addThousandsSeparator(totalIncome)}
                color="bg-green-500"
              />
              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addThousandsSeparator(totalExpense)}
                color="bg-red-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* <h2 className="col-span-full text-lg font-semibold">Recent Transactions</h2> */}
              <RecentTransactions
                transactions={recentTransactions}
                onSeeMore={() => navigate("/all-transactions")}
              />

              <FinanceOverview
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />

              {/* <h2 className="col-span-full text-lg font-semibold">Expense Transactions</h2> */}
              <ExpenseTransactions
                transactions={last30DaysExpenses.transactions}
                onSeeMore={() => navigate("/expense")}
                refreshDashboard={fetchDashboardData}
              />

              <Last30DaysExpenses
                data={last30DaysExpenses.transactions}
              />

              <RecentIncomeWithChart
                data={last60DaysIncome.transactions.slice(0, 4)}
                totalIncome={last60DaysIncome.total}
              />

              <RecentIncome
                transactions={last60DaysIncome.transactions}
                onSeeMore={() => navigate("/income")}
                refreshDashboard={fetchDashboardData}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;