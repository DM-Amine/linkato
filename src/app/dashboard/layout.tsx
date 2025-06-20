import React from 'react';
import NavbarMain from '@/components/dashboard/navbar';
import Sidebar from '@/components/dashboard/sidebar';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="dashboard-layout h-screen overflow-y-hidden">
        {/*  Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-fit">
          <NavbarMain />
        </div> 
      
        <div className="flex pt-11 h-full">
          {/*  Sidebar */}
         <div className="w-fit  h-full z-40 flex">
  <Sidebar />
</div>

      
          {/* Main  */}
          <main className="max-w-full text-neutral-800 dark:text-neutral-200   flex-1 overflow-y-scroll overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
      
    );
};

export default DashboardLayout;