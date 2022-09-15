import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductsSlice'

export const store = configureStore({
  reducer: {
    products: productReducer
  },
})