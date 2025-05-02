import React, { useState } from 'react';
import toast from 'react-hot-toast';
import IncomeContext from '../context/IncomeContext';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosInstance';

const IncomeProvider = ({ children }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      console.log('Error in fetchIncomeDetails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async ({ source, amount, date, icon }) => {
    if (!source.trim()) {
      toast.error("Please enter a valid income source");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon
      });

      toast.success("Income added successfully");
      fetchIncomeDetails();
      return true;
    } catch (error) {
      console.log("Error in handleAddIncome:", error.response?.data?.message || error.message);
      toast.error("Error in adding income");
      return false;
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error in handleDeleteIncome backend:", error.response?.data?.message || error.message);
      toast.error("Error in deleting income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob', // important to handle binary files
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx'); // set desired file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // clean up and remove the link

      toast.success("Income details downloaded successfully");
    } catch (error) {
      console.log("Error in handleDownloadIncomeDetails backend.",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        incomeData,
        loading,
        fetchIncomeDetails,
        handleAddIncome,
        handleDeleteIncome,
        openDeleteAlert,
        setOpenDeleteAlert,
        handleDownloadIncomeDetails
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export default IncomeProvider;