import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Register from "./components/Register";
import Products from "./components/Products";
import { CartProvider } from "./context/CartContext";
import Cart from "./Pages/Cart";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!JSON.parse(localStorage.getItem("user"))
  );

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        <Route  
          path="/products"
          element={
            isLoggedIn ? <Products /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/cart"
          element={
            isLoggedIn ? <Cart /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </CartProvider>
  );
}