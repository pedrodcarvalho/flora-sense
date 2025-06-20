import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
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
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mx: 7.5,
          mb: 7.5,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.875rem', sm: '2.25rem', lg: '3rem' },
              color: 'grey.900',
            }}
          >
            Bem-vindo, {user?.firstName} {user?.lastName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aqui você consegue visualizar os dados da sua planta em tempo real.
          </Typography>
        </Box>
        <ModeToggle mode={mode} setMode={setMode} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 5,
          width: '100%',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default Charts;
