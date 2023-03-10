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
import Charger from "src/pages/Charger/Charger";
import ChargerContract from "src/pages/Charger/ChargerContract";
import OperatorAccount from "src/pages/Operator/OperatorAccount";
import OperatorCounselor from "src/pages/Operator/OperatorCounselor";
import OperatorRole from "src/pages/Operator/OperatorRole";
import { MemberNormal } from "src/pages/Member/MemberNormal";
import { MemberWithdraw } from "src/pages/Member/MemberWithdraw";
import { MemberNormalCard } from "src/pages/Member/MemberNormalCard";
import { MemberRoamingCard } from "src/pages/Member/MemberRoamingCard";
import { MemberAuthReject } from "src/pages/Member/MemberAuthReject";
import { MemberGroup } from "src/pages/Member/MemberGroup";
import { MemberCorporation } from "src/pages/Member/MemberCorporation";
import { MemberContract } from "src/pages/Member/MemberContract";
import { CounselingCustomer } from "src/pages/Counseling/CounselingCustomer";

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
    path: "/charger/contract",
    element: <ChargerContract />,
  },
  { path: "/charger/trouble", element: <ChargerTrouble /> },
  { path: "/charger/manufacturer", element: <ChargerManufacturer /> },
  { path: "/charger/operator", element: <ChargerOperator /> },

  { path: "/member/normal", element: <MemberNormal /> },
  { path: "/member/withdraw", element: <MemberWithdraw /> },
  { path: "/member/card/normal", element: <MemberNormalCard /> },
  { path: "/member/card/roaming", element: <MemberRoamingCard /> },
  { path: "/member/reject", element: <MemberAuthReject /> },
  { path: "/member/group", element: <MemberGroup /> },
  { path: "/member/corporation", element: <MemberCorporation /> },
  { path: "/member/contract", element: <MemberContract /> },

  { path: "/operator/account", element: <OperatorAccount /> },
  { path: "/operator/counselor", element: <OperatorCounselor /> },
  { path: "/operator/role", element: <OperatorRole /> },
  // { path: "/member/card", element: <ChargerOperator /> },
  // { path: "/member/card", element: <ChargerOperator /> },

  { path: "/counseling/customer", element: <CounselingCustomer /> },
  { path: "/counseling/history", element: <CounselingCustomer /> },
  { path: "/counseling/management", element: <CounselingCustomer /> },
];

const authRoutes: Array<RouteProps> = [
  // { path: "/login2", element: <Login2 /> },
  // { path: "/pages-500", element: <Error500 /> },
];

export { userRoutes, authRoutes };
