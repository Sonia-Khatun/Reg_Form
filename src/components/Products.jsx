import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar, FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);

  const { setCart, setUser } = useCart();
  const { addToCart, cart } = useCart();
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems = totalItems + item.quantity;
  });

  const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();   
  }, []);

  const navigate = useNavigate();
  const productLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    navigate("/", { replace: true });
  };
  const handleSort = (e) => {
  const value = e.target.value;

  const sortedProducts = [...products];

  if(value === "low-high"){
    sortedProducts.sort((a,b) => a.price - b.price )
  }
  if(value === "high-low"){
    sortedProducts.sort((a,b) => b.price - a.price)
  }
  if(value === "popularity"){
  sortedProducts.sort((a, b) => {
  const valueA = (a.rating.count / a.rating.rate) % 100;
  const valueB = (b.rating.count / b.rating.rate) % 100;
  return valueB - valueA; 
  
});
}

  setProducts(sortedProducts)
  }
  return (
    <div className="w-full bg-blue-300">
      <div className="w-full bg-gray-800 px-4 py-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-white font-bold">
              PRO<span className="text-blue-600">DUCTS</span>
            </h2>
          </div>

          <div className="flex justify-center items-center gap-5">
            <div>
              <select onChange={handleSort} defaultValue="" className="px-5 py-2 rounded-md bg-blue-500 text-white focus:outline-none font-bold">
                <option value="" disabled>Sort by : </option>
                <option value="low-high">Low to High Price</option>
                <option value="high-low">High to low Price</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
            <div className="flex justify-end">
              <div>
                <Link to="/cart">
                  <FaCartPlus className="relative text-[28px] text-blue-500" />
                </Link>
              </div>
              {totalItems > 0 && (
                <div className="h-4 w-4 absolute flex justify-center items-center rounded-full text-[12px] font-bold bg-white text-blue-600">
                  {totalItems}
                </div>
              )}
            </div>
            <div>
              <CgProfile className="text-[28px] text-blue-500" />
            </div>
            <button
              onClick={productLogOut}
              className="bg-blue-500 text-white px-2 py-1.5 rounded-md font-bold cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 px-5 py-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="
          bg-white border border-gray-200 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all p-4"
          >
            <div className="h-48 flex justify-center items-center bg-gray-50 mb-3">
              <img src={product.image} className="h-full" />
            </div>

            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              {product.title}
            </h3>

            <p className="text-blue-600 font-bold mb-1">$ {product.price}</p>

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

            <button
              onClick={() => addToCart(product)}
              className="w-full text-white bg-blue-500 hover:bg-blue-400 rounded-md py-2 font-medium hover:opacity-90 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
