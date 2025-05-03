import moment from 'moment';
import React, { useEffect } from 'react';
import { LuArrowRight, LuPlus } from 'react-icons/lu';

import useExpense from '../../hooks/useExpense';
import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import AddExpenseForm from '../Expense/AddExpenseForm';
import Modal from '../Modal';

const ExpenseTransactions = ({ onSeeMore, refreshDashboard }) => {
  const {
    expenseData,
    loadingExpense,
    fetchExpenseDetails,
    handleAddExpense,
    openAddExpenseModal,
    setOpenAddExpenseModal,
    onClose,
  } = useExpense();

  const onSubmitExpense = async (expense) => {
    const success = await handleAddExpense(expense);
    if (success) {
      if (refreshDashboard) refreshDashboard();
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <div className="card relative">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button
          className='card-btn'
          onClick={onSeeMore}
        >
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className="mt-6">
        {loadingExpense ? (
          <p>Loading...</p>
        ) : (
          expenseData?.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.category}
              icon={item.icon}
              date={moment.utc(item.date).format('MMM Do YYYY')}
              amount={addThousandsSeparator(item.amount)}
              type="expense"
              hideDeleteBtn
            />
          ))
        )}
      </div>

      <button
        onClick={() => setOpenAddExpenseModal(true)}
        className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition"
        aria-label="Add Expense"
      >
        <LuPlus className='text-xl' />
      </button>

      <Modal isOpen={openAddExpenseModal} onClose={onClose} title="Add Expense">
        <AddExpenseForm onAddExpense={onSubmitExpense} onClose={onClose} />
      </Modal>
    </div>
  );
};

export default ExpenseTransactions;