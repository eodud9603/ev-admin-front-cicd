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
import { CounselingHistory } from "src/pages/Counseling/CounselingHistory";
import { CounselingManagement } from "src/pages/Counseling/CounselingManagement";
import OperateQnA from "src/pages/Operate/OperateQnA";
import OperateFAQ from "src/pages/Operate/OperateFAQ";
import OperateNotice from "src/pages/Operate/OperateNotice";
import CorporateNotice from "src/pages/Operate/CorporateNotice";
import CorporateQnA from "src/pages/Operate/CorporateQnA";
import Event from "src/pages/Operate/Event";
import EvNews from "src/pages/Operate/EvNews";
import OperatePopup from "src/pages/Operate/OperatePopup";
import InstallCharger from "src/pages/Operate/InstallCharger";
import EvModel from "src/pages/Operate/EvModel";
import OperatePolicy from "src/pages/Operate/OperatePolicy";
import OperateCode from "src/pages/Operate/OperateCode";
import OperateVariable from "src/pages/Operate/OperateVariable";
import OperateSms from "src/pages/Operate/OperateSMS";
import OperateNotificationTalk from "src/pages/Operate/OperateNotificationTalk";
import ChargerStationDetail from "src/pages/Charger/ChargerStationDetail";
import ChargerDetail from "src/pages/Charger/ChargerDetail";
import ChargerContractDetail from "src/pages/Charger/ChargerContractDetail";
import { MemberNormalDetail } from "src/pages/Member/MemberNormalDetail";
import { MemberUsageHistory } from "src/pages/Member/MemberUsageHistory";
import { MemberIssuanceNormalCard } from "src/pages/Member/MemberIssuanceNormalCard";
import OperatorCounselorDetail from "src/pages/Operator/OperatorCounselorDetail";
import OperatorAccountDetail from "src/pages/Operator/OperatorAccountDetail";
import { MemberNormalCardDetail } from "src/pages/Member/MemberNormalCardDetail";
import OperatorCounselorAdd from "src/pages/Operator/OperatorCounselorAdd";
import OperatorAccountAdd from "src/pages/Operator/OperatorAccountAdd";
import ChargerContractAdd from "src/pages/Charger/ChargerContractAdd";
import InstallChargerDetail from "src/pages/Operate/InstallChargerDetail";
import { CounselingHistoryDetail } from "src/pages/Counseling/CounselingHistoryDetail";
import OperateNotificationTalkDetail from "src/pages/Operate/OperateNotificationTalkDetail";
import OperateSMSDetail from "src/pages/Operate/OperateSMSDetail";
import { ChargerTroubleDetail } from "src/pages/Charger/ChargerTroubleDetail";
import { ChargerTroubleRegistration } from "src/pages/Charger/ChargerTroubleRegistration";
import ChargerStationAdd from "src/pages/Charger/ChargerStationAdd";
import ChargerAdd from "src/pages/Charger/ChargerAdd";
import { ChargerManufacturerDetail } from "src/pages/Charger/ChargerManufacturerDetail";

