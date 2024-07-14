import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        product : builder.query({
           query : () => ({
            url : "category/get-category",
            method : 'GET',
         
           })
        }),
        fewProduct : builder.query({
           query : () => ({
            url : "products/all-products?limit=4",
            method : 'GET',
         
           })
        })
    }),
   
})
export const {useProductQuery, useFewProductQuery}= ProductApi 

 