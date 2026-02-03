import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar, FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { setCart, setUser, addToCart, cart } = useCart();
  
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
    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (value === "popularity") {
      sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    setProducts(sortedProducts);
  };
  return (
    <div className="w-full bg-blue-300">
      <div className="w-full bg-gray-800 px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-white font-bold text-lg whitespace-nowrap">
            PRO<span className="text-blue-500">DUCTS</span>
          </h2>
          <div className="flex items-center lg:gap-4 md:gap-4 gap-2">
            <select
              onChange={handleSort}
              defaultValue=""
              className="cursor-pointer px-3 py-2 text-sm rounded-md bg-blue-500 text-white focus:outline-none font-bold"
            >
              <option value="" disabled>
                Sort by :
              </option>
              <option value="low-high">Low to High Price</option>
              <option value="high-low">High to Low Price</option>
              <option value="popularity">Popularity</option>
            </select>
            <div className="relative">
              <Link to="/cart">
                <FaCartPlus className="text-[24px] text-blue-500" />
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 text-[10px] bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <CgProfile className="text-[24px] text-blue-500" />
            <IoLogOut title="Logout"
              onClick={productLogOut}
              className="text-[24px] text-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-5 py-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="
          bg-white border border-gray-200 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all p-4"
          >
            <div className="h-40 sm:h-48 flex justify-center items-center bg-gray-50 mb-3">
              <img src={product.image} className="h-full object-contain" />
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
