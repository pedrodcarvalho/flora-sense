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
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
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
    <Card
      sx={{
        flexGrow: 1,
        minWidth: '400px',
        maxWidth: '448px',
        width: '100%',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      elevation={2}
    >
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 1,
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
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
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
