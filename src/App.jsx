import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Products from './components/Products'  
import { CartProvider } from './context/CartContext';
import Cart from './Pages/Cart';

export default function App() {
  return (
   <>
  <CartProvider>
   <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={< Cart/>} />
    </Routes>
  </CartProvider>
   </>
  )
}
