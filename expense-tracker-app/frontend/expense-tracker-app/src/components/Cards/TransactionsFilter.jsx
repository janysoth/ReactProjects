import React, { useMemo } from 'react';

const TransactionFilter = ({
  data = [],
  filterKey = 'category',
  selectedFilter,
  setSelectedFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClear
}) => {
  const options = useMemo(() => {
    const unique = new Set(data.map((tx) => tx[filterKey]));
    return ['all', ...Array.from(unique)];
  }, [data, filterKey]);

  const showClear =
    selectedFilter !== 'all' || startDate !== '' || endDate !== '';

  return (
    <div
      className={`grid gap-4 items-end ${showClear ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'
        } mb-4`}
    >
      {/* Options Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-muted-foreground">{filterKey === 'category' ? 'Category' : 'Source'}</label>
        <select
          className="input h-[42px] cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'all' ? 'All' : opt}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-muted-foreground">Start Date</label>
        <input
          type="date"
          className="input h-[42px] cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-muted-foreground">End Date</label>
        <input
          type="date"
          className="input h-[42px] cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {showClear && (
        <button
          onClick={onClear}
          className="h-[42px] px-4 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors cursor-pointer"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default TransactionFilter;