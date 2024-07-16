/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const productPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productPage: builder.query({
      query: (category: string) => ({
        url: category
          ? `products/all-products?category=${category}`
          : "products/all-products",
        method: "GET",
      }),
      providesTags : ["refatch"]
    }),
    
  }),
});
export const { useProductPageQuery,  } = productPageApi;
