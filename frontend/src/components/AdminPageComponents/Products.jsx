import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Edit2, Trash2, Filter } from "lucide-react";
import AddProduct from "./AddProduct";
import { deleteProduct, getProducts } from "@/api/adminProductRelatedAPI";
import EditProduct from "./EditProduct";
import toast from "react-hot-toast";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProductToUpdate, setSelectedProductToUpdate] = useState({});
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data.products);
    })();
  }, []);

  const categories = ["all", "Men", "Women", "Kids", "Baby"];

  // Enhanced filtering logic using useMemo
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      // Case-insensitive search across multiple fields
      const searchMatches =
        searchTerm.trim() === "" ||
        [
          product.name,
          product.brand,
          product.category,
          product.price.toString(),
        ].some((field) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filtering
      const categoryMatches =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return searchMatches && categoryMatches;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleEditProduct = (product) => {
    setIsUpdateProductOpen(true);
    setSelectedProductToUpdate(product);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId);
      if (response.success) {
        setProducts((product) => product._id !== productId);
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(filteredProducts)

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">Products</h2>
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
        <AddProduct
          setProducts={setProducts}
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border border-gray-400 rounded-lg w-full focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-black"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table with Responsive Card View */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-4 px-6 text-left">Product</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-left">Price</th>
                <th className="py-4 px-6 text-left">Stock</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product?.images[0].url}
                          alt={product.name}
                          className="h-12 w-12 rounded object-cover object-top"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{product.category}</td>
                    <td className="py-4 px-6">₹{product.price}</td>
                    <td className="py-4 px-6">{product.stock}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          product.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-0">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit2
                            onClick={() => handleEditProduct(product)}
                            className="h-5 w-5 text-blue-600"
                          />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No Products yet</p>
              )}
            </tbody>
          </table>
        </div>
        <EditProduct
          product={selectedProductToUpdate}
          isOpen={isUpdateProductOpen}
          onClose={() => setIsUpdateProductOpen(false)}
          setProducts={setProducts}
        />
        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Price:</span>
                  <span className="ml-2 font-medium">₹{product.price}</span>
                </div>
                <div>
                  <span className="text-gray-500">Stock:</span>
                  <span className="ml-2 font-medium">{product.stock}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 className="h-5 w-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
