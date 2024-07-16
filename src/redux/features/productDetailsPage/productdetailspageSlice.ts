import { createSlice, PayloadAction, } from "@reduxjs/toolkit";

const initialState = {
    singleProduct : ''
}

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
     singleProductId : (state, action : PayloadAction<string> ) => {
        state.singleProduct = action.payload
    },
    
   }
})
 export const {singleProductId} = productSlice.actions
export default productSlice.reducer