import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching posts based on filters or search
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/post'); // Support query params
      return response.data.posts; // Assuming the response contains posts under `data.posts`
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message); // Pass detailed error message
    }
  }
);  

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {}, // Add reducers if needed for other functionalities
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload; // Update posts data
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch posts'; // Handle error
      });
  },
});

export default postsSlice.reducer;
