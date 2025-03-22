import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeNavbar = async () => {
  return (
    <div className="shadow border-b flex justify-between p-2 sticky top-0 left-0 bg-white">
      <div className="flex gap-4">
        <Link href={"/"}>
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href={"/contact"}>
          <Button variant="ghost">Contact</Button>
        </Link>
        <Link href={"/about"}>
          <Button variant="ghost">About Us</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavbar;
