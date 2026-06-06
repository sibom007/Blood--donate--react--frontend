import {  type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import useAuthStore from "@/zustand/auth-zustand";
import type { Role } from "@/types";

interface SidebarLinksProps {
  routes: {
    name: string;
    url: string;
    roles: Role[];
    icon: LucideIcon;
  }[];
  label?: string;
}

export function SidebarLinks({
  routes,
  label = "Personal",
}: SidebarLinksProps) {
  const { user } = useAuthStore();
  const { pathname } = useLocation();

  const filteredRoutes = routes.filter((item) => {
    // If no roles are specified, anyone can see it
    if (!item.roles || item.roles.length === 0) return true;

    // If there is no logged-in user, hide role-restricted items
    if (!user?.role) return false;

    // Check if the user's role is included in the allowed roles array
    return item.roles.includes(user.role);
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {filteredRoutes.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  className="mt-1">
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
