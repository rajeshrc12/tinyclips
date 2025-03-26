import { Button } from "@/components/ui/button";
import React from "react";
import { FaWallet, FaChartLine, FaVideo, FaPlus, FaUser } from "react-icons/fa";

const OverviewPage = () => {
  const userName = "John Doe";
  const userEmail = "john.doe@example.com";

  return (
    <div className="space-y-6 p-4">
      {/* User Profile Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-full">
            <FaUser className="text-amber-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">{userName}</h2>
            <p className="text-gray-600">{userEmail}</p>
          </div>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2 text-white">
          <FaPlus />
          <span>Add balance</span>
        </Button>
      </div>

      {/* Stats Cards Section */}
      <div className="flex flex-wrap gap-4">
        {/* Balance Card */}
        <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full sm:w-auto min-w-[200px] flex-1">
          <div className="flex items-center gap-2 text-black font-medium mb-1">
            <FaWallet className="text-lg text-amber-600" />
            <span>Balance</span>
          </div>
          <div className="text-2xl font-bold text-black">$100</div>
        </div>

        {/* Total Usage Card */}
        <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full sm:w-auto min-w-[200px] flex-1">
          <div className="flex items-center gap-2 text-black font-medium mb-1">
            <FaChartLine className="text-lg text-orange-600" />
            <span>Total Usage</span>
          </div>
          <div className="text-2xl font-bold text-black">$10</div>
        </div>

        {/* Total Video Card */}
        <div className="border border-red-200 bg-red-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full sm:w-auto min-w-[200px] flex-1">
          <div className="flex items-center gap-2 text-black font-medium mb-1">
            <FaVideo className="text-lg text-red-600" />
            <span>Total Videos</span>
          </div>
          <div className="text-2xl font-bold text-black">100</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
