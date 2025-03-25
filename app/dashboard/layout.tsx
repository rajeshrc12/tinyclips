import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="h-16 border-b">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-56 hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
