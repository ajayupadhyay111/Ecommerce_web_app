import React from "react";
import { Button } from "../ui/button";
import { PhoneCall } from "lucide-react";
import HappyCustomer from "../../assets/happyCustomer.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className=" relative mx-auto w-full md:overflow-visible overflow-hidden h-screen lg:w-[1000px] lg:h-[570px] mt-28 lg:mt-20 flex justify-evenly items-center lg:flex-row flex-col ">
      <div className="relative w-full h-1/2 lg:w-1/2 flex lg:h-fit flex-col justify-center items-start md:gap-6 lg:gap-14">
        <div className="flex justify-center items-center lg:justify-end lg:items-start flex-col gap-3 lg:gap-1 h-full mt-10 lg:mt-0 ">
          <h3 className="font-moonDance font-extrabold text-3xl lg:text-4xl/8 text-center">
            Starting At Only $0.5
          </h3>
          <h1 className="text-5xl md:text-6xl px-10 lg:px-0 text-center lg:text-6xl lg:text-start font-semibold uppercase tracking-tighter">
            <span className=" text-blue-700/80">Summer</span> special collection
          </h1>
          <p>Brand day flat 20% off and free shipping</p>
        </div>
        <div className="flex items-center mx-auto mt-2 md:mt-0 gap-2 justify-center lg:justify-start">
          <Button onClick={()=>navigate("/filter")} className="bg-blue-700/80">Shop now</Button>
          <span className="flex items-center">
            <PhoneCall className="text-blue-700/80" /> +(00)-000-000-0000
          </span>
        </div>

        {/* circles */}
        <span className="w-14 h-14 custom-circle absolute top-0 left-[40%]"></span>
        <span className="w-14 h-14 custom-circle absolute top-[20%] right-0"></span>
        <span className="w-14 h-14 custom-circle absolute top-[80%] left-0"></span>
        <span className="w-7 h-7 custom-small-circle lg:block hidden absolute top-[43%] left-[67%]"></span>
      </div>
      <div className=" w-full lg:w-1/2 h-full flex justify-center items-center ">
        <div className="absolute top-[50%] -left-40 w-[120px] h-[120px] ">
          <div className="w-full h-full flex gap-x-5 flex-wrap">
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full "></div>
          </div>
        </div>
        <span className=" lg:block hidden text-[110px] font-bold absolute -right-40 custom-stroke transform rotate-270 ">
          MaMart
        </span>
        <img
          src={HappyCustomer}
          alt=""
          className=" object-contain w-full h-[85%] object-center"
        />
      </div>
    </div>
  );
};

export default HeroSection;
