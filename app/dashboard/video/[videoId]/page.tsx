"use client";
import { useParams } from "next/navigation";
import React from "react";
import { fetcher } from "@/utils/api";
import useSWR from "swr";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const { data, error, isLoading } = useSWR(videoId ? `/api/dashboard/video/${videoId}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });

  if (!data || isLoading) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading video...</p>;
  }
  if (error) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Error while loading video...</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-7xl flex">
        <Link href={"/dashboard/video"} className="flex items-center text-gray-600 hover:text-orange-600">
          <FaArrowLeft className="mr-2" />
          Back to Videos
        </Link>
      </div>
      <main>
        <div className="flex gap-6 justify-center">
          {/* Video Player Section (Left) */}
          <div className="h-full w-[20vw]">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative bg-black">
                <video id="video-player" src={data?.url} controls />
              </div>
            </div>
          </div>

          {/* Script & Details Section (Right) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-6 h-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Video Details</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Image Style</h3>
                  <p className="text-sm text-gray-800">{data?.imageStyle}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Voice</h3>
                  <p className="text-sm text-gray-800">{data?.voiceName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Full Script</h3>
                  <div className="relative">
                    <textarea readOnly value={data?.prompt} className="w-full p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700 resize-none" rows={8} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoDetailsPage;
