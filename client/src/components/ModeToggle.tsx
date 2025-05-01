import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { ModeToggleProps } from '../types/chartTypes';

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => (
  <div className="flex justify-end mb-4">
    <ButtonGroup variant="outlined">
      <Button
        color="primary"
        onClick={() => setMode('websocket')}
        sx={{
          textTransform: 'none',
          ...(mode !== 'websocket' ? { backgroundColor: 'white' } : {}),
        }}
      >
        Tempo Real
      </Button>
      <Button
        color="primary"
        onClick={() => setMode('api')}
        sx={{
          textTransform: 'none',
          ...(mode !== 'api' ? { backgroundColor: 'white' } : {}),
        }}
      >
        1 Minuto
      </Button>
    </ButtonGroup>
  </div>
);
