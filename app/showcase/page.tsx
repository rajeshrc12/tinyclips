"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { data } from "@/public/data";

const CLOUDFARE_R2_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFARE_R2_PUBLIC_BASE_URL!;

const ShowcasePage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (video: string) => {
    setSelectedVideo(video);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src={"/images/logo.png"} height={30} width={30} alt="Logo.png" />

            <span className="text-lg font-bold text-gray-800">Tinyclips</span>
          </Link>

          <Link href="/login">
            <Button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 text-sm font-medium shadow-sm transition-colors">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Video Grid */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Video Showcase</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((video, index) => (
            <div
              key={index}
              onClick={() => openDialog(video)}
              className="group cursor-pointer h-80 rounded-xl shadow-md bg-white overflow-hidden relative transition-transform hover:scale-105 hover:shadow-lg"
            >
              {/* Video Thumbnail */}
              <div className="relative h-full w-full">
                <Image
                  unoptimized
                  src={`${CLOUDFARE_R2_PUBLIC_BASE_URL}/image/${video}.png`}
                  alt={`Video ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white bg-opacity-80 p-3 rounded-full">
                    <FaPlay size={24} className="text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-medium truncate">Video {index + 1}</h3>
                {/* <p className="text-gray-300 text-sm">Adam • Hyper-realistic</p> */}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-h-[90vh] h-[90vh] w-[95vw] mx-auto sm:w-auto">
          <DialogTitle></DialogTitle>
          <div className="relative h-full w-full flex flex-col">
            {/* Video Container - Maintains aspect ratio */}
            <div className="relative flex-1 flex items-center justify-center">
              {selectedVideo && <video className="h-full max-h-[90vh] w-full object-contain" controls autoPlay playsInline src={`${CLOUDFARE_R2_PUBLIC_BASE_URL}/video/${selectedVideo}.mp4`} />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowcasePage;
