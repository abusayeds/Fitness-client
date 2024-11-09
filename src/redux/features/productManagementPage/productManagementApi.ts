/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const productManagementPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productManagemet: builder.query({
      query: () => ({
        url: "products/all-products",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (addProduct) => ({
        url: "products/create-product",
        method: "POST",
        body: addProduct,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (args) => ({
        url: `products//update/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
export const {
  useProductManagemetQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productManagementPageApi;
