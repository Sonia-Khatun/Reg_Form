import axios from "axios";
import { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    setProducts(res.data);
  };

  return (
    <div>
      <h2>Products Page</h2>

      <button onClick={getProducts}>
        Load Products
      </button>

      {products.map(p => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}
