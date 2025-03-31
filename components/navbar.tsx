import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserBalance from "@/components/user-balance";
import MobileSidebar from "@/components/mobile-sidebar";

const Navbar = () => {
  return (
    <div className="flex justify-around sm:justify-between items-center h-full px-2">
      <MobileSidebar />
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/images/logo.png"} height={30} width={30} alt="Logo.png" />
        <span className="text-base font-bold">Tinyclips</span>
      </Link>
      <UserBalance />
    </div>
  );
};

export default Navbar;
