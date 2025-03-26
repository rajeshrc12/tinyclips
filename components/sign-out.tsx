import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="w-full justify-start px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100" variant="ghost">
        <span className="flex items-center gap-3">
          <FaSignOutAlt className="h-4 w-4 text-gray-500" />
          Sign Out
        </span>
      </Button>
    </form>
  );
}
