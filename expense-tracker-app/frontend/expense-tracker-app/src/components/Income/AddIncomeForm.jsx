import React, { useEffect, useState } from 'react';
import FormButton from '../Button/FormButton';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const incomeSources = ['Salary', 'Freelance', 'Business', 'Investment', 'Transfer', 'Other'];

const AddIncomeForm = ({ onAddIncome, onClose, initialData = {}, isEditMode = false }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: getTodayDate(),
    icon: '',
    description: '',
  });

  // Initialize form if editing
  useEffect(() => {
    if (isEditMode && initialData) {
      setIncome({
        source: initialData.source || '',
        amount: initialData.amount || '',
        date: initialData.date ? initialData.date.split('T')[0] : getTodayDate(),
        icon: initialData.icon || '',
        description: initialData.description || '',
        _id: initialData._id, // include _id for PATCH request
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (key, value) => {
    setIncome(prev => ({ ...prev, [key]: value }));
  };

  const isFormValid = income.source.trim() !== '' && income.amount.toString().trim() !== '' && income.description.trim() !== '';

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      {/* Source Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Income Source</label>
        <select
          value={income.source}
          onChange={(e) => handleChange('source', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select a source</option>
          {incomeSources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      {/* Description Input */}
      <Input
        value={income.description}
        onChange={(e) => handleChange('description', e.target.value)}
        label="Description"
        placeholder="Place your income description here"
        type="text"
      />

      {/* Amount Input */}
      <Input
        value={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="1000"
        type="number"
      />

      {/* Date Input */}
      <Input
        value={income.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        type="date"
      />

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <FormButton variant="danger" onClick={onClose}>
          Cancel
        </FormButton>

        <FormButton variant="primary" onClick={() => onAddIncome(income)} disabled={!isFormValid}>
          {isEditMode ? 'Update Income' : 'Add Income'}
        </FormButton>
      </div>
    </div>
  );
};

export default AddIncomeForm;