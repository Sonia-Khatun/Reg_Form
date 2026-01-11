import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Products from './components/Products'  

export default function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/products" element={<Products />} />
    </Routes>
   </>
  )
}
