import { configureStore } from "@reduxjs/toolkit"
import { shopifyApi } from "./services/Shopify"

export const store = configureStore({
  reducer: {
    [shopifyApi.reducerPath]: shopifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopifyApi.middleware),
})
