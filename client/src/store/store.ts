import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import sensorReducer from '../features/sensors/sensorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sensors: sensorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
