import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-gray-500" />
    </div>
  );
};

export default Loader;
