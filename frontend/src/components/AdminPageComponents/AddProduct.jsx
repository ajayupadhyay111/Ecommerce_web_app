import { useRef, useState } from "react";
import { X, Upload, Plus, Minus } from "lucide-react";
import { newProduct } from "@/api/adminProductRelatedAPI";
import toast from "react-hot-toast";

const AddProduct = ({ setProducts, isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    images: [],
    category: "",
    price: "",
    mrp: "",
    discount: "",
    sizes: [],
    stock: "",
    status: "",
    highlights: [],
    description: "",
  });

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const categories = ["Men", "Women", "Kids", "Baby"];

  // Modified image handler for bulk upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images");
      return;
    }

    // Create preview URLs for images
    const imageUrls = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    console.log(files)
    setImages(files)

    setProductData({ ...productData, images: imageUrls });
  };

  const handleSizeToggle = (size) => {
    const newSizes = productData.sizes.includes(size)
      ? productData.sizes.filter((s) => s !== size)
      : [...productData.sizes, size];
    setProductData({ ...productData, sizes: newSizes });
  };

  const addHighlight = () => {
    setProductData({
      ...productData,
      highlights: [...productData.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const newHighlights = productData.highlights.filter((_, i) => i !== index);
    setProductData({ ...productData, highlights: newHighlights });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const formData = new FormData();
  
      // Append basic product details
      formData.append("name", productData.name);
      formData.append("brand", productData.brand);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("mrp", productData.mrp);
      formData.append("discount", productData.discount);
      formData.append("stock", productData.stock);
      formData.append("description", productData.description);
      formData.append("status", "Active");
  
      // Append arrays as JSON strings
      formData.append("sizes", JSON.stringify(productData.sizes));
      formData.append("highlights", JSON.stringify(productData.highlights));
  
      // Append each image file
      images.forEach((file) => {
        formData.append("images", file);
      });
  
      // Send the formData to the server
      const response = await newProduct(formData);
  
      if (response.success) {
        toast.success("Product added successfully!");
        setProducts(prev => [...prev, response.product]);
        onClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error?.response?.data?.message || "Failed to add product");
    }finally{
      setIsLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed w-screen inset-0 z-50 bg-neutral-500/50 py-10 overflow-y-auto"
    >
      <div className=" relative min-h-screen md:flex md:items-center md:justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className=" relative bg-white w-full md:max-w-3xl mx-auto rounded-lg shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  value={productData.brand}
                  onChange={(e) =>
                    setProductData({ ...productData, brand: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={productData.discount}
                  onChange={(e) =>
                    setProductData({ ...productData, discount: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  No of Stock
                </label>
                <input
                  type="number"
                  value={productData.stock}
                  onChange={(e) =>
                    setProductData({ ...productData, stock: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Images (Max 4)
              </label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                  accept="image/*"
                  max="4"
                />
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <Upload className="h-6 w-6" />
                    <span>Upload Images (Max 4)</span>
                  </button>
                </div>

                {/* Image Previews */}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = productData.images.filter(
                          (_, i) => i !== index
                        );
                        setProductData({ ...productData, images: newImages });
                      }}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-inline">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  value={productData.mrp}
                  onChange={(e) =>
                    setProductData({ ...productData, mrp: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium mb-2">Sizes</label>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      productData.sizes.includes(size)
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Highlights
              </label>
              <div className="space-y-3">
                {productData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const newHighlights = [...productData.highlights];
                        newHighlights[index] = e.target.value;
                        setProductData({
                          ...productData,
                          highlights: newHighlights,
                        });
                      }}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-black"
                      placeholder={`Highlight ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Minus className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlight}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Highlight
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                rows={4}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
              disabled={IsLoading}
                type="submit"
                className="px-4 py-2 flex justify-center items-center bg-black text-white rounded-lg hover:bg-gray-800"
              >
                {
                  IsLoading ? <div className="size-5 border-t-2 animate-spin rounded-full"></div>:"Add Product"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
