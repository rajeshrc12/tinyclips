import React from "react";
import { Button } from "./ui/button";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { signIn } from "@/auth";

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit" className="w-full py-6 rounded-xl text-base font-medium shadow-sm hover:shadow-md transition-all" variant="outline">
        <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
        Continue with Google
        <FaArrowRight className="ml-3 h-4 w-4 opacity-70" />
      </Button>
    </form>
  );
};

export default SignIn;
