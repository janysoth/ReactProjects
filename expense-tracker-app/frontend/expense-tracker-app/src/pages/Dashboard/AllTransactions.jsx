import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LuHandCoins,
  LuPencil,
  LuPlus,
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
  LuWalletMinimal
} from 'react-icons/lu';

import { IoMdCard } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AddTransactionForm from '../../components/AllTransactions/AddTransactionForm';
import InfoCard from '../../components/Cards/InfoCard';
import DeleteAlert from '../../components/DeleteAlert';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import DashboardSkeleton from '../../components/Skeletons/DashboardSkeleton';
import InfoCardSkeleton from '../../components/Skeletons/InfoCardSkeleton';
import useExpense from '../../hooks/useExpense';
import useIncome from '../../hooks/useIncome';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { addThousandsSeparator, groupTransactionsByDate } from '../../utils/helper';

const AllTransactions = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editIncome, setEditIncome] = useState(null);
  const [editExpense, setEditExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const onClose = () => setOpenDeleteAlert({ show: false, data: null });
  const onCloseEditModal = () => {
    setShowEditModal(false);
    setEditIncome(null);
    setEditExpense(null);
    fetchDashboardData();
  };

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA, {
        params: selectedMonth ? { month: selectedMonth } : {},
      });

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
  }, [selectedMonth]);

  const {
    allTransactions = [],
    totalIncome = 0,
    totalExpense = 0,
    totalBalance = 0,
  } = dashboardData || {};
  const { handleDeleteIncome, handleUpdateIncome } = useIncome();
  const { handleDeleteExpense, handleUpdateExpense } = useExpense();
  const groupedTransactions = groupTransactionsByDate(allTransactions);

  // Helper to safely parse YYYY-MM format
  const parseMonthString = (monthString) => {
    const [year, month] = monthString.split('-').map(Number);
    return new Date(year, month - 1); // month is 0-based
  };

  const navigate = useNavigate();

  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className="container mx-auto p-4 min-h-screen">
        <div className="info-banner sticky top-18 pt-2 z-20 bg-gray-50">
          <div className='all-transactions-header flex justify-between items-center mb-6'>
            <h1 className="text-2xl font-bold mb-4"> All Transactions</h1>

            <div className="flex gap-4 items-center">
              <DatePicker
                selected={selectedMonth ? parseMonthString(selectedMonth) : null}
                onChange={(date) => {
                  const formatted = format(date, 'yyyy-MM');
                  setSelectedMonth(formatted);
                }}
                dateFormat="MMM-yyyy"
                showMonthYearPicker
                className="text-s px-2 py-1 rounded-md border w-[140px] text-center"
                placeholderText='Filter by Month'
              />

              {selectedMonth && (
                <button
                  onClick={() => setSelectedMonth('')}
                  className="text-sm text-blue-500 hover:underline cursor-pointer"
                >
                  Clear Filter
                </button>
              )}

              <button
                className="add-btn"
                onClick={() => setOpenAddModal(true)}
              >
                <LuPlus className='text-lg' />
                Add Transaction
              </button>
            </div>
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

          <div className="my-5 mx-auto">
            {loading ? (
              <InfoCardSkeleton />
            ) : error ? (
              <p className="text-center text-red-500 py-10">
                {error}
                <button onClick={fetchDashboardData} className="ml-2 text-blue-600 underline cursor-pointer">Retry</button>
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfoCard
                    icon={<LuWalletMinimal />}
                    label="Total Income"
                    value={addThousandsSeparator(totalIncome)}
                    color="bg-green-500"
                    onClick={() => navigate("/income")}
                  />
                  <InfoCard
                    icon={<LuHandCoins />}
                    label="Total Expense"
                    value={addThousandsSeparator(totalExpense)}
                    color="bg-red-500"
                    onClick={() => navigate("/expense")}
                  />
                  <InfoCard
                    icon={<IoMdCard />}
                    label="Total Balance"
                    value={addThousandsSeparator(totalBalance)}
                    color="bg-primary"
                    onClick={() => navigate("/all-transactions")}
                  />
                </div>
              </>
            )}
          </div>
        </div>

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
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {isExpense ? transaction.category : transaction.source}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div
                              className={`${isExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'} flex items-center gap-2 px-3 py-1.5 rounded-md`}
                            >
                              <h6 className="text-s font-medium">
                                {isExpense ? '-' : '+'}${Number(transaction.amount).toLocaleString()}
                              </h6>
                              {isExpense ? <LuTrendingDown /> : <LuTrendingUp />}
                            </div>

                            <button
                              aria-label="Edit Transaction"
                              className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                              onClick={() => {
                                setShowEditModal(true);
                                if (isExpense) setEditExpense(transaction);
                                else setEditIncome(transaction);
                              }}
                            >
                              <LuPencil />
                            </button>

                            <button
                              aria-label={`Delete ${isExpense ? transaction.category : transaction.source}`}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              onClick={() => {
                                setOpenDeleteAlert({ show: true, data: transaction });
                                console.log(transaction._id);
                              }}
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

      {/* Delete Modal */}
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
                await handleDeleteExpense(transaction._id);
              } else {
                await handleDeleteIncome(transaction._id);
              }
              fetchDashboardData();
            } catch (error) {
              console.log("Error deleting transaction:", error);
            } finally {
              onClose();
            }
          }}
          onClose={onClose}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={onCloseEditModal}
        title="Edit Transaction"
      >
        {editExpense && (
          <AddExpenseForm
            initialData={editExpense}
            onClose={onCloseEditModal}
            onAddExpense={(data) => {
              handleUpdateExpense(editExpense._id, data);
              onCloseEditModal();
            }}
            isEditMode={true}
          />
        )}
        {editIncome && (
          <AddIncomeForm
            initialData={editIncome}
            onClose={onCloseEditModal}
            onAddIncome={(data) => {
              handleUpdateIncome(editIncome._id, data);
              onCloseEditModal();
            }}
            isEditMode={true}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AllTransactions;