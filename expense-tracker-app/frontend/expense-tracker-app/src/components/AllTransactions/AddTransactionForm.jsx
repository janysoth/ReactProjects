import React, { useState } from 'react';
import useExpense from '../../hooks/useExpense';
import useIncome from '../../hooks/useIncome';
import AddExpenseForm from '../Expense/AddExpenseForm';
import AddIncomeForm from '../Income/AddIncomeForm';

const AddTransactionForm = ({ onClose, onSuccess }) => {
  const [type, setType] = useState(null); // 'income' or 'expense'

  const { handleAddIncome } = useIncome();
  const { handleAddExpense } = useExpense();

  const onSubmitIncome = async (income) => {
    await handleAddIncome(income);

    if (onSuccess)
      onSuccess();
    onClose();
  };

  const onSubmitExpense = async (expense) => {
    await handleAddExpense(expense);

    if (onSuccess)
      onSuccess();
    onClose();
  };

  const handleReset = () => {
    setType(null);
  };

  return (
    <div className="p-4">
      {!type ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">What type of transaction would you like to add?</h2>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded hover:bg-green-200 cursor-pointer"
              onClick={() => setType('income')}
            >
              Add Income
            </button>
            <button
              className="px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded hover:bg-red-200 cursor-pointer"
              onClick={() => setType('expense')}
            >
              Add Expense
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <button
              className="text-sm text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={handleReset}
            >
              ← Choose another type
            </button>
          </div>
          {type === 'income' ?
            <AddIncomeForm onAddIncome={onSubmitIncome} onClose={onClose} />
            : <AddExpenseForm onAddExpense={onSubmitExpense} onClose={onClose} />}
        </div>
      )}
    </div>
  );
};

export default AddTransactionForm;