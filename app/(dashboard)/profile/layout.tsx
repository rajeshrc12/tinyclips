import ProfileSidebar from "@/components/profile-sidebar";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 w-full pt-5">
      <div className="col-span-3">
        <ProfileSidebar />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default ProfileLayout;
