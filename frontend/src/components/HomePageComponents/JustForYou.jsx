import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import menShirt from "../../assets/shirts/shirt_1.jpg";
import poloShirt from "../../assets/polo_shirts/polo_shirts.jpg";
import menBandana from "../../assets/bandana/men/men_2.jpeg";
import kidShirt from "../../assets/kids/kids_shirt_1.jpg";
import menTshirt from "../../assets/t-shirts/t_shirt_1.jpg";
import menTank from "../../assets/tansk/men/men_1.jpg"

const categories = ["All", "Tanks", "Shirt", "T-shirt", "Bandana", "Belt"];
const products = [
  [
    {
      img: menShirt,
      alt: "causal shirt",
    },
    {
      img: menTshirt,
      alt: "men t-shirt",
    },
  ],
  [
    {
      img: poloShirt,
      alt: "polo shirt",
    },
  ],
  [
    {
      img: menBandana,
      alt: "men bandana",
    },
    {
      img: menShirt,
      alt: "causal shirt",
    },
  ],
  [
    {
      img: kidShirt,
      alt: "kid shirt",
    },
  ],
  [
    {
      img: menTshirt,
      alt: "men t-shirt",
    },
  ],
  [
    {
      img: menTank,
      alt: "men tank",
    },
  ],
];

const JustForYou = () => {
  const [currentCategoryProduct, setCurrentCategoryProduct] = useState(products.map((product)=>product[0]));
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryChanges = (index) => {
    setActiveCategory(index);
    if(index === 0){
      setCurrentCategoryProduct(products.map((product)=>product[0]))
      return 
    }
    setCurrentCategoryProduct(products[index]);
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Just For You
      </h1>
      
      {/* Category Buttons */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-hide">
        {categories.map((category, index) => {
          return (
            <Button
              key={index}
              onClick={() => handleCategoryChanges(index)}
              className={`whitespace-nowrap ${
                activeCategory === index
                  ? "bg-blue-700/80 hover:bg-blue-800/80 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {category}
            </Button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCategoryProduct.map((product, index) => {
          return (
            <div
              key={index}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.img}
                  alt={product.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <Button className="w-full bg-blue-700/80 hover:bg-blue-800/80">
                  Shop now
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JustForYou;
