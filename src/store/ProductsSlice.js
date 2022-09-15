import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

export const productSlice = createSlice({
  name: 'productStore',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.list.push(action.payload)
    },
    deleteProduct(state, action) {
      state.list = state.list.filter(f => f.id !== action.payload)
    },
    editProduct(state, action) {
      let i = state.list.indexOf(state.list.filter(f => f.id !== action.payload.id)[0])
      state.list[i] = action.payload
    },
  },
})

export const {addProduct, deleteProduct, editProduct} = productSlice.actions

export default productSlice.reducer;