import React, { useEffect, useState } from 'react';
import FormButton from '../Button/FormButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const AddIncomeForm = ({ onAddIncome, onClose, initialData = {}, isEditMode = false }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: getTodayDate(),
    icon: '',
  });

  // Initialize form if editing
  useEffect(() => {
    if (isEditMode && initialData) {
      setIncome({
        source: initialData.source || '',
        amount: initialData.amount || '',
        date: initialData.date ? initialData.date.split('T')[0] : getTodayDate(),
        icon: initialData.icon || '',
        _id: initialData._id, // include _id for PATCH request
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (key, value) => {
    setIncome(prev => ({ ...prev, [key]: value }));
  };

  const isFormValid = income.source.trim() !== '' && income.amount.toString().trim() !== '';

  const handleSubmit = () => {
    onAddIncome(income);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={(e) => handleChange('source', e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="1000"
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6 gap-2">
        <FormButton variant="danger" onClick={onClose}>
          Cancel
        </FormButton>

        <FormButton variant="primary" onClick={handleSubmit} disabled={!isFormValid}>
          {isEditMode ? 'Update Income' : 'Add Income'}
        </FormButton>
      </div>
    </div>
  );
};

export default AddIncomeForm;