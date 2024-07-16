/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const productManagementPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productManagemeb: builder.query({
      query: () => ({
        url: "products/all-products",
        method: "GET",
      }),
    providesTags : ['refatch']
    }),
    addProduct: builder.mutation({
      query: (addProduct) => ({
        url: "products/create-product",
        method: "POST",
        body :addProduct
      }),
     invalidatesTags: ['refatch']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
     
      }),
     invalidatesTags: ['refatch']
    }),

    UpdateProduct: builder.mutation({
      query: (options) => {
        return {
          url: `products/${options.id}`,
          method: "PATCH",
          body: options.product,
        };
      },
     invalidatesTags: ['refatch']
    }),
  }),
});
export const {
  useProductManagemebQuery,
   useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productManagementPageApi;
