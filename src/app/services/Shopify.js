import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_API = "http://localhost:7000/"

export const shopifyApi = createApi({
  reducerPath: "shopifyApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `shopify/products`,
    }),
    getProduct: builder.query({
      query: (id) => `shopify/product/${id}`,
    }),
    getCart: builder.query({
      query: (id) => `shopify/cart/${id}`,
      providesTags: ["Cart"],
    }),
    createCart: builder.mutation({
      query: () => ({
        url: "shopify/cart",
        method: "POST",
      }),
    }),
    updateCart: builder.mutation({
      query: ({ cartId, merchandiseId }) => ({
        url: `shopify/cart/${cartId}?merchandiseId=${merchandiseId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ cartId, cartLineId }) => ({
        url: `shopify/cart/${cartId}?cartLineId=${cartLineId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = shopifyApi
