"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const videos = Array(12).fill({
  id: 1,
  title: "Video " + Math.floor(Math.random() * 100),
  thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
});

const ShowcasePage = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-3 px-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
            {" "}
            <Image src={"https://raw.githubusercontent.com/rajeshrc12/tinyclips-public-files/main/images/logo.png"} height={30} width={30} alt="Logo.png" />
            <span className="text-base font-bold">Tinyclips</span>
          </Link>

          <Button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 text-xs h-8">
            <FaPlus className="mr-1" /> New
          </Button>
        </div>
      </nav>

      {/* Video Grid - Mobile-sized items */}
      <main className="p-2">
        <div className="grid grid-cols-6 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="h-[50vh] border">
              hello
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowcasePage;
