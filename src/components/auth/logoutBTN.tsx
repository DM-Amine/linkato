
"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogoutBTN() {
  return (
    <Button
    variant={"default"}
   
    onClick={() => signOut({ callbackUrl: "/" })}
    className="bg-primary sm:mt-1 text-xs text-neutral-200 "
  >
    
    Logout
    <LogOut size={16} />
  </Button>
  );
}