import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-62.5 flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5">
      <AlertTriangle className="mb-4 h-10 w-10 text-destructive" />

      <h3 className="font-semibold text-destructive">{title}</h3>

      <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
        {description}
      </p>

      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
