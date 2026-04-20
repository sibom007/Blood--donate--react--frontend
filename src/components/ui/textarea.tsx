import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Removed 'field-sizing-content' to allow fixed height/scrolling
        "flex w-full rounded-none border border-input bg-transparent px-2.5 py-2 text-xs transition-colors outline-none",
        "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20",
        // Added 'min-h-[120px]' (approx 5 rows) and ensured scroll visibility
        "min-h-30 scrollbar-thin md:text-xs",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
