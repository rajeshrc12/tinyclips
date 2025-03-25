"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaCopy, FaDownload, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const VideoDetailPage = () => {
  const router = useRouter();

  // Sample video data - in reality you'd fetch this based on ID from router.query
  const video = {
    id: 1,
    title: "Tech Innovation Explained",
    videoUrl: "https://s3.ap-northeast-1.wasabisys.com/tinyclips/video/bbca6834-59ba-4cc7-8482-04d16ebf7f30.mp4",
    script:
      "Exploring the future of technology and how it's transforming our daily lives through innovative solutions. This video examines breakthroughs in AI, renewable energy, and space exploration that are reshaping our world. The pace of technological advancement continues to accelerate, bringing both opportunities and challenges that we must navigate carefully.",
    imageStyle: "Digital Art",
    voice: "Alex (English-US)",
    tags: ["technology", "innovation", "future"],
    createdAt: "March 25, 2023",
    duration: "2:45",
  };

  return (
    <div className="min-h-screen">
      {/* Navbar - matches your existing design */}
      <nav className="bg-white shadow-sm py-3 px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => router.push("/showcase")} className="flex items-center text-gray-600 hover:text-orange-600">
            <FaArrowLeft className="mr-2" />
            Back to Gallery
          </button>
          <Button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 text-sm">Create New</Button>
        </div>
      </nav>

      {/* Video Detail Content */}
      <main className="py-6 px-4">
        <div className="flex gap-6 justify-center">
          {/* Video Player Section (Left) */}
          <div className="h-full w-[20vw]">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative bg-black">
                <video
                  id="video-player"
                  src={
                    "https://s3.ap-northeast-1.wasabisys.com/tinyclips/video/bbca6834-59ba-4cc7-8482-04d16ebf7f30.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=UYE9V2NW6JSSZHHDKCEN%2F20250325%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250325T121315Z&X-Amz-Expires=39600&X-Amz-Signature=6dd9115ca21d7351a12deacf7f4a09610e4b7cd2c6ee7974ee6e41584cc61ff9&X-Amz-SignedHeaders=host&x-id=GetObject"
                  }
                  controls
                />
              </div>
            </div>
          </div>

          {/* Script & Details Section (Right) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Video Details</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Image Style</h3>
                  <p className="text-sm text-gray-800">{video.imageStyle}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Voice</h3>
                  <p className="text-sm text-gray-800">{video.voice}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Full Script</h3>
                  <div className="relative">
                    <textarea readOnly value={video.script} className="w-full p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700 resize-none" rows={8} />
                    <Button variant="outline" size="sm" className="absolute bottom-2 right-2" onClick={() => navigator.clipboard.writeText(video.script)}>
                      <FaCopy className="mr-1" /> Copy
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button variant="outline" className="flex-1">
                    <FaDownload className="mr-2" /> Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoDetailPage;
