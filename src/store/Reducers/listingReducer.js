import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const fetchList = (name, endpoint) =>
  createAsyncThunk(
    `listing/${name}`,
    async ({ page, perPage, search }, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { data } = await api.get(endpoint, {
          params: { page, perPage, search },
          withCredentials: true,
        });
        return fulfillWithValue({ ...data, listKey: name });
      } catch (err) {
        return rejectWithValue(err.response?.data);
      }
    }
  );

export const get_brands = fetchList("brands", "/brands-get");
export const get_reviews = fetchList("reviews", "/reviews-get");
export const get_customers = fetchList("customers", "/customers-get");
export const get_transactions = fetchList("transactions", "/transactions-get");
export const get_sellers = fetchList("sellers", "/sellers-get");


export const add_brand = createAsyncThunk(
    "brands/add_brand",
    async (info,{fulfillWithValue, rejectWithValue}) => {
        try {
            const {data} = await api.post("/add-brand",info,{withCredentials : true,headers: {
                    "Content-Type": "multipart/form-data"
                }})
            console.log(data)
            return fulfillWithValue({data, message : "Brand added successfully"});
        }catch (e) {
            console.log(e.response.data)
            return rejectWithValue({error: e.response?.data});
        }
    }
)
export const get_all_brands = createAsyncThunk(
    "brands/get",
    async (_,{fulfillWithValue, rejectWithValue}) => {
        try {
            const {data} = await api.get("/get-brand",{withCredentials : true})
            console.log(data)
            return fulfillWithValue({data, message : "brands successfully"});
        }catch (e) {
            console.log(e.response.data)
            return rejectWithValue({error: e.response?.data});
        }
    }
)

export const add_seller = createAsyncThunk(
  "listing/add_seller",
  async (sellerData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/seller-add", sellerData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const edit_seller = createAsyncThunk(
  "listing/edit_seller",
  async ({ id, sellerData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/seller-edit/${id}`, sellerData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const delete_seller = createAsyncThunk(
  "listing/delete_seller",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/seller-delete/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const get_dashboard_stats = createAsyncThunk(
  "listing/dashboardStats",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/dashboard-stats", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const listingReducer = createSlice({
  name: "listing",
  initialState: {
    loader: false,
    brands: [],
    reviews: [],
    customers: [],
    transactions: [],
    sellers: [],
    totalItems: 0,
    stats: null,
    activeList: [],
    errorMessage : "",
    successMessage : "",
  },
  reducers: {},
  extraReducers: (builder) => {
    const listCases = [
      [get_brands, "brands"],
      [get_reviews, "reviews"],
      [get_customers, "customers"],
      [get_transactions, "transactions"],
      [get_sellers, "sellers"],
    ];

    listCases.forEach(([thunk, key]) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loader = true;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loader = false;
          state[key] = action.payload?.items || [];
          state.totalItems = action.payload?.totalItems || 0;
          state.activeList = state[key];
        })
        .addCase(thunk.rejected, (state) => {
          state.loader = false;
        });
    });

    builder.addCase(add_brand.fulfilled, (state, action) => {
        state.loader = true;
        state.successMessage = action.payload?.message || null;
    })
    .addCase(add_brand.pending, (state) => {
        state.loader = true;
      })
    .addCase(add_brand.rejected, (state,{payload}) => {
        state.loader = false;
        state.errorMessage = payload?.error || null;

    })

      .addCase(get_all_brands.fulfilled, (state,{payload}) => {
          state.brands = [...payload.data];
      })

  },
});

export default listingReducer.reducer;
