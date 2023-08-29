import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isEmailConfirmed: false,
  loading: false,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/auth/confirm/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/google-login', { tokenId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(confirmEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.isEmailConfirmed = true;
        state.loading = false;
      })
      .addCase(confirmEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
