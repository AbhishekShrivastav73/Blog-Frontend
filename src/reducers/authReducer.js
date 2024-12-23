import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching user data
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/profile', {
        headers: { Authorization: `Bearer ${params}` },
      });
      return response.data; // Assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message); // Pass detailed error message
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null; // Reset all fields to initial state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Update user data
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user'; // Handle error
      });
  },
});

// Export actions
export const { clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
