import React, { useEffect, useState } from 'react';

import FormButton from '../Button/FormButton';
import Input from '../Inputs/Input';
import Modal from '../Modal';

const EditIncomeModal = ({ isOpen, onClose, income, onSubmit }) => {
  const [form, setForm] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
    description: ''
  });

  useEffect(() => {
    if (income) {
      setForm({
        source: income.source || '',
        amount: income.amount || '',
        date: income.date ? income.date.split('T')[0] : '',
        icon: income.icon || '',
        description: income.description || '',
      });
    }
  }, [income]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.source || !form.amount || !form.date) return;
    onSubmit(income._id, form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Income">
      <div className="space-y-4">
        <Input name="source" value={form.source} onChange={handleChange} label="Source" />
        <Input name="description" value={form.description} onChange={handleChange} label="Description" />
        <Input name="amount" value={form.amount} onChange={handleChange} label="Amount" type="number" />
        <Input name="date" value={form.date} onChange={handleChange} label="Date" type="date" />
        <Input name="icon" value={form.icon} onChange={handleChange} label="Icon URL" />

        <FormButton variant='danger' onClick={onClose}>
          Cancel
        </FormButton>

        <FormButton variant='primary' onClick={handleSubmit}>
          Add Income
        </FormButton>
      </div>
    </Modal>
  );
};

export default EditIncomeModal;