import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const categoriesSlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});


export default categoriesSlice.reducer;

 export const getCategories = createAsyncThunk("products/categories", async () => {
  return await axios.get("https://dummyjson.com/products/categories")
   .then(res=>res.data)
 });