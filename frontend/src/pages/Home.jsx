import HeroSection from "@/components/HomePageComponents/HeroSection";
import JustForYou from "@/components/HomePageComponents/JustForYou";
import ProcessToGetProduct from "@/components/HomePageComponents/ProcessToGetProduct";
import SomeProducts from "@/components/HomePageComponents/SomeProducts";
import SubscribeToGetDiscount from "@/components/HomePageComponents/SubscribeToGetDiscount";
import Testimonial from "@/components/HomePageComponents/Testimonial";

import React from "react";
import { useSelector } from "react-redux";


const Home = React.memo(() => {
  const {userInfo} = useSelector(state=>state.auth)
  console.log(userInfo)
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
