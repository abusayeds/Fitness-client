import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        product : builder.query({
           query : () => ({
            url : "category/get-category",
            method : 'GET',
           
           }),
           providesTags : ['refatch']
        }),
        fewProduct : builder.query({
           query : () => ({
            url : "products/all-products?limit=4",
            method : 'GET',
         
           }),
           providesTags : ['refatch']
        })
       
    }),
   
})
export const {useProductQuery, useFewProductQuery}= ProductApi 

 