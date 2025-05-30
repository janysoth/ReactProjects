import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { LuDownload } from 'react-icons/lu';

import { addThousandsSeparator } from '../../utils/helper';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseList = ({ transactions = [], onDelete, onDownload, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((tx) => tx.category));
    return ['all', ...Array.from(unique)];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchCategory =
        selectedCategory === 'all' || tx.category === selectedCategory;

      const txDate = moment(tx.date);
      const matchStart = startDate ? txDate.isSameOrAfter(moment.utc(startDate)) : true;
      const matchEnd = endDate ? txDate.isSameOrBefore(moment.utc(endDate)) : true;

      return matchCategory && matchStart && matchEnd;
    });
  }, [transactions, selectedCategory, startDate, endDate]);

  const hasExpenses = filteredTransactions.length > 0;

  const clearFilters = () => {
    setSelectedCategory('all');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Expense Transactions</h5>
        {hasExpenses && (
          <button
            className="card-btn flex items-center gap-1"
            onClick={onDownload}
            title="Download filtered expenses"
          >
            <LuDownload className="text-base" />
            <span className="text-sm">Download</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div
        className={`grid gap-4 items-end mb-6 ${startDate || endDate || selectedCategory !== 'all' ? 'md:grid-cols-4' : 'md:grid-cols-3'
          } grid-cols-1`}
      >
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-muted-foreground">Category</label>
          <select
            className="input cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-muted-foreground">Start Date</label>
          <input
            type="date"
            className="input cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-muted-foreground">End Date</label>
          <input
            type="date"
            className="input cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Clear Filter Button */}
        {(startDate || endDate || selectedCategory !== 'all') && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium invisible">Clear</label>
            <button
              onClick={clearFilters}
              className="h-10 px-4 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Expense Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {hasExpenses ? (
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