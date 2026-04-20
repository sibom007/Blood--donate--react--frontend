import type { UserRole } from "@/feature/auth/type";
import useAuthStore from "@/zustand/auth-zustand";
import { Navigate, useLocation } from "react-router";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
}

export function AuthGuard({
  children,
  requireAuth = true,
  requiredRole,
}: AuthGuardProps) {
  const location = useLocation();

  // Get state from Zustand instead of Cookies
  const { accessToken, user } = useAuthStore();

  const isAuthenticated = !!accessToken;
  const userRole = user?.role;

  // 1. Guest-only check
  if (isAuthenticated && !requireAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  // 2. Auth check
  if (!isAuthenticated && requireAuth) {
    return <Navigate to={`/sign-in?redirect=${location.pathname}`} replace />;
  }

  // 3. Role check
  if (isAuthenticated && requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!userRole || !roles.includes(userRole as UserRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
