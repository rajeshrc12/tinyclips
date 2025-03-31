"use client";
import Loader from "@/components/loader";
import UserInput from "@/components/user-input";
import Image from "next/image";
import React, { useState } from "react";

const DashboardPage = () => {
  const [imageStyle, setImageStyle] = useState("hyper");
  const [loading, setLoading] = useState(true);

  const handleImageStyle = (e: string) => {
    setImageStyle(e);
    setLoading(true); // Show loader when image is changing
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/2 overflow-y-scroll relative user-input-scrollbar p-4">
        <UserInput handleImageStyle={handleImageStyle} />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center relative p-4">
        {loading && <Loader />}
        <div className={`relative w-auto h-full flex-1 ${loading ? "opacity-0" : "opacity-100 transition-opacity"}`}>
          <Image priority src={`/images/styles/${imageStyle}.png`} alt="Thumbnail" fill className="object-contain" onLoad={() => setLoading(false)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
