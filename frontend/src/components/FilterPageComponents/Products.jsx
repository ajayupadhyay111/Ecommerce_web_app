import React, { useEffect, useState } from "react";
import Cart from "@/lib/cart";
import Heart from "@/lib/heart";
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/api/adminProductRelatedAPI";

const Products = React.memo(() => {
  const [hoveredId, setHoveredId] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  const handleAddToCart = (productId) => {
    console.log("Added to cart:", productId);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  useEffect(()=>{
    (async()=>{
      const response = await getProducts()
      setProducts(response.products)
    })()
  },[])

  console.log(products)
  
  return (
    <div className="w-full p-4 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto">
        {products.map((product) => (
          <div
          onClick={()=>navigate("/product/"+product._id)}
            key={product._id}
            className="w-full border-2 rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            onMouseEnter={() => setHoveredId(product._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              style={{
                backgroundImage: `url(${product?.images[1].url})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                height: "320px",
                width: "100%",
              }}
              className="border-b-2 rounded-t-lg relative"
            >
              <div className="absolute left-0 bottom-5 flex flex-col gap-2 p-2">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className={`p-2 rounded-full bg-white shadow-md transition-transform ${
                    hoveredId === product._id ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <Cart classname="size-6" />
                </button>
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className={`p-2 rounded-full bg-white shadow-md transition-transform ${
                    hoveredId === product._id ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <Heart 
                    classname="size-6"
                    fill={favorites.has(product._id) ? "#ef4444" : "none"}
                    stroke={favorites.has(product._id) ? "#ef4444" : "currentColor"}
                  />
                </button>
              </div>
              <div className="absolute bottom-5 right-5 bg-white px-3 py-1 rounded-full shadow-md">
                <p className="font-bold text-xl">₹{product.price}</p>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
})

export default Products;