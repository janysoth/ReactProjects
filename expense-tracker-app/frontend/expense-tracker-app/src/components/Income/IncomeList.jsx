import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { LuDownload } from 'react-icons/lu';

import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import TransactionsFilter from '../Cards/TransactionsFilter';

const IncomeList = ({ transactions = [], onDelete, onDownload, onEdit }) => {
  const [selectedSource, setSelectedSource] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSource =
        selectedSource === 'all' || tx.source === selectedSource;

      const txDate = moment(tx.date);
      const matchStart = startDate ? txDate.isSameOrAfter(moment.utc(startDate)) : true;
      const matchEnd = endDate ? txDate.isSameOrBefore(moment.utc(endDate)) : true;

      return matchSource && matchStart && matchEnd;
    });
  }, [transactions, selectedSource, startDate, endDate]);

  const clearFilters = () => {
    setSelectedSource('all');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Income Transactions</h5>
        {filteredTransactions.length > 0 && (
          <button
            className="card-btn flex items-center gap-1"
            onClick={onDownload}
          >
            <LuDownload className="text-base" />
            <span className="text-sm">Download</span>
          </button>
        )}
      </div>

      <TransactionsFilter
        data={transactions}
        filterKey="source"
        selectedFilter={selectedSource}
        setSelectedFilter={setSelectedSource}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onClear={clearFilters}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((income) => (
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
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-6">
            No incomes match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;