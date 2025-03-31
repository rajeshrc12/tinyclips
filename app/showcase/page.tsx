"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { data } from "@/public/data";
const CLOUDFARE_R2_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFARE_R2_PUBLIC_BASE_URL!;

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
          {data.map((video, index) => (
            <div
              key={index}
              onClick={() => router.push("/video")}
              className="group cursor-pointer h-[60vh] border shadow-lg bg-white rounded-lg flex items-center justify-center overflow-hidden relative"
            >
              <Image src={`${CLOUDFARE_R2_PUBLIC_BASE_URL}/image/${video}.png`} alt={`Slide ${index}`} height={600} width={300} priority={index < 3} />

              {/* Play Icon (Appears on Hover) */}
              <div className="absolute flex items-center justify-center transition-opacity duration-300">
                <FaPlay size={50} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowcasePage;
