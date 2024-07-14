import { createSlice, PayloadAction, } from "@reduxjs/toolkit";

const initialState = {
    products : ''
}

const productSlice = createSlice({
    name : 'product',
    initialState,
   reducers : {
    category : (state, action : PayloadAction<string> ) => {
        state.products = action.payload
    }
   }
})
 export const {category} = productSlice.actions
export default productSlice.reducer