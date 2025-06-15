"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Folder,
  MessageSquareMore,
  LineChart,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  CornerDownRight,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathParts = pathname.split("/").filter(Boolean);
  const isPageSlug = pathParts[1] === "pages" && pathParts[2];
  const pageSlug = isPageSlug ? pathParts[2] : null;
  const isPagesSection = pathname.startsWith("/dashboard/pages");

  const activeStyles =
    "bg-gradient-to-r from-[rgba(232,245,162,0.3)] to-[rgba(232,245,162,0.8)] border border-neutral-50 dark:border-d-primary-light dark:bg-gradient-to-r dark:from-[rgba(47,58,1,0.2)] dark:to-[rgba(47,58,1,0.8)] text-neutral-700 dark:text-neutral-300 font-semibold";

  return (
    <aside
      className={`sidebar  bg-neutral-200 dark:bg-neutral-900 ${collapsed ? "w-9" : "w-48 absolute sm:static"
        } min-h-screen flex flex-col border-r border-neutral-400 dark:border-neutral-600 transition-all duration-300`}
    >
      {/* Top section: Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-end mx-1 pt-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-neutral-600 dark:text-neutral-300 cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded"
          >
            {collapsed ? (
              <ArrowRightFromLine size={18} />
            ) : (
              <ArrowLeftFromLine size={18} />
            )}
          </button>
        </div>

        <div className="sidebar-content w-full flex flex-col items-start justify-start px-1 py-4 gap-2">
          <div
            className={`w-full flex flex-col gap-1 ${isPagesSection ? activeStyles : ""
              } p-1 rounded-md`}
          >
            <Link
              href="/dashboard/pages"
              className={`sidebar-link w-w-full font-normal text-sm transition duration-300 rounded-md hover:bg-primary/60 dark:hover:bg-d-primary-light/40 px-1 py-0.5 flex items-center ${collapsed ? "justify-center" : "gap-2"
                } text-neutral-700 dark:text-neutral-200`}
            >
              <span className="text-neutral-600 dark:text-neutral-400">
                <Folder size={18} strokeWidth={1.5} />
              </span>
              {!collapsed && "Pages"}
            </Link>

            {pageSlug && (
              <Link
                href={`/dashboard/pages/${pageSlug}`}
                className={`sidebar-sublink max-w-full truncate font-normal text-sm transition duration-300 rounded-md  flex items-center gap-2 
                  ${collapsed ? "justify-center  px-2 py-0.5" : "px-1 py-0.5"
                  }
                  ${pathname.startsWith(`/dashboard/pages/${pageSlug}`)
                    ? "text-neutral-700 dark:text-neutral-200 bg-primary/50 hover:bg-primary/80 dark:bg-neutral-900 hover:dark:bg-neutral-900/60 font-semibold"
                    : "text-neutral-600 dark:text-neutral-300"
                  }`}
              >
                <CornerDownRight
                  className={`${collapsed ? "" : "ml-2"} shrink-0`}
                  size={16}
                />
                {!collapsed && (
                  <span className="truncate max-w-[10rem]">{pageSlug}</span>
                )}
              </Link>
            )}
          </div>

          {pageSlug && (
            <Link
              key="Analytics"
              href={`/dashboard/pages/${pageSlug}/analytics`}
              className={`sidebar-link w-fit sm:w-full font-normal text-sm transition duration-300 p-1 rounded-md ${pathname === `/dashboard/pages/${pageSlug}/analytics`
                  ? activeStyles
                  : "text-neutral-700 dark:text-neutral-200"
                } hover:bg-primary-light/40 dark:hover:bg-d-primary-light/40`}
            >
              <div
                className={`flex items-center ${collapsed ? "justify-center" : "gap-2"
                  }`}
              >
                <span className="text-neutral-600 dark:text-neutral-400">
                  <LineChart size={18} strokeWidth={1.5} />
                </span>
                {!collapsed && "Analytics"}
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Footer: Fixed */}
      <div className="px-1 mb-8 pb-5 ">
        <Link
          href="/dashboard/contact"
          className={`sidebar-link whitespace-nowrap w-fit text-neutral-700 dark:text-neutral-200 sm:w-full font-normal text-sm transition duration-300 rounded-md px-2 py-2 block ${pathname === "/dashboard/contact"
              ? "bg-gradient-to-r from-[rgba(232,245,162,0.3)] to-[rgba(232,245,162,0.8)] border border-neutral-50 dark:border-d-primary-light dark:bg-gradient-to-r dark:from-[rgba(47,58,1,0.2)] dark:to-[rgba(47,58,1,0.8)] text-neutral-700 dark:text-primary-light font-semibold"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-primary-light/40 dark:hover:bg-d-primary-light/40"
            }`}
        >
          <div
            className={`flex items-center   rounded-md ${collapsed ? "justify-center" : "gap-2"
              }`}
          >
            <span className={`${pathname === "/dashboard/contact"
                ? "text-neutral-700 dark:text-primary-light"
                : "text-neutral-700 dark:text-neutral-200"
              }`}>
              <MessageSquareMore size={18} strokeWidth={1.5} />
            </span>
            {!collapsed && "Feedback & Support"}
          </div>
        </Link>
      </div>


    </aside>
  );
};

export default Sidebar;
