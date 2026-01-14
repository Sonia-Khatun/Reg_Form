import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full bg-blue-300 p-5">
      <h2 className="flex justify-center items-center text-3xl font-bold mb-6">
        Products
      </h2>
      <div className="grid grid-cols-4 gap-6 px-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="
          bg-white border border-gray-400 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all p-4"
          >
            <div className="h-48 flex justify-center items-center bg-gray-50 mb-3">
              <img src={product.image} className="h-full object-contain" />
            </div>

            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              {product.title}
            </h3>

            <p className="text-blue-600 font-bold mb-1">₹ {product.price}</p>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between">
              <div className="text-xs text-gray-500 mb-3 capitalize">
                <p>{product.category}</p>
              </div>
              
              <div className="flex items-center text-[13px] text-gray-500 mb-2 justify-end">
              <p>{product.rating.rate}</p>
              <p>
                <FaStar />
              </p>
              <p>{product.rating.count}</p>
            </div>
            </div>

           
            <button className="w-full text-white bg-blue-500 hover:bg-blue-400 rounded-md py-2 font-medium hover:opacity-90 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
