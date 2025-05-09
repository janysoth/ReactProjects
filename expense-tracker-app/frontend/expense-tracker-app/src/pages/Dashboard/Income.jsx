
import React, { useEffect, useState } from 'react';

import DeleteAlert from '../../components/DeleteAlert';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeList from '../../components/Income/IncomeList';
import IncomeOverview from '../../components/Income/IncomeOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import useIncome from '../../hooks/useIncome';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [editIncome, setEditIncome] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    fetchIncomeDetails,
    incomeData,
    handleAddIncome,
    handleDeleteIncome,
    openDeleteAlert,
    setOpenDeleteAlert,
    handleDownloadIncomeDetails,
    handleUpdateIncome,
  } = useIncome();

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
  }, [fetchIncomeDetails]);

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
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEdit={(income) => {
              setEditIncome(income);
              setShowEditModal(true);
            }}
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

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditIncome(null);
          }}
          title="Edit Income"
        >
          <AddIncomeForm
            onAddIncome={
              (data) => {
                handleUpdateIncome(editIncome._id, data);
                setShowEditModal(false);
                setEditIncome(null);
              }
            }
            onClose={() => {
              setShowEditModal(false);
              setEditIncome(null);
            }}
            initialData={editIncome}
            isEditMode={true}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;

