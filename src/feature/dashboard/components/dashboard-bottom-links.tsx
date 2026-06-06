import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { Link } from "react-router"; // Use your routing library's link

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface BottomLinkItem {
  name: string; // Renamed to title for consistency with NavSecondary
  url: string;
  icon: LucideIcon;
}

interface DashboardBottomLinksProps extends React.ComponentPropsWithoutRef<
  typeof SidebarGroup
> {
  items: BottomLinkItem[];
  label: string;
}

export function DashboardBottomLinks({
  items,
  label,
  ...props
}: DashboardBottomLinksProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild size="sm" tooltip={item.name}>
                <Link to={item.url}>
                  <item.icon className="size-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