const userRoutes: Array<RouteProps> = [
  { path: "/", index: true, element: <Navigate to="/main/dashboard" /> },
  { path: "/main/dashboard", element: <MainDashboard />, loader: mainLoader },
  { path: "/example", element: <Example /> },
  {
    path: "/charger/chargerStation",
    element: <ChargingStation />,
  },
  {
    path: "/charger/chargerStation/add",
    element: <ChargerStationAdd />,
  },
  {
    path: "/charger/chargerStation/detail/:id",
    element: <ChargerStationDetail />,
  },
  {
    path: "/charger/charger",
    element: <Charger />,
  },
  {
    path: "/charger/add",
    element: <ChargerAdd />,
  },
  {
    path: "/charger/charger/detail/:id",
    element: <ChargerDetail />,
  },
  {
    path: "/charger/contract",
    element: <ChargerContract />,
  },
  {
    path: "/charger/contract/add",
    element: <ChargerContractAdd />,
  },
  {
    path: "/charger/contract/detail/:id",
    element: <ChargerContractDetail />,
  },
  { path: "/charger/trouble", element: <ChargerTrouble /> },
  { path: "/charger/trouble/detail/:id", element: <ChargerTroubleDetail /> },
  {
    path: "/charger/trouble/registration",
    element: <ChargerTroubleRegistration />,
  },
  { path: "/charger/manufacturer", element: <ChargerManufacturer /> },
  {
    path: "/charger/manufacturer/detail/:id",
    element: <ChargerManufacturerDetail />,
  },
  { path: "/charger/operator", element: <ChargerOperator /> },

  { path: "/member/normal", element: <MemberNormal /> },
  { path: "/member/normal/detail/:id", element: <MemberNormalDetail /> },
  { path: "/member/withdraw", element: <MemberWithdraw /> },
  { path: "/member/card/normal", element: <MemberNormalCard /> },
  {
    path: "/member/card/normal/detail/:id",
    element: <MemberNormalCardDetail />,
  },
  { path: "/member/normal/history/:id", element: <MemberUsageHistory /> },
  { path: "/member/card/normal/add", element: <MemberIssuanceNormalCard /> },
  { path: "/member/card/roaming", element: <MemberRoamingCard /> },
  { path: "/member/reject", element: <MemberAuthReject /> },
  { path: "/member/group", element: <MemberGroup /> },
  { path: "/member/corporation", element: <MemberCorporation /> },
  { path: "/member/contract", element: <MemberContract /> },

  { path: "/operate/notice", element: <OperateNotice /> },
  { path: "/operate/qna", element: <OperateQnA /> },
  { path: "/operate/faq", element: <OperateFAQ /> },
  { path: "/operate/corporateNotice", element: <CorporateNotice /> },
  { path: "/operate/corporateQna", element: <CorporateQnA /> },
  { path: "/operate/event", element: <Event /> },
  { path: "/operate/evNews", element: <EvNews /> },
  { path: "/operate/popup", element: <OperatePopup /> },
  { path: "/operate/installCharger", element: <InstallCharger /> },
  {
    path: "/operate/installCharger/detail/:id",
    element: <InstallChargerDetail />,
  },
  { path: "/operate/evModel", element: <EvModel /> },
  { path: "/operate/policy", element: <OperatePolicy /> },
  { path: "/operate/talk", element: <OperateNotificationTalk /> },
  {
    path: "/operate/talk/detail/:id",
    element: <OperateNotificationTalkDetail />,
  },
  { path: "/operate/sms", element: <OperateSms /> },
  { path: "/operate/sms/detail/:id", element: <OperateSMSDetail /> },
  { path: "/operate/variable", element: <OperateVariable /> },
  { path: "/operate/code", element: <OperateCode /> },

  { path: "/operator/account", element: <OperatorAccount /> },
  { path: "/operator/account/add", element: <OperatorAccountAdd /> },
  { path: "/operator/account/detail/:id", element: <OperatorAccountDetail /> },
  { path: "/operator/counselor", element: <OperatorCounselor /> },
  { path: "/operator/counselor/add", element: <OperatorCounselorAdd /> },
  {
    path: "/operator/counselor/detail/:id",
    element: <OperatorCounselorDetail />,
  },
  { path: "/operator/role", element: <OperatorRole /> },

  // { path: "/member/card", element: <ChargerOperator /> },
  // { path: "/member/card", element: <ChargerOperator /> },

  { path: "/counseling/customer", element: <CounselingCustomer /> },
  { path: "/counseling/history", element: <CounselingHistory /> },
  {
    path: "/counseling/history/detail/:id",
    element: <CounselingHistoryDetail />,
  },
  { path: "/counseling/management", element: <CounselingManagement /> },
];

const authRoutes: Array<RouteProps> = [
  // { path: "/login2", element: <Login2 /> },
  // { path: "/pages-500", element: <Error500 /> },
];

export { userRoutes, authRoutes };
