import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import Products from '../pages/Products'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/add' element={<AddProduct />} />
      <Route path='/edit/:id' element={<EditProduct />} />
    </Routes>
  )
}
