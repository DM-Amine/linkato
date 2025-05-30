"use client";

import AdminPanelNavbar from "@/components/AdminPanel/AdminPanelNavbar";
import Sidebar from "@/components/AdminPanel/Sidebar";



export default function ControlPanelLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="dashboard-layout h-screen overflow-y-hidden">
      {/*  Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-fit">
        <AdminPanelNavbar />
      </div>

      <div className="flex h-full relative">
  {/* Sidebar container  */}
  <div className="z-1">
    <Sidebar />
  </div>

  {/* Main */}
  <main
    className={`
      pt-9 pb-8 flex-1 overflow-y-scroll overflow-x-hidden
      transition-all duration-300
      sm:pl-14 pl-10 lg:pl-0
    `}
  >
    {children}
  </main>
</div>
    </div>
  );
}
