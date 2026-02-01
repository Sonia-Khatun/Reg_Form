import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, deleteItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <div className="w-full bg-blue-200 px-3 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cart.map((cart) => (
            <div
              key={cart.id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-4 sm:p-6"
            >
              <div className="w-full sm:w-40 h-40 bg-gray-100 flex items-center justify-center rounded-xl p-4">
                <img
                  src={cart.image}
                  className="h-full object-contain"
                  alt={cart.title}
                />
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
                  {cart.title}
                </h3>
                <p className="text-lg font-bold text-blue-600 mt-1">
                  $ {cart.price}
                </p>
                <p className="text-sm sm:text-[15px] text-gray-700 line-clamp-2 mt-1">
                  {cart.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 py-3">
                  <button
                    onClick={() => increaseQuantity(cart.id)}
                    className="w-6 h-6 flex justify-center items-center rounded-full bg-blue-300 font-bold"
                  >
                    +
                  </button>
                  <span className="w-10 h-6 flex justify-center items-center font-bold border border-blue-400">
                    {cart.quantity}
                  </span>
                  <button
                    onClick={() => decreaseQuantity(cart.id)}
                    className="w-6 h-6 flex justify-center items-center rounded-full bg-blue-300 font-bold"
                  >
                    -
                  </button>
                  <button
                    onClick={() => deleteItem(cart.id)}
                    className="bg-blue-500 px-3 py-1 rounded-md text-white font-bold text-sm"
                  >
                    Remove
                  </button>
                </div>
                <button className="w-full sm:w-auto bg-blue-500 px-4 py-2 text-white font-bold rounded-md">
                  Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
