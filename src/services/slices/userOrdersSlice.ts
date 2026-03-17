import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchUserOrders = createAsyncThunk(
  'userOrders/get',
  async () => await getOrdersApi()
);

interface UserOrdersState {
  orders: TOrder[];
  loading: boolean;
}

const initialState: UserOrdersState = {
  orders: [],
  loading: false
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default userOrdersSlice.reducer;
