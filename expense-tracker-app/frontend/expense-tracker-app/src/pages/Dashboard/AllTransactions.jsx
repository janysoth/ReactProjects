import React, { useEffect, useState } from 'react';

import { LuArrowDownRight, LuArrowUpRight } from 'react-icons/lu';
import TransactionList from '../../components/AllTransactions/TransactionList';
import DeleteAlert from '../../components/DeleteAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { groupTransactionsByDate } from '../../utils/helper';

const AllTransactions = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const onClose = () => setOpenDeleteAlert({ show: false, data: null });

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
    allTransactions = [],
  } = dashboardData || {};

  const groupedTransactions = groupTransactionsByDate(allTransactions);

  // return (
  //   <DashboardLayout activeMenu="All Transactions">
  //     <div className="my-5 mx-auto">
  //       <div className="grid grind-cols-1 gap-6">
  //         <TransactionList
  //           transactions={allTransactions}
  //           onDelete={id => setOpenDeleteAlert({ show: true, data: id })}
  //         />
  //       </div>

  //       <Modal
  //         isOpen={openDeleteAlert.show}
  //         onClose={() => setOpenDeleteAlert({ show: false, data: null })}
  //         title="Delete Transaction"
  //       >
  //         <DeleteAlert
  //           content="Are you sure you want to delete this income?"
  //           onDelete={() => { }}
  //           onClose={() => setOpenDeleteAlert({ show: false, data: null })}
  //         />
  //       </Modal>
  //     </div>
  //   </DashboardLayout>
  // );

  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>

        <div className="finance-card">
          {groupedTransactions.length > 0 ? (
            <div>
              {groupedTransactions.map(({ date, transactions }) => (
                <div key={date} className="mb-6 last:mb-0">
                  <h2 className="font-medium text-gray-600 mb-2">{date}</h2>

                  <div className="space-y-2">
                    {transactions.map(transaction => {
                      const isExpense = transaction.category;

                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 bg-white border rounded-md hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-full mr-4`}
                            >
                              <img alt='transaction icon' src={transaction.icon} className="w-6 h-6" />
                            </div>

                            <div>
                              <p className="font-medium">{isExpense ? transaction.category : transaction.source}</p>
                            </div>
                          </div>
                          <div className={`font-semibold ${isExpense ? 'expense' : 'income'}`}>
                            {isExpense ? '-' : '+'} ${transaction.amount}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No Transactions to display.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllTransactions;