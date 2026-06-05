import { createBrowserRouter } from "react-router";
import { AuthGuard } from "./middleware";

import LandingLayout from "@/layout/landing-layout";

import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import LandingPage from "@/pages/landing-page";
import AllRequestPage from "@/pages/all-request-page";
import DashboardLayout from "@/layout/dashboard-layout";
import BloodRequestPage from "@/pages/blood-request-page";


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

    element: <DashboardLayout />,
    children: [
      {
        path: "all-request",
        element: <AllRequestPage />,
      },
      
    ],
  },
]);
