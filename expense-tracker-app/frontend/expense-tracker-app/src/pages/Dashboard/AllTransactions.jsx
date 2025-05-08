
import React, { useEffect, useState } from 'react';

import { LuPlus, LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu';
import AddTransactionForm from '../../components/AllTransactions/AddTransactionForm';
import DeleteAlert from '../../components/DeleteAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import useExpense from '../../hooks/useExpense';
import useIncome from '../../hooks/useIncome';
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
  const [openAddModal, setOpenAddModal] = useState(false);

  const onClose = () => setOpenDeleteAlert({ show: false, data: null });

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

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

    return () => { };
  }, []);

  const {
    allTransactions = [],
  } = dashboardData || {};

  const { handleDeleteIncome } = useIncome();
  const { handleDeleteExpense } = useExpense();

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
      <div className="container mx-auto p-4 min-h-screen">
        <div className='flex justify-between items-center mb-6'>
          <h1 className="text-2xl font-bold mb-4"> All Transactions</h1>

          <button
            className="add-btn"
            onClick={() => setOpenAddModal(true)}
          >
            <LuPlus className='text-lg' />
            Add Transaction
          </button>

          <Modal
            isOpen={openAddModal}
            onClose={() => setOpenAddModal(false)}
            title="Add Transaction"
          >
            <AddTransactionForm
              onClose={() => setOpenAddModal(false)}
              onSuccess={fetchDashboardData}
            />
          </Modal>
        </div>

        {error && (
          <div className="text-center mb-4 text-red-500">
            {error}
          </div>
        )}

        <div className="finance-card">
          {groupedTransactions.length > 0 ? (
            <div>
              {groupedTransactions.map(({ date, transactions }) => (
                <div key={date} className="mb-6 last:mb-0">
                  <h2 className="font-medium text-gray-600 mb-2">{date}</h2>

                  <div className="space-y-2">
                    {transactions.map(transaction => {
                      const isExpense = !!transaction.category;

                      return (
                        <div
                          key={transaction._id}
                          className="group flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 flex ml-4 mr-4 items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                              {transaction.icon ? (
                                <img alt="transaction icon" src={transaction.icon} className="w-6 h-6" />
                              ) : (
                                <LuUtensils />
                              )}
                            </div>

                            <div>
                              <p className="font-medium m-2">
                                {isExpense ? transaction.category : transaction.source}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div
                              className={`${isExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                                } flex items-center gap-2 px-3 py-1.5 rounded-md`}
                            >
                              <h6 className="text-s font-medium">
                                {isExpense ? '-' : '+'}${Number(transaction.amount).toLocaleString()}
                              </h6>
                              {isExpense ? <LuTrendingDown /> : <LuTrendingUp />}
                            </div>

                            <button
                              aria-label={`Delete ${isExpense ? transaction.category : transaction.source}`}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              onClick={() => {
                                setOpenDeleteAlert({ show: true, data: transaction });
                                console.log(transaction._id);
                              }
                              }
                            >
                              <LuTrash2 />
                            </button>
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

      {/* Global Modal, rendered once */}
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={onClose}
        title="Delete Transaction"
      >
        <DeleteAlert
          content="Are you sure you want to delete this transaction?"
          onDelete={async () => {
            const transaction = openDeleteAlert.data;

            try {
              if (transaction.category) {
                console.log("Deleting Expense");
                await handleDeleteExpense(transaction._id);
              } else {
                console.log("Deleting Income");
                await handleDeleteIncome(transaction._id);
              }

              fetchDashboardData();
            } catch (error) {
              console.log("Error in deleting transaction in deleteAlert: ", error);
            } finally {
              onClose();
            }
          }}
          onClose={onClose}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default AllTransactions;