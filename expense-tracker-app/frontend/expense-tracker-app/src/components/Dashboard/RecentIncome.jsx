import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LuArrowRight, LuPlus } from 'react-icons/lu';

import useIncome from '../../hooks/useIncome';
import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import AddIncomeForm from '../Income/AddIncomeForm';
import Modal from '../Modal';

const RecentIncome = ({ onSeeMore, refreshDashboard }) => {
  const {
    incomeData,
    loadingIncome,
    fetchIncomeDetails,
    handleAddIncome,
  } = useIncome();

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const onClose = () => setOpenAddIncomeModal(false);

  const onSubmitIncome = async (income) => {
    const success = await handleAddIncome(income);
    if (success) {
      onClose();
      fetchIncomeDetails();
      if (refreshDashboard) refreshDashboard();
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  });

  return (
    <div className="card relative">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {loadingIncome ? (
          <p>Loading...</p>
        ) : (
          incomeData?.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment.utc(item.date).format('MMM Do YYYY')}
              amount={addThousandsSeparator(item.amount)}
              type="income"
              hideDeleteBtn
            />
          ))
        )}
      </div>

      <button
        onClick={() => setOpenAddIncomeModal(true)}
        className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition"
        aria-label="Add income"
      >
        <LuPlus className="text-xl" />
      </button>

      <Modal isOpen={openAddIncomeModal} onClose={onClose} title="Add Income">
        <AddIncomeForm onAddIncome={onSubmitIncome} onClose={onClose} />
      </Modal>
    </div>
  );
};

export default RecentIncome;