"use client";
import UserInput from "@/components/user-input";
import Image from "next/image";
import React, { useState } from "react";

const DashboardPage = () => {
  const [imageStyle, setImageStyle] = useState("hyper");
  const handleImageStyle = (e: string) => {
    setImageStyle(e);
  };
  return (
    <div className="flex h-full">
      <div className="w-[50%] overflow-y-scroll relative user-input-scrollbar">
        <UserInput handleImageStyle={handleImageStyle} />
      </div>
      <div className="w-[50%] flex">
        <div className="relative w-auto h-full flex-1">
          <Image src={`/images/styles/${imageStyle}.png`} alt="Thumbnail" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
