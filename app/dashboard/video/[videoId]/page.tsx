"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Video } from "@prisma/client";
// Extend Video type with URL
interface ExtendedVideo extends Video {
  url: string;
}
export default function VideoPage() {
  const [data, setData] = useState<ExtendedVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { videoId } = useParams();

  useEffect(() => {
    if (!videoId) return;

    const fetchVideoUrl = async () => {
      try {
        const res = await fetch(`/api/video/${videoId}`);
        const data = (await res.json()) as ExtendedVideo;
        if (data) {
          setData(data);
        } else {
          setError("Failed to fetch video URL");
        }
      } catch {
        setError("An error occurred while fetching the video URL");
      }
    };

    fetchVideoUrl();
  }, [videoId]);

  if (error) {
    return <p className="text-red-500 text-center mt-10 text-lg">{error}</p>;
  }

  if (!data) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading video...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Video Section */}
      <div className="w-[250px]">
        <video controls className="">
          <source src={data.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/3 lg:w-1/2 bg-white shadow-lg rounded-2xl p-6 mx-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">{data.prompt}</h1>
        <p className="text-gray-700">
          <span className="font-medium">Voice:</span> {data.voiceName}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Speed:</span> {data.voiceSpeed}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Style:</span> {data.imageStyle}
        </p>
      </div>
    </div>
  );
}
