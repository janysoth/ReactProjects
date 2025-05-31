import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { LuDownload } from 'react-icons/lu';

import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import TransactionsFilter from '../Cards/TransactionsFilter';

const ExpenseList = ({ transactions = [], onDelete, onDownload, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchCategory =
        selectedCategory === 'all' || tx.category === selectedCategory;

      const txDate = moment(tx.date);
      const matchStart = startDate ? txDate.isSameOrAfter(moment(startDate)) : true;
      const matchEnd = endDate ? txDate.isSameOrBefore(moment(endDate)) : true;

      return matchCategory && matchStart && matchEnd;
    });
  }, [transactions, selectedCategory, startDate, endDate]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Expense Transactions</h5>
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
        filterKey="category"
        selectedFilter={selectedCategory}
        setSelectedFilter={setSelectedCategory}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onClear={clearFilters}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((expense) => (
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
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-6">
            No expenses match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;