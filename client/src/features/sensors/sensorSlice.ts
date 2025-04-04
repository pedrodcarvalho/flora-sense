import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { SensorState } from '../../types/sensorTypes';

const API_URL = `${import.meta.env.VITE_API_URL}/sensors`;

const initialState: SensorState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchSensorData = createAsyncThunk(
  'sensors/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const sensorSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSensorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sensorSlice.reducer;
