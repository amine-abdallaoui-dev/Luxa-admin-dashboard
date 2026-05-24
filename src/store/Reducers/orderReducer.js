import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_orders = createAsyncThunk(
  "order/getOrders",
  async (
    { page, perPage, search, deliveryStatus, paymentStatus },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.get("/orders-get", {
        params: { page, perPage, search, deliveryStatus, paymentStatus },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const update_order_status = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, info }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/order-status",
        { id: orderId, ...info },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const orderReducer = createSlice({
  name: "order",
  initialState: {
    loader: false,
    orders: [],
    totalItems: 0,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_orders.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_orders.fulfilled, (state, action) => {
        state.loader = false;
        state.orders = action.payload?.orders || [];
        state.totalItems = action.payload?.totalItems || 0;
      })
      .addCase(get_orders.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || "Failed to load orders";
      })
      .addCase(update_order_status.fulfilled, (state, action) => {
        const updatedOrder = action.payload.order;
        if (updatedOrder) {
          const index = state.orders.findIndex(o => o._id === updatedOrder._id);
          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
        }
      });
  },
});

export default orderReducer.reducer;
