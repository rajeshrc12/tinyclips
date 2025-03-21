import SignIn from "@/components/sign-in";
import React from "react";

export default async function Login() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border shadow p-5">
        {" "}
        <div>Login</div>
        <SignIn />
      </div>
    </div>
  );
}
