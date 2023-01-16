import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    reset(state){
      return state=[];
    }
  },
});

export const { add, remove, reset } = cartSlice.actions;
export default cartSlice.reducer;
