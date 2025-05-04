import moment from 'moment';
import React from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Transactions</h5>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {transactions?.map((transaction) => (
          <TransactionInfoCard
            key={transaction._id}
            title={transaction?.source ? transaction.source : transaction?.category}
            icon={transaction.icon}
            date={moment.utc(transaction.date).format('MMM Do YYYY')}
            amount={addThousandsSeparator(transaction.amount)}
            type={transaction?.source ? 'income' : 'expense'}
            onDelete={() => onDelete(transaction._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;