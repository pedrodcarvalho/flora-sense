import React, { useState } from 'react';
import { useSensorData } from '../hooks/useSensorData';
import { ModeToggle } from './ModeToggle';
import { ChartCard } from './ChartCard';

const COLORS = ['#0088fe', '#ff7300', '#82ca9d', '#ffc658', '#8884d8'];
const TITLES = [
  'Temperatura',
  'Umidade',
  'Umidade do Solo',
  'Luminosidade',
  'Score',
];

export const Charts: React.FC = () => {
  const [mode, setMode] = useState<'websocket' | 'api'>('websocket');
  const { data, propsKeys, loading } = useSensorData(mode);

  return (
    <div>
      <ModeToggle mode={mode} setMode={setMode} />
      <div className="flex flex-wrap justify-center items-stretch gap-10 w-full overflow-x-auto pb-4">
        {TITLES.map((key, idx) => (
          <ChartCard
            key={propsKeys[idx] || key}
            title={TITLES[idx] || key}
            dataKey={propsKeys[idx] || key}
            data={data}
            color={COLORS[idx % COLORS.length]}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Charts;
