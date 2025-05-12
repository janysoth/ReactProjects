
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

  const onCloseAddModal = () => setOpenAddIncomeModal(false);

  const onSubmitIncome = async (income) => {
    const success = await handleAddIncome(income);
    if (success) {
      onCloseAddModal();
      fetchIncomeDetails();
    }
  };

  const onCloseEditModal = () => {
    setShowEditModal(false);
    setEditIncome(null);
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

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={onCloseAddModal}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={onSubmitIncome} onClose={onCloseAddModal} />
        </Modal>

        {/* Confirm Delete Modal */}
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

        {/* Edit Income Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={onCloseEditModal}
          title="Edit Income"
        >
          <AddIncomeForm
            onAddIncome={
              (data) => {
                handleUpdateIncome(editIncome._id, data);
                onCloseEditModal();
              }
            }
            onClose={onCloseEditModal}
            initialData={editIncome}
            isEditMode={true}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;

