import React from "react";
import { Navigate } from "react-router-dom";

import { RouteProps } from "react-router/dist/lib/components";
import { MainDashboard } from "src/pages/Main/main";
import { mainLoader } from "src/pages/Main/loader/mainLoader";

const userRoutes: Array<RouteProps> = [
  { path: "/", index: true, element: <Navigate to="/main/dashboard" /> },
  { path: "/main/dashboard", element: <MainDashboard />, loader: mainLoader },
];

const authRoutes: Array<RouteProps> = [
  // { path: "/login2", element: <Login2 /> },
  // { path: "/pages-500", element: <Error500 /> },
];

export { userRoutes, authRoutes };
