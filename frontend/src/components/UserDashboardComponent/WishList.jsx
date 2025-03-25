import React from "react";

const WishList = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Wishlist Item */}
        <div className="border rounded-lg p-4">
          <img
            src="https://example.com/product.jpg"
            alt="Product"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="font-medium">Product Name</h3>
          <p className="text-sm text-gray-500">₹999</p>
          <button className="w-full mt-2 bg-black text-white py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default WishList;
