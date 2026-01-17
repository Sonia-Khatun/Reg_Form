import React from 'react'
import { useCart } from '../context/CartContext'


export default function Cart() {
  const { cart } = useCart();
  return (
    <>
    <div>
    {cart.map((cart) => (
      <div key={cart.id}>
       <img src={cart.image} alt="" />
       <h3>{cart.title}</h3>
       <h4>{cart.description}</h4>
      </div>  
    ))}
    </div>
    </>
  )
}
