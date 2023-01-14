import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});


export const getCategoriesProducts = createAsyncThunk(
  "category/getCategoriesProducts",
  async (categoryPage) => {
    const res = await axios.get(`https://dummyjson.com/products/category/${categoryPage}`);
    console.log(categoryPage);
    console.log(res.data);
    return res.data.products;
  }
);

// export const getCategoriesProducts = createAsyncThunk(
//   "category-products/fetch",
//   async (categoryPage) => {
//     const response = await fetch(
//       `https://dummyjson.com/products/category/${categoryPage}`
//     );
//     const data = await response.json();
//     return data.products;
//   }
// );

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
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
      .addCase(getCategoriesProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getCategoriesProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getCategoriesProducts.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

// export const { setProducts, setStatus } = productsSlice.actions;
export default productsSlice.reducer;

// export function getCategoriesProducts({ pages }) {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     console.log(getState)
//     try {
//       const res = await fetch(
//         `https://dummyjson.com/products/category/${pages}`
//       );
//       const data = await res.json();
//       console.log(data)
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }