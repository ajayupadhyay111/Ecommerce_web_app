import React, { useState } from "react";
import { Button } from "../ui/button";
// Import images directly
import menShirt from "../../assets/shirts/shirt_1.jpg";
import poloShirt from "../../assets/polo_shirts/polo_shirts.jpg";
import menBandana from "../../assets/bandana/men/men_2.jpeg";
import kidShirt from "../../assets/kids/kids_shirt_1.jpg";
import menTshirt from "../../assets/t-shirts/t_shirt_1.jpg";
import menTank from "../../assets/tansk/men/men_1.jpg";
import userImage from "../../assets/user.png";

const products = [
  {
    img: menShirt,
    alt: "casual shirt",
    title: "Classic Casual Shirt",
    price: 49.99,
    category: "Men's Fashion",
  },
  {
    img: poloShirt,
    alt: "polo shirt",
    title: "Premium Polo Shirt",
    price: 39.99,
    category: "Men's Fashion",
  },
  {
    img: menBandana,
    alt: "men bandana",
    title: "Stylish Bandana",
    price: 19.99,
    category: "Accessories",
  },
  {
    img: kidShirt,
    alt: "kid shirt",
    title: "Kids Comfort Shirt",
    price: 29.99,
    category: "Kids Fashion",
  },
  {
    img: menTshirt,
    alt: "men t-shirt",
    title: "Essential T-Shirt",
    price: 24.99,
    category: "Men's Fashion",
  },
  {
    img: menTank,
    alt: "men tank",
    title: "Athletic Tank Top",
    price: 22.99,
    category: "Sportswear",
  },
];

const SomeProducts = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e) => {
    e.target.src = userImage; // Use imported fallback image
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of trending items that combine
            style, comfort, and quality
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <div className="relative w-full h-80 ">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
                  )}
                  <img
                    src={product.img}
                    alt={product.alt}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                    className={`w-full h-full object-contain  transform transition-transform duration-300 group-hover:scale-105 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>

              <div className="p-6">
                <span className="text-sm text-blue-600 font-medium">
                  {product.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full
                    transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Quick view button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SomeProducts;
