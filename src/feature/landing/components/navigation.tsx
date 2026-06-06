import { Button } from "@/components/ui/button";
import useAuthStore from "@/zustand/auth-zustand";

import { motion } from "motion/react";
import {
  DropletsIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOut,
} from "lucide-react";
import { Link } from "react-router";
import { ThemeToggle } from "../../../components/theme-toggle";

export function Navigation() {
  const { user, isLoading, logout } = useAuthStore();

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Why Donate", href: "#why-donate" },
    { label: "Impact", href: "#impact" },
    { label: "Request Blood", href: "#request" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <img alt="logo" src={"/logo.svg"} />
              </motion.div>
            </div>
            <span className="font-bold text-xl text-foreground">RedLink</span>
          </motion.div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ color: "hsl(var(--primary))" }}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {item.label}
              </motion.a>
            ))}
          </div>

          {!user || isLoading ? (
            <div className="flex gap-2.5">
              <ThemeToggle />
              <Link to={"/sign-in"}>
                <Button icon={<LogInIcon />}>sign-in</Button>
              </Link>
              <Button icon={<DropletsIcon />} variant={"outline"}>
                Donate Now
              </Button>
            </div>
          ) : user ? (
            <div className="flex gap-2.5">
              <ThemeToggle />
              <Link to={"/dashboard"}>
                <Button icon={<LayoutDashboardIcon />} isLoading={isLoading}>
                  Dashboard
                </Button>
              </Link>
              <Button
                icon={<LogOut />}
                isLoading={isLoading}
                variant={"destructive"}
                onClick={() => logout()}>
                LogOut
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
