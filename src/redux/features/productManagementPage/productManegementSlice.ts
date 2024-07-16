import { createSlice, PayloadAction, } from "@reduxjs/toolkit";


const initialState = {
    UpdateProductsDefaultValue : ''
}

const updateproductSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
     UpdateProductdefaultValue : (state, action : PayloadAction<string> ) => {
        state.UpdateProductsDefaultValue = action.payload
    },
    
   }
})
 export const {UpdateProductdefaultValue} = updateproductSlice.actions
export default updateproductSlice.reducer