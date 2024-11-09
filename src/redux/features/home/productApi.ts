import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CategoryProduct: builder.query({
      query: (category) => ({
        url: `category/get-category/?mainCategory=${category}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    allCategoryProduct: builder.query({
      query: () => ({
        url: `category/get-category`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    fewProduct: builder.query({
      query: () => ({
        url: "products/all-products?limit=4",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});
export const {
  useCategoryProductQuery,
  useFewProductQuery,
  useAllCategoryProductQuery,
} = ProductApi;
