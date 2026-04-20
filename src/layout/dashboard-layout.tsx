import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/feature/dashboard/components/dashboard-sidebar";
import { DashboardTopNav } from "@/feature/dashboard/components/dashboard-top-nav";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <SidebarProvider>
      {/* 1. The actual Sidebar component */}
      <DashboardSidebar />

      {/* 2. SidebarInset handles the padding/offset when the sidebar is open */}

      <SidebarInset className="flex flex-col ">
        {/* 3. Top Navigation sits at the top of the content area */}
        <DashboardTopNav />

        {/* 4. The Outlet renders your page content (AllRequestPage, etc.) */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
