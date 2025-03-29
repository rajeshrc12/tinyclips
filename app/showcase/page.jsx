"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const videos = Array(12).fill({
  id: 1,
  title: "Video " + Math.floor(Math.random() * 100),
  thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
});

const ShowcasePage = () => {
  const router = useRouter();
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

          <Link href={"/login"}>
            <Button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 text-sm">Login</Button>
          </Link>
        </div>
      </nav>

      <main className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-1 md:p-4 lg:p-10">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => router.push("/video")}
              className="group cursor-pointer h-[60vh] border shadow-lg bg-white rounded-lg flex items-center justify-center overflow-hidden relative"
            >
              {/* Thumbnail Image */}
              <Image src="https://raw.githubusercontent.com/rajeshrc12/tinyclips-public-files/main/images/1.png" alt="Thumbnail" layout="fill" objectFit="cover" />

              {/* Play Icon (Appears on Hover) */}
              <div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaPlay size={50} className="text-white" />
              </div>

              {/* Bottom Overlay Text (Appears on Hover) */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white font-bold p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ReactJS Interview Questions
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowcasePage;
