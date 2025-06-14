
"use client";

import { Button } from "../ui/button";
import Link from "next/link";

export default function LogintBTN() {
  return (
    <Button
    variant={"ghost"}
    size={"default"}
    className=" text-neutral-800 text-xs border border-neutral-600 hover:border-neutral-400 dark:text-neutral-200 dark:border-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-800 has-[>svg]:px-1"
  >
    <Link href="/auth/login" >
 
    Login
    </Link>
  </Button>
  );
}