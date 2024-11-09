/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const paymentPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (addPayment) => ({
        url: "payment/create-payment",
        method: "POST",
        body: addPayment,
      }),
      invalidatesTags: ["payment"],
    }),
    allPayment: builder.query({
      query: () => {
        return {
          url: "payment/all-payment",
          method: "GET",
        };
      },
      providesTags: ["payment"],
    }),
    deletePayment: builder.mutation({
      query: (id) => {
        return {
          url: `payment/delete-payment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["payment"],
    }),
  }),
});
export const {
  useCreatePaymentMutation,
  useAllPaymentQuery,
  useDeletePaymentMutation,
} = paymentPageApi;
