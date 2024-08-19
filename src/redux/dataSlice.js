import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 데이터 로딩을 위한 Thunk 생성
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('http://43.200.238.249:5000/your-endpoint');
  return response.data;
});

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;