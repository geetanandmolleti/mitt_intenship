import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Or your preferred HTTP client

// Async thunk to fetch the AI suggestion from our backend
export const fetchAiSuggestion = createAsyncThunk(
  'ai/fetchSuggestion',
  async ({ prompt, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.post(
        '/api/posts/suggest-content',
        { prompt },
        config
      );
      return data.suggestion;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'An error occurred');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    suggestion: '',
    loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearSuggestion: (state) => {
      state.suggestion = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiSuggestion.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchAiSuggestion.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.suggestion = action.payload;
      })
      .addCase(fetchAiSuggestion.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearSuggestion } = aiSlice.actions;
export default aiSlice.reducer;
