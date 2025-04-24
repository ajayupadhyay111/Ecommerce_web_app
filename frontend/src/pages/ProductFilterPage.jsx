import { getProductsForFilterPage } from "@/api/UserRelatedAPI";
import Products from "@/components/FilterPageComponents/Products";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ProductFilterPage = () => {
  const queryString = window.location.search;
  const params = useMemo(() => new URLSearchParams(queryString), [queryString]);

  const [category, setCategory] = useState(params.get("category") || "");
  const [price, setPrice] = useState(params.get("price") || "");
  const [sort, setSort] = useState(params.get("sort") || "");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleCategoryCheck = (catego) => {
    if (catego === category) {
      setCategory("");
    } else {
      setCategory(catego);
      navigate(`/filter?category=${catego}&price=${price}`);
    }
  };

  const handlePriceCheck = (p) => {
    if (p === price) {
      setPrice("");
    } else {
      setPrice(p);
    }
    navigate(`/filter?category=${category}&price=${p}`);
  };

  const handleSort = (value) => {
    setSort(value);
    navigate(
      `/filter?category=${category}&price=${price}&sort=${value}`
    );
  };

  const fetchData = async (category, price, sort) => {
    try {
      const response = await getProductsForFilterPage(
        category,
        price,
        sort
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {fetchData(category, price, sort);
  }, [category, price, sort, params]);
  return (
    <div className="w-full">
      <div className="w-full relative flex justify-end">
        {/* Left Sidebar with Filters */}
        <div className="w-[260px] h-fit bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {["men", "women", "kids", "baby"].map((catego) => (
                <label key={catego} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={catego === category}
                    onClick={() => handleCategoryCheck(catego)}
                    name={catego}
                    className="rounded border-gray-300"
                  />
                  <span className=" capitalize">{catego}</span>
                </label>
              ))}
            </div>
          </div>
        
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={price === "under-500"}
                  onChange={() => handlePriceCheck("under-500")}
                  className="rounded border-gray-300"
                />
                <span>Under ₹500</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={price === "500-1000"}
                  onChange={() => handlePriceCheck("500-1000")}
                  className="rounded border-gray-300"
                />
                <span>₹500 - ₹1000</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={price === "over-1000"}
                  onChange={() => handlePriceCheck("over-1000")}
                  className="rounded border-gray-300"
                />
                <span>Over ₹1000</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[calc(100%-260px)] min-h-screen ">
          {/* Sort Section */}
          <div className="sticky top-0 z-10 bg-white border-b p-4">
            <div className="flex justify-between items-center">
              <span>24 Products</span>
              <select
                value={sort}
                onChange={(e) => handleSort(e.target.value)}
                className="border rounded-md px-3 py-1.5"
              >
                <option value={"lastest"}>Latest</option>
                <option value={"asc"}>Price: Low to High</option>
                <option value={"desc"}>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterPage;
