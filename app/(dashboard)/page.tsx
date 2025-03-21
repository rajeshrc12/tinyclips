import { SessionProvider } from "next-auth/react";
import UserInput from "@/components/ui/user-input";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="m-10">
      <SessionProvider>
        <UserInput />
      </SessionProvider>
    </div>
  );
};

export default DashboardPage;
