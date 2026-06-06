import { createBrowserRouter } from "react-router";
import { AuthGuard } from "./middleware";

import LandingLayout from "@/layout/landing-layout";

import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import LandingPage from "@/pages/landing-page";
import DashboardLayout from "@/layout/dashboard-layout";
import BloodRequestPage from "@/pages/blood-request-page";
import OwnRequestPage from "@/pages/own-requests-page";
import CheckRequestPage from "@/pages/check-request-page";
import { Role } from "@/feature/auth/types";
import { UnauthorizedPage } from "@/pages/unauthorized-page";

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <LandingLayout>
        <LandingPage />
      </LandingLayout>
    ),
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/request-blood",
    element: (
      <LandingLayout>
        <AuthGuard>
          <BloodRequestPage />,
        </AuthGuard>
      </LandingLayout>
    ),
  },
  {
    path: "/dashboard",

    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "own-requests",
        element: <OwnRequestPage />,
      },
      {
        path: "check-requests",
        element: (
          <AuthGuard requiredRole={Role.OPERATOR || Role.SUPER_ADMIN}>
            <CheckRequestPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);
