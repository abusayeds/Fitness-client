/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const productManagementPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCartProduct: builder.mutation({
      query: (addToCart) => ({
        url: "cart/bookings",
        method: "POST",
        body: addToCart,
      }),
      invalidatesTags: ["booking"],
    }),
    updateQuantity: builder.mutation({
      query: (args) => {
        return {
          url: `cart/update-quantity/${args?.id}/${args?.quantity}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["booking"],
    }),
    myBooking: builder.query({
      query: () => ({
        url: "cart/my-bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    deleteCartProduct: builder.mutation({
      query: (id) => ({
        url: `cart/delete-booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});
export const {
  //   useProductManagemetQuery,
  useAddCartProductMutation,
  useMyBookingQuery,
  useUpdateQuantityMutation,
  useDeleteCartProductMutation,
} = productManagementPageApi;
