import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [cart, setCart] = useState([]);


 const loadCart =async () => { 
    if(!user) return;

    try {
    const res = await axios.get(`http://localhost:3000/users/${user.id}`)
    setCart(res.data.cart || [])
    }
    catch(error){
      console.log(error)  
    }
  }
  useEffect(() => {
   loadCart();
  }, [])
 
  const addToCart = async (product) => {
    if (!user) {
      alert("Please login");
      return;
    }

    try {
      const updatedCart = [...cart];
      const index = updatedCart.findIndex(
        item => item.id === product.id
      );

      if (index === -1) {
        updatedCart.push({ ...product, quantity: 1 });
      } else {
        updatedCart[index].quantity += 1;
      }

      await axios.patch(
        `http://localhost:3000/users/${user.id}`,
        { cart: updatedCart }
      );

      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>{
    return useContext(CartContext);
}