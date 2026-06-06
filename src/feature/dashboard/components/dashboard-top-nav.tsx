"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export const DashboardTopNav = () => {
  const pathname = useLocation().pathname;

  const segments = pathname.split("/").filter(Boolean);

  const paths = segments.map((segment, index) => ({
    name: segment.replace(/-/g, " "),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <header className=" fixed z-10 bg-sidebar  w-full flex h-14 -mt-2
     shrink-0 items-center gap-2 border-b ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 mt-1.5 "
        />

        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((item, index) => {
              const isLast = index === paths.length - 1;

              return (
                <div key={item.href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="capitalize">
                        {item.name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={item.href} className="capitalize">
                          {item.name}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
