"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,  Folder, Settings, Workflow, Users,
  ArrowRightFromLine, ArrowLeftFromLine
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const links = [
    // { name: "Home", href: "/dashboard", icon: <Home size={18} strokeWidth={1.5} /> },
    { name: "Pages", href: "/dashboard/pages", icon: <Folder size={18} strokeWidth={1.5} /> },
    // { name: "Blogs", href: "/dashboard/blogs", icon: <File size={18} strokeWidth={1.5} /> },
    // { name: "Members", href: "/dashboard/members", icon: <Users size={18} strokeWidth={1.5} /> },
    // { name: "Workspaces", href: "/dashboard/workspaces", icon: <Workflow size={18} strokeWidth={1.5} /> }, 
    // { name: "Second Brain", href: "/dashboard/second_brain", icon: <Brain size={18} strokeWidth={1.5} /> },
    
    { name: "Settings", href: "/dashboard/settings", icon: <Settings size={18} strokeWidth={1.5} /> },
  ];

  return (
    <aside className={`sidebar bg-neutral-200 dark:bg-neutral-900 ${collapsed ? "w-9" : "w-48"} h-screen flex flex-col border-r border-neutral-400 dark:border-neutral-600 transition-all duration-300`}>
      <div className="flex justify-end mx-1 pt-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-neutral-600 dark:text-neutral-300  cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded"
        >
          {collapsed ? <ArrowRightFromLine size={18} /> : <ArrowLeftFromLine size={18} />}
        </button>
      </div>

      <div className="sidebar-content w-full flex flex-col items-start justify-start px-1 py-4 gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`sidebar-link w-fit sm:w-full font-normal text-neutral-700 dark:text-neutral-200 hover:bg-primary-light/40 dark:hover:bg-d-primary-light/40 text-sm transition duration-300 p-1 rounded-md ${
                isActive
                  ? "bg-gradient-to-r from-[rgba(232,245,162,0.3)] to-[rgba(232,245,162,0.8)] border border-neutral-50 dark:border-d-primary-light dark:bg-gradient-to-r dark:from-[rgba(47,58,1,0.2)] dark:to-[rgba(47,58,1,0.8)] text-neutral-700 dark:text-primary-light font-semibold"
                  : ""
              }`}
            >
              <div className={`flex items-center ${collapsed ? "justify-center" : "gap-2"}`}>
                <span
                  className={`text-neutral-600 dark:text-neutral-400 ${
                    isActive ? "text-neutral-700 dark:text-primary-light" : ""
                  }`}
                >
                  {link.icon}
                </span>
                {!collapsed && link.name}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
