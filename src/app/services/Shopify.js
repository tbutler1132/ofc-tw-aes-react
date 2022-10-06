import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_API = "http://localhost:7000/"

export const shopifyApi = createApi({
  reducerPath: "shopifyApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    getClient: builder.query({
      query: () => `shopify/client`,
    }),
  }),
})

export const { useGetClientQuery } = shopifyApi
