import { Link, useNavigate } from "react-router";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6 animate-bounce">
        <ShieldAlert className="h-10 w-10" />
      </div>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
        Access Denied
      </h1>

      <p className="mt-4 text-xl text-muted-foreground max-w-md">
        Oops! You don't have the required permissions to view this section of
        RedLink.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {/* Go back to previous page */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>

        {/* Go to main dashboard or home */}
        <Button
          className="flex items-center gap-2"
          icon={<Home className="h-4 w-4" />}>
          <Link to="/dashboard">Dashboard Home</Link>
        </Button>
      </div>

      <span className="mt-12 text-xs text-muted-foreground/60">
        Error Code: 403 Forbidden
      </span>
    </div>
  );
}
