import moment from 'moment';
import React from 'react';
import { LuDownload } from 'react-icons/lu';

import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseList = ({ transactions, onDelete, onDownload, onEdit }) => {

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense Transactions</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            description={expense.description}
            icon={expense.icon}
            date={moment.utc(expense.date).format('MMM Do YYYY')}
            amount={addThousandsSeparator(expense.amount)}
            type="expense"
            onDelete={() => onDelete(expense._id)}
            onEdit={() => onEdit(expense)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;