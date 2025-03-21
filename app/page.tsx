import React from "react";
import { auth } from "@/auth";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      Welcome {session?.user?.name}
      <SignOut />
    </div>
  );
}
