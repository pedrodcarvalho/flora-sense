import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CircularProgress } from '@mui/material';
import { Props } from '../types/chartTypes';

export const ChartCard: React.FC<Props> = ({
  title,
  dataKey,
  data,
  color,
  loading,
}) => {
  const getYAxisProps = () => {
    if (/humidity|moisture|score/i.test(dataKey)) return { domain: [0, 100] };
    if (/temperature|light/i.test(dataKey) && data.length) {
      const vals = data.map((d) => +d[dataKey]).filter((v) => !isNaN(v));
      const min = Math.min(...vals),
        max = Math.max(...vals);
      return { domain: [min - 1, max + 1] };
    }
    return {};
  };

  return (
    <div className="basis-0 grow min-w-[400px] max-w-md w-full h-[300px] bg-white rounded-xl shadow-md p-4 flex flex-col relative">
      <h2 className="text-lg font-bold text-center mb-2 capitalize text-gray-700">
        {title}
      </h2>
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 25, left: 10 }}>
            <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} {...getYAxisProps()} />
            <CartesianGrid strokeDasharray={10} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={0}
            />
          </LineChart>
        </ResponsiveContainer>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <CircularProgress color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};
