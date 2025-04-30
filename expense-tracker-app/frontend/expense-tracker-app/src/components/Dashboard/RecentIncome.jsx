import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LuArrowRight, LuPlus } from 'react-icons/lu';

import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import AddIncomeForm from '../Income/AddIncomeForm';
import Modal from '../Modal';

const RecentIncome = ({ onSeeMore }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Fetch all income entries
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error in fetchIncomeDetails frontend:", error);
      toast.error("Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  };

  // Handle new income submission
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

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

      toast.success("Income added successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error in handleAddIncome frontend:",
        error.response?.data?.message || error.message
      );
      toast.error("Error in adding income");
    }
  };

  const onClose = () => setOpenAddIncomeModal(false);

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <div className="card relative">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading income data...</p>
          // Replace above with Skeleton component if you have one
        ) : incomeData?.length > 0 ? (
          incomeData.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment.utc(item.date).format("MMM Do YYYY")}
              amount={addThousandsSeparator(item.amount)}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No income records found.</p>
        )}
      </div>

      {/* Add Income Button */}
      <button
        onClick={() => setOpenAddIncomeModal(true)}
        disabled={loading}
        className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Add income"
      >
        <LuPlus className="text-xl" />
      </button>

      {/* Add Income Modal */}
      <Modal
        isOpen={openAddIncomeModal}
        onClose={onClose}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} onClose={onClose} />
      </Modal>
    </div>
  );
};

export default RecentIncome;