"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSWR from "swr";
import { Video } from "@prisma/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Status from "@/components/status";
import { useRouter } from "next/navigation";
import { fetcher } from "@/utils/api";

// Available page size options
const PAGE_SIZE_OPTIONS = [3, 5, 10, 20];

const VideoPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Fetch videos with pagination
  const { data, error, isLoading, mutate } = useSWR(currentPage && itemsPerPage ? `/api/dashboard/video?page=${currentPage}&limit=${itemsPerPage}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });

  if (isLoading || !data || !data?.videos)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  if (error) return <p>Error loading videos</p>;

  // Calculate total pages properly
  const totalPages = Math.ceil(data.total / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="space-y-4">
      <div className="font-bold text-3xl">My videos</div>
      <div className="flex justify-between">
        <Button onClick={mutate}>Refresh</Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Items per page</span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableCaption>A list of generated videos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sr</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Voice</TableHead>
            <TableHead>Speed</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Images</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.videos.map((video: Video, index: number) => (
            <TableRow
              className={video.imageCount ? "cursor-pointer" : "cursor-not-allowed"}
              key={video.id}
              onClick={(e) => {
                e.preventDefault();
                if (video.imageCount) router.push(`video/${video.id}`);
              }}
            >
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell className="max-w-[200px] truncate">{video.prompt}</TableCell>
              <TableCell>{video.imageStyle}</TableCell>
              <TableCell>{video.voiceName}</TableCell>
              <TableCell>{video.voiceSpeed}x</TableCell>
              <TableCell>
                <Status status={video.imageCount === 0 ? "pending" : video.imageCount > 0 ? "successful" : "failed"} />
              </TableCell>
              <TableCell>{video.imageCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, data.total)} of {data.total} videos
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage >= totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
