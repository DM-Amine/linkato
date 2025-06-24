"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();

  // Check if the current pathname starts with '/dashboard' or '/adminPanel'
  const reserved = [
    "blogs",
    "features",
    "roadmap",
    "price",
    "contact",
    "dashboard",
    "privacy-policy",
    "terms-of-service",
    "waitlist",
    "thank-you",
    "auth",
    "adminPanel",
    "",
  ];

  const pathSegment = pathname.split("/").filter(Boolean)[0];
  const isDynamicPublicPage = pathname.split("/").filter(Boolean).length === 1 && !reserved.includes(pathSegment);

  const hideFooter =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/adminPanel") ||
    isDynamicPublicPage;


  if (hideFooter) {
    return null; // Return null to hide the footer
  }

  return (
    <footer className="bg-neutral-200 border-t dark:bg-neutral-900 text-neutral-800 border-neutral-400 dark:border-neutral-800 dark:text-neutral-200 ">
      <div className="container mx-auto ">

        <div className="  px-4 border-neutral-400 dark:border-neutral-800 py-3 flex flex-col md:flex-row items-center justify-between text-sm space-y-2 md:space-y-0">
          <p>© {new Date().getFullYear()} Linkato. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="hover:underline flex gap-1"> <Phone width={14} /> contact</Link>


          </div>
          <p>
            Built with <span className="text-red-500">♥</span> by{" "}
            <strong className="font-semibold">@Damine.dev</strong>
          </p>
        </div>
      </div>

     

    </footer>

  );
};

export default Footer;
