import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const ProfileSidebar = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link href={"/dashboard/profile"}>
        <Button variant="ghost">Profile</Button>
      </Link>
      <Link href={"/dashboard/profile/usage"}>
        <Button variant="ghost">Usage</Button>
      </Link>
      <Link href={"/dashboard/profile/transaction"}>
        <Button variant="ghost">Transaction</Button>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
