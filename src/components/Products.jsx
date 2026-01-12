import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    setProducts(res.data);
  };

  useEffect(() => {
   getProducts(); 
  }, [])
  

  return (
    <div className="w-full bg-blue-200 p-5">
      <h2 className="flex justify-center items-center text-3xl font-bold">Products</h2>
      <div className=" grid grid-cols-4 px-5 py-5 gap-4">{products.map(product =>(
      <div className="border-blue-300 border-2 rounded-md" key={product.id}>
      <div className=""><img src={product.image} height="200px" width="200px" alt="" /></div>
      <h3>{product.title}</h3>
       <p>{product.price}</p>
       <p>{product.description}</p>
       <p>{product.category}</p>
       
       </div>
      ))}
      </div>
    </div>
  );
}
