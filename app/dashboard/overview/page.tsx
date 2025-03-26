import { Button } from "@/components/ui/button";
import React from "react";

const OverviewPage = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="border p-2">
        <div>Balance : $100</div>
      </div>
      <div className="border p-2">
        <div>Total Usage : $10</div>
      </div>
      <div className="border p-2">
        <div>Total Video : 100</div>
      </div>
      <Button>Add balance</Button>
    </div>
  );
};

export default OverviewPage;
