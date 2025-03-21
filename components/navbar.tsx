import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SignOut from "@/components/sign-out";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="shadow border-b flex justify-between p-2">
      <div className="flex gap-4">
        <Link href={"/"}>
          <Button variant="ghost">Create</Button>
        </Link>
        <Link href={"/videos"}>
          <Button variant="ghost">Videos</Button>
        </Link>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-30">
          <SignOut />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
