import LeftSide from "@/components/FilterPageComponents/LeftSide";
import Products from "@/components/FilterPageComponents/Products";
import Sort from "@/components/Sort";
import { scrollToTop } from "@/helper/ScrollToTop";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
// ...existing imports...

const ProductFilterPage = () => {
  const [filters, setFilters] = useState({
    category: ["men", "women"],
    search: "shoes",
    sort: "price_asc",
    page: 1,
    limit: 20,
  });
  const [sort, setSort] = useState("");
  const [checkedBox, setCheckedBox] = useState([]);
  const [queryParams, setQueryParams] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchValue = params.get("search");

  // Memoize the setCheckedBox handler
  const handleSetCheckedBox = useCallback((categories) => {
    setCheckedBox(categories);
  }, []); // Empty dependency array as it doesn't depend on any props or state

  // Memoize the sort handler
  const handleSortChange = useCallback((sortValue) => {
    setSort(sortValue);
  }, []);

  useEffect(() => {
    scrollToTop();

    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        category: checkedBox,
        sort: sort,
        search: searchValue,
      };

      const queryString = new URLSearchParams({
        ...updatedFilters,
        category: checkedBox.join(","),
      }).toString();

      setQueryParams(queryString);
      return updatedFilters;
    });
  }, [sort, checkedBox, searchValue]);
 
  useEffect(() => {
    console.log(queryParams);
  }, [queryParams]);
  return (
    <div className="w-full flex">
      <div className="w-full h-screen relative flex justify-end">
        <LeftSide
          setCheckedBox={handleSetCheckedBox}
          searchValue={searchValue}
        />
        <div className="w-[calc(100%-260px)] h-full overflow-y-auto">
          <Sort onSortChange={handleSortChange} />
          <Products filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterPage;
