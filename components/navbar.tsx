import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between h-full px-2">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"https://raw.githubusercontent.com/rajeshrc12/tinyclips-public-files/main/images/logo.png"} height={30} width={30} alt="Logo.png" />
        <span className="text-base font-bold">Tinyclips</span>
      </Link>
    </div>
  );
};

export default Navbar;
