import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, deleteItem } = useCart();

  return (
    <>
      <div className="w-full bg-blue-200">
        
        <div className="grid grid-cols-2">  
          {cart.map((cart) => (
              
            <div
              key={cart.id}    
              className="w-full flex border-gray-400 p-4 items-center gap-3"
            >
             
              <div className="h-62 w-58 bg-white flex items-center justify-center rounded-2xl p-6">
                <img src={cart.image} className="h-full" />
              </div>
              <div className="h-62 w-120 bg-white p-12 rounded-2xl">
                <h3 className="font-semibold text-lg line-clamp-1">{cart.title}</h3>
                <p className="text-lg font-bold text-blue-600">
                  $ {cart.price}
                </p>
                <p className="line-clamp-1 text-gray-700 text-[15px]">
                  {cart.description}
                </p>  
                <div className="flex items-center gap-2 py-2">
                  <button
                    onClick={() => increaseQuantity(cart.id)}
                    className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full bg-blue-300"
                  >
                    +
                  </button>
                  {cart.quantity > 0 && (
                    <span className="w-10 h-6 flex justify-center items-center font-bold border border-blue-400 ">
                      {cart.quantity}
                    </span>
                  )}

                  <button
                    onClick={() => decreaseQuantity(cart.id)}
                    className="w-5 h-5 flex justify-center items-center bg-blue-300 cursor-pointer rounded-full"
                  >
                    -
                  </button>
                   <div className="px-3">
                  <button
                    onClick={() => deleteItem(cart.id)}
                    className="bg-blue-500 px-1.5 py-1.5 cursor-pointer rounded-md text-white font-bold"
                  >
                    Remove
                  </button>
                </div>
                </div>
               <button className="bg-blue-500 px-2 py-2 cursor-pointer font-bold text-white rounded-md mt-2">Place Order</button>
              </div>
            </div>
          ))}
        </div>
        </div>
      
    </>
  );
}
