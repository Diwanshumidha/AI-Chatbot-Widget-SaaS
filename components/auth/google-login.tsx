"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const GoogleLogin = () => {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      size="lg"
      variant="outline"
      className="w-full mt-3 space-x-3"
    >
      <FcGoogle size={20} />
      <span>Sign in with Google</span>
    </Button>
  );
};
