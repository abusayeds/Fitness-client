import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartOpen: false,
};

const OpenCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
    },
  },
});

export const { setCartOpen } = OpenCartSlice.actions;
export default OpenCartSlice.reducer;
