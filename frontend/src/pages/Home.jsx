import { getCartPorducts } from "@/api/UserRelatedAPI";
import HeroSection from "@/components/HomePageComponents/HeroSection";
import JustForYou from "@/components/HomePageComponents/JustForYou";
import ProcessToGetProduct from "@/components/HomePageComponents/ProcessToGetProduct";
import SomeProducts from "@/components/HomePageComponents/SomeProducts";
import SubscribeToGetDiscount from "@/components/HomePageComponents/SubscribeToGetDiscount";
import Testimonial from "@/components/HomePageComponents/Testimonial";
import React from "react";

const Home = React.memo(() => {
  
  return (
    <>
      <div className="relative lg:w-[1000px] mx-auto bg-gray-50">

        {/* Hero Section */}
        <HeroSection />
        {/* some product section */}
        <SomeProducts />
        {/* just for you section */}
        <JustForYou />
        {/* subscribe to get discount section */}
        <SubscribeToGetDiscount />
        {/* testimonial section */}
        <Testimonial />
        {/* process to get product section */}
        <ProcessToGetProduct />{" "}
      </div>
    </>
  );
})

export default Home;
