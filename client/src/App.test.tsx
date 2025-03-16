import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import Dashboard from './components/Dashboard';
import sensorsReducer from './features/sensors/sensorSlice';

test('renders dashboard', () => {
  const store = configureStore({
    reducer: {
      sensors: sensorsReducer,
    },
    preloadedState: {
      sensors: {
        data: [
          {
            _id: '67d5f759c562a48222864b81',
            temperature: 25,
            humidity: 60,
            moisture: 50,
            light: 100,
            timestamp: '2025-03-15T21:00:00.000Z',
            __v: 0,
          },
        ],
        loading: false,
        error: null,
      },
    },
  });

  render(
    React.createElement(Provider, {
      store,
      children: React.createElement(Dashboard),
    })
  );

  expect(
    screen.getByText(/"_id": "67d5f759c562a48222864b81"/i)
  ).toBeInTheDocument();
});
