import { FaUser, FaVideo, FaDollarSign, FaPhotoVideo } from "react-icons/fa";
import { SignOut } from "@/components/sign-out";
import ActiveLink from "@/components/active-link"; // New client component for active link detection

export default function Sidebar() {
  const navItems = [
    { name: "Create Shorts", path: "/dashboard", icon: <FaVideo className="h-4 w-4" /> },
    { name: "Add Balance", path: "/dashboard/overview", icon: <FaUser className="h-4 w-4" /> },
    { name: "My Videos", path: "/dashboard/video", icon: <FaPhotoVideo className="h-4 w-4" /> },
    { name: "Payments", path: "/dashboard/payment", icon: <FaDollarSign className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full h-full border-r flex flex-col gap-2 p-2 space-y-1">
      {navItems.map((item) => (
        <ActiveLink key={item.path} href={item.path} icon={item.icon} name={item.name} />
      ))}

      <div className="mt-auto mb-4">
        <SignOut /> {/* Ensure SignOut remains a client component */}
      </div>
    </div>
  );
}
