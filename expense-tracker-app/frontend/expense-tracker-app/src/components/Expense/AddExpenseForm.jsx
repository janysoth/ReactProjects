import React, { useEffect, useState } from 'react';

import { getTodayDate } from '../../utils/helper';
import FormButton from '../Button/FormButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const AddExpenseForm = ({ onAddExpense, onClose, initialData = {}, isEditMode = false }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: getTodayDate(),
    icon: '',
  });

  const expenseSources = ['Fixed Expense', 'Foods', 'Groceries', 'Shopping', 'Gas', 'Misc'];

  // Initialize form if editing
  useEffect(() => {
    if (isEditMode && initialData) {
      setExpense({
        category: initialData.category || '',
        description: initialData.description || '',
        amount: initialData.amount || '',
        date: initialData.date ? initialData.date.split('T')[0] : getTodayDate(),
        icon: initialData.icon || '',
        _id: initialData._id,
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  const isFormValid = expense.category.trim() !== "" && expense.amount.toString().trim() !== '';

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcons) => handleChange('icon', selectedIcons)}
      />

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className='block text-sm font-medium mb-1'>Expense Category</label>
        <select
          value={expense.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className='w-full border border-gray-300 round-md p-2'
        >
          <option>Select a category</option>
          {expenseSources.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Description Input */}
      <Input
        value={expense.description}
        onChange={e => handleChange('description', e.target.value)}
        label="Description"
        placeholder="Place your expense description here"
        type="text"
      />

      {/* Amount Input */}
      <Input
        value={expense.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="1000"
        type="number"
      />

      {/* Expense Date */}
      <Input
        value={expense.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <FormButton variant='danger' onClick={onClose}>
          Cancel
        </FormButton>

        <FormButton
          variant="primary"
          onClick={() => onAddExpense(expense)}
          disabled={!isFormValid}
        >
          {isEditMode ? 'UpdateExpense' : 'Add Expense'}
        </FormButton>
      </div>
    </div>
  );
};

export default AddExpenseForm;