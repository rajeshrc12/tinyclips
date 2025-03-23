import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SignOut from "@/components/sign-out";
import Link from "next/link";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="shadow border-b flex justify-between p-2 sticky top-0 left-0 z-10 bg-white">
      <div className="flex gap-4">
        <Link href={"/dashboard"}>
          <Button variant="ghost">Create</Button>
        </Link>
        <Link href={"/dashboard/video"}>
          <Button variant="ghost">Videos</Button>
        </Link>
      </div>
      {session?.user?.image && (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src={session.user.image} alt="@shadcn" />
              <AvatarFallback>{session.user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-30">
            <SignOut />
            <Link href={"/dashboard/profile"}>
              <Button variant="ghost">Profile</Button>
            </Link>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default Navbar;
