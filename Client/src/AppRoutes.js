import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/Home/HomePage'
import FoodPage from './components/pages/Food/FoodPage'
import CartPage from './components/pages/Cart/CartPage'

export default function AppRoutes() {
  return (
   <Routes>
    <Route path ="/" element={<HomePage/>}/>
    <Route path ="/search/:searchTerm" element={<HomePage/>}/>
    <Route path ="/tag/:tag" element={<HomePage/>}/>
    <Route path ="/food/:id" element={<FoodPage/>}/>
    <Route path ="/cart" element={<CartPage/>}/>
   </Routes>
  )
}
