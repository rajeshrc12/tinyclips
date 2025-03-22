import HomeNavbar from "@/components/home-navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeNavbar />
      {children}
    </div>
  );
};

export default HomeLayout;
