import { createSlice} from "@reduxjs/toolkit";

interface TUserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CartState {
  userData: TUserDetails[];
}

const initialState: CartState = {
  userData: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.userData.push({...action.payload})
    },
  },
});
export const { userDetails } = productSlice.actions;
export default productSlice.reducer;
