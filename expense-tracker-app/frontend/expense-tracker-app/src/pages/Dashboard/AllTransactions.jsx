import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LuPencil,
  LuPlus,
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import AddTransactionForm from '../../components/AllTransactions/AddTransactionForm';
import DashboardSummary from '../../components/Dashboard/DashboardSummary';
import DeleteAlert from '../../components/DeleteAlert';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import InfoCardSkeleton from '../../components/Skeletons/InfoCardSkeleton';
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

  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      const params = selectedMonth ? { month: selectedMonth } : {};
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA, { params });
      if (response.data) setDashboardData(response.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
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

  // Group then flatten for pagination
  const grouped = groupTransactionsByDate(allTransactions);
  const flattened = grouped.flatMap(({ date, transactions }) =>
    transactions.map(tx => ({ ...tx, groupDate: date }))
  );
  const totalPages = Math.ceil(flattened.length / itemsPerPage);
  const paginated = flattened.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const regrouped = paginated.reduce((acc, tx) => {
    (acc[tx.groupDate] ??= []).push(tx);
    return acc;
  }, {});

  // Helper for date picker
  const parseMonthString = ms => {
    const [y, m] = ms.split('-').map(Number);
    return new Date(y, m - 1);
  };

  const navigate = useNavigate();

  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className="container mx-auto p-4 min-h-screen">
        {/* HEADER & FILTER */}
        <div className="info-banner sticky top-18 pt-2 z-20 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Transactions</h1>
            <div className="flex gap-4 items-center">
              {allTransactions.length > 0 && (
                <DatePicker
                  selected={selectedMonth ? parseMonthString(selectedMonth) : null}
                  onChange={date => setSelectedMonth(format(date, 'yyyy-MM'))}
                  dateFormat="MMM-yyyy"
                  showMonthYearPicker
                  className="px-2 py-1 rounded-md border w-[140px] text-center"
                  placeholderText="Filter by Month"
                />
              )}
              {selectedMonth && (
                <button
                  onClick={() => setSelectedMonth('')}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Clear Filter
                </button>
              )}
              <button className="add-btn" onClick={() => setOpenAddModal(true)}>
                <LuPlus className="text-lg" /> Add Transaction
              </button>
            </div>
            <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} title="Add Transaction">
              <AddTransactionForm onClose={() => setOpenAddModal(false)} onSuccess={fetchDashboardData} />
            </Modal>
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div className="my-5 mx-auto">
            {loading ? (
              <InfoCardSkeleton />
            ) : error ? (
              <p className="text-red-500 text-center py-10">
                {error}{' '}
                <button onClick={fetchDashboardData} className="text-blue-600 underline">
                  Retry
                </button>
              </p>
            ) : (
              <DashboardSummary
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalBalance={totalBalance}
                navigate={navigate}
              />
            )}
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="finance-card">
          {flattened.length > 0 ? (
            <>
              {Object.entries(regrouped).map(([date, transactions]) => (
                <div key={date} className="mb-6">
                  <h2 className="font-medium text-gray-600 mb-2">{date}</h2>
                  <div className="space-y-2">
                    {transactions.map(tx => {
                      const isExpense = Boolean(tx.category);
                      return (
                        <div
                          key={tx._id}
                          className="group flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 flex ml-4 mr-4 items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                              {tx.icon ? <img alt="icon" src={tx.icon} className="w-6 h-6" /> : <LuUtensils />}
                            </div>
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {isExpense ? tx.category : tx.source}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`${isExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'} flex items-center gap-2 px-3 py-1.5 rounded-md`}>
                              <h6 className="text-s font-medium">
                                {isExpense ? '-' : '+'}${Number(tx.amount).toLocaleString()}
                              </h6>
                              {isExpense ? <LuTrendingDown /> : <LuTrendingUp />}
                            </div>
                            <button
                              aria-label="Edit Transaction"
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                setShowEditModal(true);
                                isExpense ? setEditExpense(tx) : setEditIncome(tx);
                              }}
                            >
                              <LuPencil />
                            </button>
                            <button
                              aria-label="Delete Transaction"
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setOpenDeleteAlert({ show: true, data: tx })}
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
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No Transactions to display.</p>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      <Modal isOpen={openDeleteAlert.show} onClose={onClose} title="Delete Transaction">
        <DeleteAlert
          content="Are you sure you want to delete this transaction?"
          onDelete={async () => {
            const tx = openDeleteAlert.data;
            try {
              tx.category
                ? await handleDeleteExpense(tx._id)
                : await handleDeleteIncome(tx._id);
              fetchDashboardData();
            } catch (e) {
              console.error('Error deleting:', e);
            } finally {
              onClose();
            }
          }}
          onClose={onClose}
        />
      </Modal>

      {/* EDIT MODAL */}
      <Modal isOpen={showEditModal} onClose={onCloseEditModal} title="Edit Transaction">
        {editExpense && (
          <AddExpenseForm
            initialData={editExpense}
            isEditMode
            onAddExpense={data => {
              handleUpdateExpense(editExpense._id, data);
              onCloseEditModal();
            }}
            onClose={onCloseEditModal}
          />
        )}
        {editIncome && (
          <AddIncomeForm
            initialData={editIncome}
            isEditMode
            onAddIncome={data => {
              handleUpdateIncome(editIncome._id, data);
              onCloseEditModal();
            }}
            onClose={onCloseEditModal}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AllTransactions;