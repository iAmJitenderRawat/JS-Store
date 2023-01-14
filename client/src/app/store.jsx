import { configureStore } from "@reduxjs/toolkit";
import singleProductReducer from "../context/slices/singleProductSlice";
import categoriesReducer from "./../context/slices/categogiesSlice";
import productsReducer from "./../context/slices/productsSlice";
import cartReducer from "./../context/slices/cartSlice";
// import authReducer from "../context/slices/authSlice";

export default configureStore({
  reducer: {
    category: categoriesReducer,
    product: productsReducer,
    SingleProduct: singleProductReducer,
    cart: cartReducer,
    // auth: authReducer,
  },
});
