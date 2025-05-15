import moment from 'moment';
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button
          className="card-btn"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type == 'expense' ? item.category : item.source}
            icon={item.icon}
            description={item.description}
            date={moment.utc(item.date).format("MMM Do YYYY")}
            amount={addThousandsSeparator(item.amount)}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;