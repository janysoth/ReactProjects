import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addThousandsSeparator } from '../../utils/helper';
import CustomLegend from './CustomLegend'; // Make sure you have this component

const COLORS = ['#875cf5', '#cfbefb', '#80d4ff', '#ffb677', '#7fe7c4', '#ffd36e'];

const CustomBarChart = ({ data }) => {

  const groupedData = useMemo(() => {
    const map = new Map();
    let total = 0;

    data.forEach((item, index) => {
      const color = COLORS[index % COLORS.length];
      total += item.amount;

      if (map.has(item.category)) {
        const existing = map.get(item.category);
        existing.amount += item.amount;
      } else {
        map.set(item.category, {
          name: item.category,
          amount: item.amount,
          color,
        });
      }
    });

    return Array.from(map.values()).map(item => ({
      ...item,
      percent: total > 0 ? ((item.amount / total) * 100).toFixed(1) : "0.0",
      formatted: `$${addThousandsSeparator(item.amount)}`,
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { category, source, amount } = payload[0].payload;

      return (
        <div role="tooltip" className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{category}</p>
          <p className="text-sm text-gray-600">
            <span className="text-xs font-semibold text-purple-800">{source}</span>
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${addThousandsSeparator(amount)}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No data available</p>;
  }

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={groupedData}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
          >
            {groupedData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Add legend below the chart */}
      <CustomLegend groupedData={groupedData} />
    </div>
  );
};

export default CustomBarChart;