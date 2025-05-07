import { useEffect, useRef } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface BarChartProps {
  data: { name: string; value: number }[];
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function BarChart({ data, color = 'primary' }: BarChartProps) {
  const getColorForVariant = (colorVariant: string): string => {
    switch (colorVariant) {
      case 'primary':
        return '#2196F3';
      case 'secondary':
        return '#009688';
      case 'success':
        return '#4CAF50';
      case 'warning':
        return '#FFC107';
      case 'danger':
        return '#FF5722';
      default:
        return '#2196F3';
    }
  };
  
  const colorCode = getColorForVariant(color);
  
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
        <span className="material-icons mr-2">insert_chart</span>
        No data available
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          formatter={(value: number) => [`${value}`, 'Value']}
          contentStyle={{ 
            fontSize: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            border: 'none'
          }}
        />
        <Bar dataKey="value" fill={colorCode} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
