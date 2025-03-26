import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-full px-2">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"https://raw.githubusercontent.com/rajeshrc12/tinyclips-public-files/main/images/logo.png"} height={30} width={30} alt="Logo.png" />
        <span className="text-base font-bold">Tinyclips</span>
      </Link>
      <div>
        <Button className="sticky bottom-0 left-0 w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">Balance: 100$</Button>
      </div>
    </div>
  );
};

export default Navbar;
