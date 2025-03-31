import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "@/components/sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden" asChild>
        <AiOutlineMenu />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
