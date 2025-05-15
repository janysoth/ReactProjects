
import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

import DeleteAlert from '../../components/DeleteAlert';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeList from '../../components/Income/IncomeList';
import IncomeOverview from '../../components/Income/IncomeOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import useIncome from '../../hooks/useIncome';
import { useUserAuth } from '../../hooks/useUserAuth';
// import { API_PATHS } from '../../utils/apiPath';
// import axiosInstance from '../../utils/axiosInstance';

const Income = () => {
  useUserAuth();

  // const [incomeData, setIncomeData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [openDeleteAlert, setOpenDeleteAlert] = useState({
  //   show: false,
  //   data: null,
  // });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const {
    fetchIncomeDetails,
    incomeData,
    handleAddIncome,
    handleDeleteIncome,
    openDeleteAlert,
    setOpenDeleteAlert,
    handleDownloadIncomeDetails
  } = useIncome();

  /** Get All Income Details **
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
     */

  /** Handle Add Income **
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
     */

  /** Delete Income **
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error in deleteIncome frontend: ",
        error.response?.data?.message
      );
      toast.error("Error in deleting income");
    }
  };
   */

  /** Handle Download Income Details **
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
      link.remove();

      toast.success("Download started");
    } catch (error) {
      console.log("Error in downloading income Excel file: ", error);
      toast.error("Failed to download income details");
    }
  };
   */

  const onClose = () => setOpenAddIncomeModal(false);

  const onSubmitIncome = async (income) => {
    const success = await handleAddIncome(income);
    if (success) {
      onClose();
      fetchIncomeDetails();
    }
  };

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

          <IncomeList
            transactions={incomeData}
            onDelete={id => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={onClose}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={onSubmitIncome} onClose={onClose} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;

