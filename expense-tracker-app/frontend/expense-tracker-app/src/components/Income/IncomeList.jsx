import moment from 'moment';
import React from 'react';
import { LuDownload } from 'react-icons/lu';

import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const IncomeList = ({ transactions, onDelete, onDownload, onEdit }) => {

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Transactions</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            description={income.description}
            icon={income.icon}
            date={moment.utc(income.date).format('MMM Do YYYY')}
            amount={addThousandsSeparator(income.amount)}
            type="income"
            onDelete={() => onDelete(income._id)}
            onEdit={() => onEdit(income)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;