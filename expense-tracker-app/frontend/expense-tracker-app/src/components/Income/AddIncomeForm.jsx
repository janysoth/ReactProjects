import React, { useState } from 'react';
import FormButton from '../Button/FormButton';
import Input from '../Inputs/Input';

const getTodayDate = () => {
  const today = new Date();

  return today.toISOString().split('T')[0];
};

const AddIncomeForm = ({ onAddIncome, onClose }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: getTodayDate(),
    icon: '',
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  const isFormValid = income.source.trim() !== '' && income.amount.trim() !== '';

  return (
    <div>
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
        placeholder="MM/DD/YYYY"
        type="date"
      />

      <div className="flex justify-end mt-6">
        {/* <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button> */}
        <FormButton variant='danger' onClick={onClose}>
          Cancel
        </FormButton>

        <FormButton variant='primary' onClick={onAddIncome} disabled={!isFormValid}>
          Add Income
        </FormButton>
      </div>
    </div>
  );
};

export default AddIncomeForm;