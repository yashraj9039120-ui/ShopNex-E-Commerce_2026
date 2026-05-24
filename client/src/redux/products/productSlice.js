import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../constants/axiosInstance";
import { getConfig } from "../../constants/config";

// ------------------ ASYNC THUNKS ------------------ //

// Get Products
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      let link = `/api/v1/products?page=${page}`;
      if (category) link += `&category=${category}`;
      if (keyword) link += `&keyword=${encodeURIComponent(keyword)}`;

      const { data } = await Api.get(link, getConfig());
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Product Details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await Api.get(`/api/v1/product/${id}`, getConfig());
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Submit Review
export const createReview = createAsyncThunk(
  "product/createReview",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const { data } = await Api.put(
        "/api/v1/review",
        { rating, comment, productId },
        getConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// ------------------ SLICE ------------------ //
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
    resultsPerPage: 4,
    totalPages: 0,
    reviewSuccess: false,
    reviewLoading: false,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.reviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // ----------- GET PRODUCTS ----------- //
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.products = [];
      });

    // ----------- PRODUCT DETAILS ----------- //
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // ----------- CREATE REVIEW ----------- //
    builder
      .addCase(createReview.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// ------------------ EXPORTS ------------------ //
export const { removeErrors, removeSuccess } = productSlice.actions;
export default productSlice.reducer;
