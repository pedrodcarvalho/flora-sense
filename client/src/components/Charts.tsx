import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useSensorData } from '../hooks/useSensorData';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ModeToggle } from './ModeToggle';
import { ChartCard } from './ChartCard';

const COLORS = ['#0088fe', '#ff7300', '#82ca9d', '#ffc658', '#8884d8'];
const TITLES = [
  'Temperatura',
  'Umidade',
  'Umidade do Solo',
  'Luminosidade',
  'Pontuação da Saúde',
];

export const Charts: React.FC = () => {
  const [mode, setMode] = useState<'websocket' | 'api'>('websocket');
  const { data, propsKeys, loading } = useSensorData(mode);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 mb-5 gap-4">
        <div>
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-950">
            Bem-vindo, {user?.firstName} {user?.lastName}!
          </h1>
          <Typography variant="body1" color="text.secondary">
            Aqui você consegue visualizar os dados da sua planta em tempo real.
          </Typography>
        </div>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>
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
