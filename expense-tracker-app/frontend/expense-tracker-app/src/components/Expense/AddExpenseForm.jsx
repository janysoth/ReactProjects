import React, { useState } from 'react';

import { getTodayDate } from '../../utils/helper';
import FormButton from '../Button/FormButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const AddExpenseForm = ({ onAddExpense, onClose }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: getTodayDate(),
    icon: '',
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  const isFormValid = expense.category.trim() !== "" && expense.amount.trim() !== '';

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcons) => handleChange('icon', selectedIcons)}
      />

      <Input
        value={expense.category}
        onChange={(e) => handleChange('category', e.target.value)}
        label="Expense Category"
        placeholder="Food, Transport, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="1000"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        placeholder="MM/DD/YYYY"
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
          Add Expense
        </FormButton>
      </div>
    </div>
  );
};

export default AddExpenseForm;