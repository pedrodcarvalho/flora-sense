import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import sensorReducer from '../features/sensors/sensorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  sensors: sensorReducer,
});

export default rootReducer;
