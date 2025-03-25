"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Video } from "@prisma/client";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const UsagePage = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of videos per page

  const { data, error, isLoading } = useSWR(`/api/video?page=${page}&limit=${limit}`, fetcher);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load videos.</p>;

  const { videos, total } = data || {};
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Video List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">Sr</th>
              <th className="p-3 border">Prompt</th>
              <th className="p-3 border">Image Style</th>
              <th className="p-3 border">Voice Name</th>
              <th className="p-3 border">Speed</th>
              <th className="p-3 border">Image count</th>
              <th className="p-3 border">Chagres</th>
              <th className="p-3 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {videos?.map((video: Video, index: number) => (
              <tr key={video.id} className="text-center border">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{video.prompt.slice(0, 50)}</td>
                <td className="p-3 border">{video.imageStyle}</td>
                <td className="p-3 border">{video.voiceName}</td>
                <td className="p-3 border">{video.voiceSpeed}</td>
                <td className="p-3 border">{video.imageCount}</td>
                <td className="p-3 border">{video.imageCount * 0.00065}</td>
                <td className="p-3 border">{new Date(video.createdAt).toISOString().split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50">
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{`Page ${page} of ${totalPages}`}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default UsagePage;
