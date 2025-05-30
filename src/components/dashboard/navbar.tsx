"use client"
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { usePathname } from "next/navigation";
import UserCard from "./userCard";


export default function Navbar() {
  const pathname = usePathname();
  // Hide the main navigation on the dashboard page
  const hideMainNav = pathname === "/";
  if (hideMainNav) {
    return null;
  }

  return (
    <nav className="px-4 py-1.5 pb-2 flex justify-between items-center bg-neutral-200 dark:bg-neutral-900 border-b border-neutral-400 dark:border-neutral-600">
      <h1 className="text-xl text-neutral-800 dark:text-neutral-200 font-bold">Lunitea</h1>
     
     <div className="flex  items-center justify-between ">
     <ThemeSwitcher/>
    <UserCard/>
     </div>
    </nav>
  );
}