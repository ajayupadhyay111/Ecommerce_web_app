import { getCartPorducts, getProfile } from "@/api/UserRelatedAPI";
import { setCredentials } from "@/store/features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addProductsToCart, totalProductQuantityInCart, totalProductsPrice } from "@/store/features/cart/cartSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const {cartProduct} = useSelector(state=>state.cart)
  const {userInfo} = useSelector(state=>state.auth)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getProfile();
        dispatch(setCredentials(response.data.user));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array - only run once

  useEffect(()=>{
    if(userInfo){
      (async()=>{
        const response = await getCartPorducts();
        dispatch(addProductsToCart({cartData:response.data.products}))
        dispatch(totalProductsPrice({totalPrice:response.data.totalPrice}))
        dispatch(totalProductQuantityInCart({cartProductQuantity:response.data.productsQuantities}))
      })()
    }
  },[userInfo])

  if (isLoading) {
    return (
      <div className="w-screen h-screen absolute top-0 flex justify-center items-center bg-gray-800/70">
        <div className="animate-spin w-10 h-10 bg-transparent rounded-full border-4 border-t-transparent "></div>
      </div>
    );
  }

  
  return (
    <>
      <Navbar />
      <div className="mt-16">{isLoading ? <p>Loading...</p> : <Outlet />}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
