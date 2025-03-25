import { useState } from "react";

const Sort = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (option) => {
    setSortOption(option);
    onSortChange(option);  // Parent ko sort value bhejna
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <span className="text-lg font-semibold">Sort By:</span>

      {/* Price Sorting */}
      <select
        value={sortOption}
        onChange={(e) => handleSortChange(e.target.value)}
        className="border rounded-lg px-2 py-1 bg-white shadow-md hover:shadow-lg transition"
      >
        <option value="">Select</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_desc">Rating: High to Low</option>
        <option value="rating_asc">Rating: Low to High</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
};

export default Sort;
