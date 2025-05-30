"use client";

import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import SignInButton from "../auth/signUpBTN";
import LogintBTN from "../auth/loginBTN";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlignRight, X } from "lucide-react";
import { useState } from "react";
import LogoutBTN from "../auth/logoutBTN";

const links = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
 { name: "Features", href: "/features" },

  { name: "Roadmap", href: "/roadmap" },
  { name: "Price", href: "/price" },
  { name: "Contact", href: "/contact" },
 
];

export default function NavbarMain() {
  const { data: session } = useSession();
  
  
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const hideMainNav =
    pathname.startsWith("/dashboard") || pathname.startsWith("/adminPanel");

  if (hideMainNav) return null;

  return (
    <nav className="relative px-2 py-1.5 pb-2 border-b border-neutral-400 dark:border-neutral-600 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-neutral-800 dark:text-neutral-200 font-bold">
          Lunitea
        </h1>

        {/* Right section (ThemeSwitcher + MobileMenuButton on mobile) */}
        <div className="flex  items-center space-x-2 md:hidden">
          <ThemeSwitcher />
          <Button
          variant={"ghost"}
            className="p-0  h-6 w-6 border border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-400"
            onClick={() => setMenuOpen(true)}
          >
            <AlignRight size={28} />
          </Button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
         {links.map((link) => {
  const isActive = pathname === link.href;
  
  return (
    <Link
      key={link.name}
      href={link.href}
    

      className={`
        text-sm font-semibold transition duration-300 px-2 py-1 rounded-xl
        ${isActive
          ? "bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          : "text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }
      `}
    >
      {link.name}
    </Link>
  );
})}

        </div>

        {/* Auth + ThemeSwitcher on desktop */}
        <div className="hidden md:flex items-center justify-center space-x-2">
          <div className="mt-1 mx-0.5">
            <ThemeSwitcher  />
          </div>
          {session?.user ? (
            <>
              <Link href="/dashboard" >
                <Button
                  variant="ghost"
                  
                  className="text-neutral-800  text-xs border border-neutral-600 dark:text-neutral-200 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800 has-[>svg]:px-1"
                >
                  Dashboard
                </Button>
              </Link>
              <LogoutBTN/>
             
            </>
          ) : (
            <>
              <LogintBTN />
              <SignInButton />
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 z-50 bg-neutral-100 dark:bg-neutral-900 shadow-lg transition-transform duration-300 ease-in-out
          transform ${menuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        <div className="px-2 py-2 space-y-4 flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 border border-neutral-500 rounded-lg focus:bg-neutral-800 focus:text-neutral-200 dark:focus:bg-neutral-200 dark:focus:text-neutral-800"
            >
             <X size={28} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    text-sm font-semibold transition duration-300 px-3 py-2 rounded-xl
                    ${
                      isActive
                        ? "bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-800 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Auth only (ThemeSwitcher is outside) */}
          <div className="mt-auto flex flex-col space-y-2">
            {session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="default"
                    className="w-full text-neutral-800 dark:text-neutral-200 border border-neutral-500 hover:border-neutral-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Button>
                </Link>
                <LogoutBTN/>
              </>
            ) : (
              <>
                <LogintBTN />
                <SignInButton />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
