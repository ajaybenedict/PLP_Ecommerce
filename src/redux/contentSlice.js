import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  page: 1,
  hasMore: true,
  status: 'idle',
  error: null,
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (page) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    return response.json();
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload];
        if (action.payload.length < 10) {
          state.hasMore = false;
        }
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementPage } = contentSlice.actions;

export default contentSlice.reducer;