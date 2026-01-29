import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Products from "./components/Products";
import { CartProvider } from "./context/CartContext";
import Cart from "./Pages/Cart";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/products" element = {
            isLoggedIn ? <Products /> : <Navigate to="/" replace />
          }
           />
          <Route path="/cart" element= {
            isLoggedIn ? <Cart /> : <Navigate to="/" replace />
          }
           />
        </Routes>
      </CartProvider>
    </>
  );
}
