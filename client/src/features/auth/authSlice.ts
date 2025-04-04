import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { AuthState } from '../../types/authTypes.ts';

const AUTH_URL = `${import.meta.env.VITE_API_URL}/auth`;

// Get user from local storage
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState: AuthState = {
  user,
  loading: false,
  error: null,
};

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_URL}/register`, userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Logout
export const logoutUser = () => {
  localStorage.removeItem('user');
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = logoutUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
