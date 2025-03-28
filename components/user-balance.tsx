"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react"; // React Icons
import { fetcher } from "@/utils/api";
import { toast } from "sonner";

const UserBalance = () => {
  const { data, mutate, isLoading } = useSWR("/api/dashboard/user", fetcher);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => mutate()} // Fetch latest balance
        className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
      >
        {isLoading ? "Refreshing..." : `Balance: ${data?.balance?.toFixed(3)} $`}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          mutate();
          toast("Balance refreshed");
        }} // Refresh balance when clicked
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        <RotateCcw size={18} />
      </Button>
    </div>
  );
};

export default UserBalance;
