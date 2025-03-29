"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSWR from "swr";
import axios from "axios";
import { Payment } from "@prisma/client";
import Status from "@/components/status";
import Loader from "@/components/loader";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

// Available page size options
const PAGE_SIZE_OPTIONS = [3, 5, 10, 20];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Fetch videos with pagination
  const { data, error, isLoading, mutate } = useSWR(`/api/dashboard/payment?page=${currentPage}&limit=${itemsPerPage}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });

  if (isLoading || !data || !data?.videos) return <Loader />;
  if (error) return <p>Error loading payments</p>;

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
  // Format currency for display
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };
  return (
    <div className="space-y-4">
      <div className="font-bold text-3xl">My payment</div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            mutate();
            toast.success("Payments refreshed");
          }} // Refresh balance when clicked
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          <RotateCcw size={18} />
        </Button>
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
        <TableCaption>A list of payment.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sr</TableHead>
            <TableHead>Payment ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.videos.map((payment: Payment, index: number) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{payment.paymentId}</TableCell>
              <TableCell>{formatCurrency(payment.amount, payment.currency)}</TableCell>
              <TableCell>
                <Status status={payment.status} />
              </TableCell>
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

export default PaymentPage;
