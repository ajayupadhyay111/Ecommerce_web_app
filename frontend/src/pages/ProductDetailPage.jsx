import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Heart from "@/lib/heart";
import { Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import { addProductInCart, getProductById } from "@/api/UserRelatedAPI";
import toast from "react-hot-toast";
import {
  addProductsToCart,
  totalProductQuantityInCart,
  totalProductsPrice,
} from "@/store/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const { cartProduct } = useSelector((state) => state.cart);
  const [productIsAddedToCart, setProductIsAddedToCart] = useState(false);
  const { size, quantities } = location.state || {};
  useEffect(() => {
    window.scrollTo(0, 0);

    if (cartProduct.length > 0)
      setProductIsAddedToCart(
        cartProduct.some((value) => value.productId._id === id)
      );
    setSelectedSize(size || selectedSize);
    setQuantity(quantities || quantity);
  }, [id, size]);
  useEffect(() => {
    (async () => {
      const response = await getProductById(id);
      setProduct(response.data.product);
    })();
  }, [id, cartProduct]);

  const dispatchFunction = (response) => {
    console.log(response);
    dispatch(addProductsToCart({ cartData: response.data.cart.products }));
    dispatch(totalProductsPrice({ totalPrice: response.data.cart.totalPrice }));
    dispatch(
      totalProductQuantityInCart({
        cartProductQuantity: response.data.productsQuantities,
      })
    );
  };

  const handleAddToCart = async (id) => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const response = await addProductInCart({
      id,
      size: selectedSize,
      quantity,
      price: product.price,
      type: "",
    });
    toast.success("Product added to cart");
    dispatchFunction(response);
  };

  const handleQuantityChange = async (type) => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (type === "increase" && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
      const response = await addProductInCart({
        id,
        size: selectedSize,
        quantity: quantity + 1,
        price: product.price,
        type: "increase",
      });
      dispatchFunction(response);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      const response = await addProductInCart({
        id,
        size: selectedSize,
        quantity,
        price: product.price,
        type: "decrease",
      });
      dispatchFunction(response);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:mt-0 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Images */}
        <div className="md:sticky top-0">
          <div className="flex gap-4">
            <div className="w-20 flex flex-col gap-2">
              {product?.images?.map((img, idx) => (
                <button
                  key={idx}
                  className={`border-2 ${
                    selectedImage === idx
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img.url}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full"
                  />
                </button>
              ))}
            </div>
            <div className="flex-1">
              <img
                src={product?.images?.[selectedImage].url}
                alt={product.name}
                className="w-full h-[600px] object-cover object-top"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            {productIsAddedToCart ? (
              <button className="flex-1 flex items-center justify-center gap-4 bg-blue-500 text-white py-4 rounded-lg font-semibold opacity-60">
                ADDED <Check />
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(id)}
                className="flex-1 bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600"
              >
                ADD TO CART
              </button>
            )}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-4 border-2 rounded-lg hover:bg-gray-50"
            >
              <Heart
                classname="size-6"
                fill={isFavorite ? "#ef4444" : "none"}
                stroke={isFavorite ? "#ef4444" : "currentColor"}
              />
            </button>
          </div>
        </div>

        {/* Right Section - Details */}
        <div>
          <h1 className="text-2xl font-medium">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.brand}</p>

          <div className="mt-6">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-semibold">₹{product.price}</span>
              <span className="text-gray-500 line-through">₹{product.mrp}</span>
              <span className="text-green-600">{product.discount}% off</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Select Size</h3>
            <div className="flex gap-4">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  className={`w-12 h-12 rounded-full border-2 ${
                    selectedSize === size
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* Add Quantity Controller */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange("increase")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Product Details</h3>
            <div className="space-y-4">
              <h4 className="font-medium">Highlights</h4>
              <ul className="list-disc pl-5 space-y-2">
                {product.highlights?.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <h4 className="font-medium pt-4">Description</h4>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
