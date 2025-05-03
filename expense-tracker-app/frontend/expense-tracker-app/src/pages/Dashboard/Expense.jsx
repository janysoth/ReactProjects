import React, { useEffect } from 'react';

import DeleteAlert from '../../components/DeleteAlert';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import useExpense from '../../hooks/useExpense';
import { useUserAuth } from '../../hooks/useUserAuth';

const Expense = () => {
  useUserAuth();

  const {
    expenseData,
    openDeleteAlert,
    setOpenDeleteAlert,
    fetchExpenseDetails,
    handleAddExpense,
    handleDeleteExpense,
    handleDownloadExpenseDetails,
    onClose,
    openAddExpenseModal,
    setOpenAddExpenseModal,
  } = useExpense();

  useEffect(() => {
    fetchExpenseDetails();

    return () => { };
  }, [fetchExpenseDetails]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">

        </div>

        <div className="">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete={id => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpenseDetails}
        />

        <Modal
          isOpen={openAddExpenseModal}
          onClose={onClose}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} onClose={onClose} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;