import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  HeartPulseIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";

import { Link } from "react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import useAuthStore from "@/zustand/auth-zustand";

const links = [
  {
    name: "Home",
    href: "",
  },
  {
    name: "Donors",
    href: "",
  },
  {
    name: "About",
    href: "",
  },
  {
    name: "Contact",
    href: "",
  },
];

export const NavBar = () => {
  const { user, isLoading, logout } = useAuthStore();

  return (
    <nav className="border-b border-border sticky top-0 bg-background/80 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex gap-2">
          <img src={"/logo.svg"} width={30} height={20} alt="logo" />
          <h1 className="font-bold text-xl text-primary">RedLink</h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className="relative pb-1 group transition-all duration-300">
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full origin-left group-hover:origin-left hover:origin-right"></span>
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          {isLoading ? (
            <Spinner />
          ) : user ? (
            <div className="gap-3 flex">
              <Link to={"/dashboard"}>
                <Button variant={"secondary"}>
                  <LayoutDashboardIcon />
                  Dashboard
                </Button>
              </Link>
              <Button variant={"destructive"} onClick={() => logout()}>
                <LogOutIcon />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant={"outline"} asChild>
                <Link to={"/Sign-in"}>
                  <LogInIcon />
                  Sign-In
                </Link>
              </Button>
              <Button asChild>
                <Link to={"/Sign-up"}>
                  <HeartPulseIcon />
                  Become Donor
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
