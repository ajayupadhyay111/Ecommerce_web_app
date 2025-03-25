import Footer from "@/components/Footer";
import ProcessToGetProduct from "@/components/HomePageComponents/ProcessToGetProduct";
import Navbar from "@/components/Navbar";
import { lazy } from "react";

const HeroSection = lazy(() =>
  import("@/components/HomePageComponents/HeroSection")
);
const SomeProducts = lazy(() =>
  import("@/components/HomePageComponents/SomeProducts")
);
const SubscribeToGetDiscount = lazy(() =>
  import("@/components/HomePageComponents/SubscribeToGetDiscount")
);
const Testimonial = lazy(() =>
  import("@/components/HomePageComponents/Testimonial")
);
const JustForYou = lazy(() =>
  import("@/components/HomePageComponents/JustForYou")
);

const Home = () => {
  return (
    <>
      <div className="relative lg:w-[1000px] mx-auto bg-gray-50">
        {/* Navbar */}
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
};

export default Home;
