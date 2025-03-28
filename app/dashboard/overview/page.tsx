import { auth } from "@/auth";
import Payment from "@/components/payment";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const OverviewPage = async () => {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  return (
    <div className="space-y-6 p-4">
      {/* User Profile Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-full">
            <FaUser className="text-amber-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">{session?.user.name}</h2>
            <p className="text-gray-600">{session?.user.email}</p>
          </div>
        </div>
      </div>
      <Payment />
    </div>
  );
};

export default OverviewPage;
