import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/authantication/authanticationSlice";
import productsReducer from "./features/home/productSlice";
import singleProductReducer from "./features/productDetailsPage/productdetailspageSlice";
import catrReducer from "./features/cartPage/cartpageSlice";
import checkOutReducer from "./features/chechOUtPage/checkOutPageSlice";
import updateProductValue from "./features/productManagementPage/productManegementSlice";
import productFilterReducer from "./features/productPage/producFilterSlice";
import openCartReducer from "./features/cartPage/openCartSlice";

import { baseApi } from "./api/baseApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, loginReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: productsReducer,
    UserDetails: persistedAuthReducer,
    singleProduct: singleProductReducer,
    cartProduct: catrReducer,
    cartUserDetails: checkOutReducer,
    updateProductValue: updateProductValue,
    productfilter: productFilterReducer,
    openCart: openCartReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
