import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeOverview from '../../components/Income/IncomeOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      };
    } catch (error) {
      console.log("Error in fetchIncomeDetails frontend: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation Checks
    if (!source.trim()) {
      toast.error("Please enter a valid income source");
      return;
    }

    if (!amount.trim() || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a valid date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();

    } catch (error) {
      console.log("Error in handleAddIncome frontend: ",
        error.response?.data?.message || error.message
      );
      toast.error("Error in adding income");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => { };

  // Handle Download Income Details
  const handleDownloadIncomeDetails = async () => { };

  const onClose = () => setOpenAddIncomeModal(false);

  useEffect(() => {
    fetchIncomeDetails();

    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={onClose}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} onClose={onClose} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;

