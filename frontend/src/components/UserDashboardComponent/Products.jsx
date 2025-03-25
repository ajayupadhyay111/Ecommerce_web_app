import React, { useState } from "react";
import Sort from "../Sort";

const Products = () => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (option) => {
    setSortOption(option);
  };
  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-between items-center">
        <div className="flex flex-col md:flex-row mb-2 justify-between px-2 items-start md:gap-0 gap-2 md:items-center w-full">
        <h2 className="text-2xl font-semibold ">My Orders</h2>
        <div className="flex gap-2 items-center">
          <span className=" font-bold text-md">Sort by :</span>
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded-lg px-2 py-1 bg-white shadow-md hover:shadow-lg transition"
          >
            <option value="">Select Status</option>
            <option value="pending">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        </div>
      </div>
      <div className="space-y-4 mt-2">
        {/* Order Card */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Order #12345</p>
              <p className="text-sm text-gray-500">Placed on 24 March 2024</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Delivered
            </span>
          </div>
          <div className="mt-4 flex gap-4">
            <img
              src="https://example.com/product.jpg"
              alt="Product"
              className="h-20 w-20 object-cover rounded"
            />
            <div>
              <p className="font-medium">Product Name</p>
              <p className="text-sm text-gray-500">Size: M • Qty: 1</p>
              <p className="font-medium mt-1">₹999</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
