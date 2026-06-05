import * as React from "react";
import {
  GitPullRequestIcon,
  LifeBuoy,
  Map,
  PieChart,
  Send,
} from "lucide-react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarLinks } from "./sidebar-links";
import { DashboardBottomLinks } from "./dashboard-bottom-links";
import { DashboardUser } from "./dashboard-user";

// 1. Move data to a separate constant or config file for easier maintenance
const SIDEBAR_DATA = {
  navMain: [
    {
      name: "Own Requests",
      url: "/dashboard/all-request",
      icon: GitPullRequestIcon,
    },
    {
      name: "Assign Requests",
      url: "/dashboard/assign-requests",
      icon: PieChart,
    },
    {
      name: "Logistics",
      url: "/dashboard/travel",
      icon: Map,
    },
  ],
  navSecondary: [
    {
      name: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      name: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {/* Using a Lucide icon as a fallback if logo.svg is missing */}

                <img src={"/logo.svg"} alt="" className="size-7" />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-base">
                    RedLink
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Blood Donation Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Using the logic-heavy section for main links */}
        <SidebarLinks projects={SIDEBAR_DATA.navMain} label="Platform" />

        {/* Secondary links pushed to the bottom with mt-auto */}
        <DashboardBottomLinks
          items={SIDEBAR_DATA.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <DashboardUser />
      </SidebarFooter>

      {/* 2. Added SidebarRail to allow manual resizing/collapsing on desktop */}
      <SidebarRail />
    </Sidebar>
  );
}
