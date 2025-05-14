import React, { useMemo } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor
}) => {
  console.log('Income Data:', data.map(item => item.name));
  const groupedData = useMemo(() => {
    const map = new Map();
    let total = 0;

    data.forEach((item, index) => {
      const color = colors[index % colors.length];
      total += item.amount;

      if (map.has(item.name)) {
        const existing = map.get(item.name);
        existing.amount += item.amount;
      } else {
        map.set(item.name, {
          name: item.name,
          amount: item.amount,
          color,
        });
      }
    });

    return Array.from(map.values()).map(item => ({
      ...item,
      percent: ((item.amount / total) * 100).toFixed(1),
      formatted: `$${item.amount.toLocaleString()}`
    })).sort((a, b) => b.amount - a.amount);
  }, [data, colors]);

  console.log('groupedData:', groupedData);

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={groupedData}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {groupedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          {/* Centered label */}
          {showTextAnchor && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="16px"
            >
              <tspan x="50%" dy="-10">{label}</tspan>
              <tspan x="50%" dy="24" fontSize="24px" fontWeight="bold">
                {totalAmount}
              </tspan>
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Legend placed outside the chart */}
      <CustomLegend groupedData={groupedData} />
    </div>
  );
};

export default CustomPieChart;