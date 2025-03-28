import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heart from '@/lib/heart';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/features/cart/cartSlice';
import { getProductById } from '@/api/UserRelatedAPI';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState([])
  const dispatch = useDispatch();
  // Dummy product data - replace with your API call

  const handleAddToCart = async(id) => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    dispatch(addProductToCart({id,size:selectedSize}))
    console.log('Added to cart:', { ...product, selectedSize });
  };

  useEffect(()=>{
    (async()=>{
      const response = await getProductById(id)
      setProduct(response.data.product)
    })()
  },[])

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
                  className={`border-2 ${selectedImage === idx ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img.url} alt={`${product.name} ${idx + 1}`} className="w-full" />
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
            <button
              onClick={()=>handleAddToCart(id)}
              className="flex-1 bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600"
            >
              ADD TO CART
            </button>
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
              {product.sizes?.map(size => (
                <button
                  key={size}
                  className={`w-12 h-12 rounded-full border-2 ${
                    selectedSize === size 
                      ? 'border-blue-500 text-blue-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
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