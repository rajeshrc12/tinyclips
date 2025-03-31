"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react"; // React Icons
import { fetcher } from "@/utils/api";
import { toast } from "sonner";
import Link from "next/link";

const UserBalance = () => {
  const { data, mutate } = useSWR("/api/dashboard/balance", fetcher);

  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard/overview">
        {" "}
        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2">
          {!data?.balance ? "Refreshing..." : `Balance: ${data?.balance || 0} $`}
        </Button>
      </Link>

      <Button
        variant="outline"
        onClick={() => {
          mutate();
          toast.success("Balance refreshed");
        }} // Refresh balance when clicked
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        <RotateCcw size={18} />
      </Button>
    </div>
  );
};

export default UserBalance;
