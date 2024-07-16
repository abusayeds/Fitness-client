import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/home/productSlice";
import singleProductReducer from './features/productDetailsPage/productdetailspageSlice'
import catrReducer from './features/cartPage/cartpageSlice'
import checkOutReducer from './features/chechOUtPage/checkOutPageSlice'
import updateProductValue from './features/productManagementPage/productManegementSlice'

import { baseApi } from "./api/baseApi";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: productsReducer,
    singleProduct : singleProductReducer,
    cartProduct: catrReducer,
    cartUserDetails: checkOutReducer,
    updateProductValue : updateProductValue
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
