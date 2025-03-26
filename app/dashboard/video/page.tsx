"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data based on your Video schema
const videos = [
  {
    id: "1",
    prompt: "A sunset over mountains",
    imageStyle: "photorealistic",
    voiceName: "Emma",
    voiceSpeed: 1.0,
    imageCount: 3,
    userId: "user1",
    createdAt: new Date("2023-10-01"),
  },
  {
    id: "2",
    prompt: "Cyberpunk cityscape",
    imageStyle: "digital art",
    voiceName: "David",
    voiceSpeed: 1.2,
    imageCount: 5,
    userId: "user2",
    createdAt: new Date("2023-10-02"),
  },
  {
    id: "3",
    prompt: "Underwater coral reef",
    imageStyle: "watercolor",
    voiceName: "Sophie",
    voiceSpeed: 0.8,
    imageCount: 2,
    userId: "user1",
    createdAt: new Date("2023-10-03"),
  },
  {
    id: "4",
    prompt: "Medieval castle",
    imageStyle: "fantasy art",
    voiceName: "William",
    voiceSpeed: 1.1,
    imageCount: 4,
    userId: "user3",
    createdAt: new Date("2023-10-04"),
  },
  {
    id: "5",
    prompt: "Space exploration",
    imageStyle: "sci-fi",
    voiceName: "Emma",
    voiceSpeed: 1.0,
    imageCount: 3,
    userId: "user2",
    createdAt: new Date("2023-10-05"),
  },
  {
    id: "6",
    prompt: "Autumn forest",
    imageStyle: "painting",
    voiceName: "Sophie",
    voiceSpeed: 0.9,
    imageCount: 1,
    userId: "user1",
    createdAt: new Date("2023-10-06"),
  },
  {
    id: "7",
    prompt: "Futuristic car design",
    imageStyle: "concept art",
    voiceName: "David",
    voiceSpeed: 1.3,
    imageCount: 3,
    userId: "user3",
    createdAt: new Date("2023-10-07"),
  },
];

// Available page size options
const PAGE_SIZE_OPTIONS = [3, 5, 10, 20];

const VideoPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Calculate total pages
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  // Get current page data
  const currentData = videos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value);
    setItemsPerPage(newItemsPerPage);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="font-bold text-3xl">My videos</div>
      <div className="flex justify-end">
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
            <TableHead>Images</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((video, index) => (
            <TableRow key={video.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="max-w-[200px] truncate">{video.prompt}</TableCell>
              <TableCell>{video.imageStyle}</TableCell>
              <TableCell>{video.voiceName}</TableCell>
              <TableCell>{video.voiceSpeed}x</TableCell>
              <TableCell>{video.imageCount}</TableCell>
              <TableCell>{formatDate(video.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, videos.length)} of {videos.length} videos
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
