/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const productPageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productPage: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.productfilter.forEach((item: any) => {
            params?.append(item?.name, item?.value);
          });
        }
        return {
          url: `products/all-products?searchTerm=${args?.searchValue}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    productLength: builder.query({
      query: () => {
        return {
          url: `products/all-products`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const { useProductPageQuery, useProductLengthQuery } = productPageApi;
