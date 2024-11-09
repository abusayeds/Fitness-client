import { baseApi } from "../../api/baseApi";

const productPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleproduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useSingleproductQuery } = productPageApi;
