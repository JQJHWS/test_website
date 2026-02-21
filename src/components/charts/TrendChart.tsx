import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendData } from '../../types';
import { getCategoryName } from '../../data/categories';

interface TrendChartProps {
  data: TrendData[];
  height?: number;
}

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const TrendChart: React.FC<TrendChartProps> = ({ data, height = 300 }) => {
  const categories = [...new Set(data.map(d => d.category))];
  
  const chartData = data.reduce((acc, curr) => {
    const existing = acc.find(d => d.date === curr.date);
    if (existing) {
      existing[curr.category] = curr.count;
    } else {
      acc.push({ date: curr.date, [curr.category]: curr.count });
    }
    return acc;
  }, [] as any[]);

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.slice(5)}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => [value, getCategoryName(name as any)]}
          />
          <Legend 
            formatter={(value) => getCategoryName(value as any)}
            wrapperStyle={{ fontSize: '12px' }}
          />
          {categories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
