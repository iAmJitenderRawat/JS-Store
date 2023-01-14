import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const getSingleProducts = createAsyncThunk(
  "products/getSingleProducts",
  async (id) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log(id);
    console.log(res.data);
    return res.data;
  }
);


export const singleProductSlice = createSlice({
  name: "SingleProduct",
  initialState: {
    data: {},
    status: STATUSES.IDLE,
  },
  // reducers: {
  //   setProducts(state, action) {
  //       state.data = action.payload;
  //   },
  //   setStatus(state, action) {
  //       state.status = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getSingleProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getSingleProducts.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

export default singleProductSlice.reducer;
