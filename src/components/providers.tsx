import type React from "react";
import { useMemo, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { createHead, UnheadProvider } from "@unhead/react/client";
import { Toaster } from "./ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckCircle2, CircleXIcon } from "lucide-react";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  // Use useMemo so the head instance is created only once for the lifecycle of the app
  const head = useMemo(() => createHead(), []);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <UnheadProvider head={head}>
            {children}
            <Toaster
              closeButton
              icons={{
                success: <CheckCircle2 size={16} className="text-green-500" />,
                error: <CircleXIcon size={16} className="text-red-500" />,
              }}
            />
          </UnheadProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
