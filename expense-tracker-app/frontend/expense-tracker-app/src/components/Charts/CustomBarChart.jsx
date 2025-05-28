import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addThousandsSeparator } from '../../utils/helper';
import CustomLegend from './CustomLegend';

// Define your desired color palette
const COLORS = ["#875cf5", "#cfbefb", "#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#FF6666"];

const CustomBarChart = ({ data, groupBy = 'source' }) => {
  // Group data by 'groupBy' key (default to 'name')
  const groupedData = useMemo(() => {
    const map = new Map();
    let total = 0;

    data.forEach((item, index) => {
      const key = item[groupBy];
      const color = COLORS[index % COLORS.length];
      total += item.amount;

      if (map.has(key)) {
        const existing = map.get(key);
        existing.amount += item.amount;
      } else {
        map.set(key, {
          name: key,
          amount: item.amount,
          color,
        });
      }
    });

    return Array.from(map.values()).map(item => ({
      ...item,
      percent: total > 0 ? ((item.amount / total) * 100).toFixed(1) : "0.0",
      formatted: `$${addThousandsSeparator(item.amount)}`
    }));
  }, [data, groupBy]);

  // Tooltip to show detailed info
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, amount } = payload[0].payload;

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{name}</p>
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

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={groupedData}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {groupedData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Bottom legend */}
      <CustomLegend groupedData={groupedData} />
    </div>
  );
};

export default CustomBarChart;