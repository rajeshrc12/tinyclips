import React from "react";

const Status = ({ status }: { status: string }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === "successful" ? "bg-green-100 text-green-800" : status === "failed" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status}
    </span>
  );
};

export default Status;
