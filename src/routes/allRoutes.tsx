import React from "react";
import { Navigate } from "react-router-dom";

import { RouteProps } from "react-router/dist/lib/components";
import { MainDashboard } from "src/pages/Main/main";
import { mainLoader } from "src/pages/Main/loader/mainLoader";
import Example from "src/pages/example";
import ChargingStation from "src/pages/Charger/ChargerStation";
import { ChargerTrouble } from "src/pages/Charger/ChargerTrouble";
import { ChargerManufacturer } from "src/pages/Charger/ChargerManufacturer";
import { ChargerOperator } from "src/pages/Charger/ChargerOperator";
import Charger from "src/pages/Charger/\bCharger";
import ChargerStationContract from "src/pages/Charger/ChargerStationContract";

const userRoutes: Array<RouteProps> = [
  { path: "/", index: true, element: <Navigate to="/main/dashboard" /> },
  { path: "/main/dashboard", element: <MainDashboard />, loader: mainLoader },
  { path: "/example", element: <Example /> },
  {
    path: "/charger/chargerStation",
    element: <ChargingStation />,
  },
  {
    path: "/charger/charger",
    element: <Charger />,
  },
  {
    path: "/charger/chargerStationContract",
    element: <ChargerStationContract />,
  },
  { path: "/charger/trouble", element: <ChargerTrouble /> },
  { path: "/charger/manufacturer", element: <ChargerManufacturer /> },
  { path: "/charger/operator", element: <ChargerOperator /> },

  { path: "/member/management", element: <ChargerOperator /> },
  { path: "/member/withdraw", element: <ChargerOperator /> },
  { path: "/member/card", element: <ChargerOperator /> },
  { path: "/member/group", element: <ChargerOperator /> },
  // { path: "/member/card", element: <ChargerOperator /> },
  // { path: "/member/card", element: <ChargerOperator /> },
];

const authRoutes: Array<RouteProps> = [
  // { path: "/login2", element: <Login2 /> },
  // { path: "/pages-500", element: <Error500 /> },
];

export { userRoutes, authRoutes };
