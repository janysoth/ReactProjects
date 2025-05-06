import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import ExpenseContext from '../context/ExpenseContext';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosInstance';

const ExpenseProvider = ({ children }) => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.log('Error in fetchExpenseDetails:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Please enter a valid expense category");
      return false;
    }

    if (!amount.trim() || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return false;
    }

    if (!date) {
      toast.error("Please select a valid date");
      return false;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date, icon,
      });

      toast.success("Expense added successfully");

      await fetchExpenseDetails(); // ✅ ensure it finishes
      onClose(); // move this after the refetch
      return true; // ✅ tell the caller it was successful
    } catch (error) {
      console.log("Error in handleAddExpense:", error.response?.data?.message || error.message);
      toast.error("Error in adding expense");
      return false;
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Error in handleDeleteIncome backend:", error.response?.data?.message || error.message);
      toast.error("Error in deleting expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob', // important to handle binary files
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx'); // set desired file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // clean up and remove the link

      toast.success("Expense details downloaded successfully");
    } catch (error) {
      console.log("Error in handleDownloadExpenseDetails backend.",
        error.response?.data?.message || error.message
      );
    }
  };

  const onClose = () => setOpenAddExpenseModal(false);

  return (
    <ExpenseContext.Provider
      value={{
        expenseData,
        loading,
        openDeleteAlert,
        setOpenDeleteAlert,
        fetchExpenseDetails,
        handleAddExpense,
        handleDeleteExpense,
        handleDownloadExpenseDetails,
        openAddExpenseModal,
        setOpenAddExpenseModal,
        onClose
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;