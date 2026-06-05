import { Loader } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

export function LoadingState({
  title = "Loading...",
  description = "Please wait while we fetch your data.",
}: LoadingStateProps) {
  return (
    <div className="w-full min-h-50 flex flex-col items-center justify-center gap-3 rounded-lg border">
      <Loader className="h-8 w-8 animate-spin text-primary" />

      <div className="text-center">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground ">{description}</p>
      </div>
    </div>
  );
}
