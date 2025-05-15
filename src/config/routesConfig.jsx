import React from "react";

// src/config/routesConfig.js
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashBoard from "../pages/DashBoard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AuthSuccess from "../pages/AuthSuccess";
import withAuth from "../hoc/withAuth";

// ✅ First define HOC-wrapped components
const LoginWrapper = withAuth(Login, false);
const SignupWrapper = withAuth(Signup, false);
const DashboardWrapper = withAuth(DashBoard, true);
const ForgotPasswordWrapper = withAuth(ForgotPassword, false);
const ResetPasswordWrapper = withAuth(ResetPassword, false);

// ✅ Then define the route config
const routesConfig = [
  {
    path: "/login",
    element: <LoginWrapper />,
  },
  {
    path: "/signup",
    element: <SignupWrapper />,
  },
  {
    path: "/dashboard",
    element: <DashboardWrapper />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordWrapper />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordWrapper />,
  },
  {
    path: "/oauth-success",
    element: <AuthSuccess />,
  },
  {
    path: "*",
    element: <LoginWrapper />,
  },
];

export default routesConfig;
