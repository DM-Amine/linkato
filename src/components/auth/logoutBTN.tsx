
"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogoutBTN() {
  return (
    <Button
    variant={"default"}
   
    onClick={() => signOut({ callbackUrl: "/" })}
    className=" text-xs"
  >
    
    Logout
    <LogOut size={16} />
  </Button>
  );
}