import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SignOut from "@/components/sign-out";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const Navbar = async () => {
  const session = await auth();
  let userResponse = null;

  if (session?.user?.email) {
    userResponse = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  return (
    <div className="shadow border-b flex justify-between items-center p-4 sticky top-0 left-0 z-10 bg-white">
      {/* Left Side - Navigation */}
      <div className="flex gap-4">
        <Link href={"/dashboard"}>
          <Button variant="ghost" className="text-gray-700 hover:text-black">
            Create
          </Button>
        </Link>
        <Link href={"/dashboard/video"}>
          <Button variant="ghost" className="text-gray-700 hover:text-black">
            Videos
          </Button>
        </Link>
      </div>

      {/* Right Side - Balance & User Profile */}
      <div className="flex items-center gap-4">
        {/* Balance Display (Now Outside the Popover) */}
        {userResponse?.balance !== undefined && (
          <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-lg shadow-sm">
            Balance: <span className="font-semibold">${userResponse.balance}</span>
          </div>
        )}

        {/* User Avatar with Popover */}
        {session?.user?.image && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="w-10 h-10 border border-gray-300 cursor-pointer">
                <AvatarImage src={session.user.image} alt="User Avatar" />
                <AvatarFallback className="bg-gray-200 text-gray-600">{session.user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            {/* Popover Content */}
            <PopoverContent className="w-36 bg-white shadow-lg rounded-lg p-2">
              <Link href={"/dashboard/profile"}>
                <Button variant="ghost" className="w-full text-left">
                  Profile
                </Button>
              </Link>
              <SignOut />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
