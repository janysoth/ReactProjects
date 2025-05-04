import React, { useEffect, useState } from 'react';

import TransactionList from '../../components/AllTransactions/TransactionList';
import DeleteAlert from '../../components/DeleteAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';

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

  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className="my-5 mx-auto">
        <div className="grid grind-cols-1 gap-6">
          <TransactionList
            transactions={allTransactions}
            onDelete={id => setOpenDeleteAlert({ show: true, data: id })}
          />
        </div>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Transaction"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => { }}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default AllTransactions;