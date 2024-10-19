import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CategoryProduct: builder.query({
      query: (category) => ({
        url: `category/get-category/?mainCategory=${category}`,
        method: "GET",
      }),
      providesTags: ["refatch"],
    }),
    addProducts: builder.mutation({
      query: (data) => ({
        url: "products/create-product",
        method: "POST",
        body: data,
      }),
    }),
    fewProduct: builder.query({
      query: () => ({
        url: "products/all-products?limit=4",
        method: "GET",
      }),
      providesTags: ["refatch"],
    }),
  }),
});
export const {
  useAddProductsMutation,
  useCategoryProductQuery,
  useFewProductQuery,
} = ProductApi;
