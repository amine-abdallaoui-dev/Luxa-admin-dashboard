import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_product = createAsyncThunk(
  "product/addProduct",
  async (
    info,
    { fulfillWithValue, rejectWithValue }
  ) => {

    try {
      const { data } = await api.post("/add-product", info, {
        withCredentials: true,headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/getProducts",
  async ({ page, perPage, search }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/products-get", {
        params: { page, perPage, search },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const delete_product = createAsyncThunk(
  "product/deleteProduct",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/product-delete",
        { id },
        { withCredentials: true }
      );
      return fulfillWithValue({ ...data, id });
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/updateProduct",
  async (productData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/product-update",
        productData,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const productReducer = createSlice({
  name: "product",
  initialState: {
    errorMessage: "",
    successMessage: "",
    loader: false,
    products: [],
    totalItems: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage =
          action.payload?.message || "Product added successfully";
      })
      .addCase(add_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage =
          action.payload?.error || "Failed to add product";
      })
      .addCase(get_products.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload?.products || [];
        state.totalItems = action.payload?.totalItems || 0;
      })
      .addCase(get_products.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || "Failed to load products";
      })
      .addCase(delete_product.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
        state.successMessage = "Product deleted";
      })
      .addCase(update_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_product.fulfilled, (state, action) => {
        state.loader = false;
        const index = state.products.findIndex(p => p._id === action.payload.product._id);
        if (index !== -1) {
            state.products[index] = action.payload.product;
        }
        state.successMessage = action.payload.message || "Product updated successfully";
      })
      .addCase(update_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || "Failed to update product";
      });
  },
});

export const { clearMessage } = productReducer.actions;
export default productReducer.reducer;
