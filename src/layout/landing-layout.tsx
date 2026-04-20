import { NavBar } from "@/feature/shared/navbar";
import type React from "react";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default LandingLayout;
