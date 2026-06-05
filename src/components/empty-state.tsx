import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title = "No data found",
  description = "There is nothing to display right now.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-62.5 flex-col items-center justify-center rounded-lg border border-dashed">
      <div className="mb-4">
        {icon || <SearchX className="h-10 w-10 text-muted-foreground" />}
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
