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
import OperateNoticeDetail from "src/pages/Operate/OperateNoticeDetail";
import { ChargerManufacturerRegistration } from "src/pages/Charger/ChargerManufacturerRegistration";
import { ChargerOperatorDetail } from "src/pages/Charger/ChargerOperatorDetail";
import { ChargerOperatorRegistration } from "src/pages/Charger/ChargerOperatorRegistration";
import OperateNoticeAdd from "src/pages/Operate/OperateNoticeAdd";
import OperateFAQDetail from "src/pages/Operate/OperateFAQDetail";
import OperateFAQAdd from "src/pages/Operate/OperateFAQAdd";
import CorporateNoticeDetail from "src/pages/Operate/CorporateNoticeDetail";
import CorporateNoticeAdd from "src/pages/Operate/CorporateNoticeAdd";
import EvNewsDetail from "src/pages/Operate/EvNewsDetail";
import EvNewsAdd from "src/pages/Operate/EvNewsAdd";
import { PaymentInRoaming } from "src/pages/Payment/PaymentInRoaming";
import { PaymentInKepco } from "src/pages/Payment/PaymentInKepco";
import { PaymentInCharging } from "src/pages/Payment/PaymentInCharging";
import OperatePopupDetail from "src/pages/Operate/OperatePopupDetail";
import OperatePopupAdd from "src/pages/Operate/OperatePopupAdd";
import OperatePolicyDetail from "src/pages/Operate/OperatePolicyDetail";
import OperatePolicyAdd from "src/pages/Operate/OperatePolicyAdd";
import EventDetail from "src/pages/Operate/EventDetail";
import EventAdd from "src/pages/Operate/EventAdd";
import { PaymentInChargingRegistration } from "src/pages/Payment/PaymentInChargingRegistration";
import { PaymentInChargingDetail } from "src/pages/Payment/PaymentInChargingDetail";
import InstallChargerAdd from "src/pages/Operate/InstallChargerAdd";
import OperateQnADetail from "src/pages/Operate/OperateQnADetail";
import CorporateQnADetail from "src/pages/Operate/CorporateQnADetail";
import { PaymentInKepcoRegistration } from "src/pages/Payment/components/PaymentInKepcoRegistration";
import { SalesTotal } from "src/pages/Sales/SalesTotal";
import { SalesByRegion } from "src/pages/Sales/SalesByRegion";
import { SalesByStation } from "src/pages/Sales/SalesByStation";
import { SalesByCharger } from "src/pages/Sales/SalesByCharger";
import ChargerControl from "src/pages/ChargeMonitoring/ChargerControl";
import IndividualSettlement from "src/pages/Sales/IndividualSettlement";
import TotalSettlement from "src/pages/Sales/TotalSettlement";
import BillingHistory from "src/pages/Sales/BillingHistory";
import { Login } from "src/pages/Login/Login";
import UsageHistoryClaim from "src/pages/UsageHistory/UsageHistoryClaim";
import UsageHistoryRoaming from "src/pages/UsageHistory/UsageHistoryRoaming";
import UsageHistoryRoamingDetail from "src/pages/UsageHistory/UsageHistoryRoamingDetail";
import UsageHistoryClaimDetail from "src/pages/UsageHistory/UsageHistoryClaimDetail";
import RegularMember from "src/pages/Settlement/RegularMember";
import NonMember from "src/pages/Settlement/NonMember";

const userRoutes: Array<RouteProps> = [
  { path: "/", index: true, element: <Navigate to="/main/dashboard" /> },
  { path: "/main/dashboard", element: <MainDashboard />, loader: mainLoader },
  { path: "/example", element: <Example /> },
  { path: "/chargeMonitoring/chargerControl", element: <ChargerControl /> },
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
    path: "/charger/manufacturer/registration",
    element: <ChargerManufacturerRegistration />,
  },
  {
    path: "/charger/manufacturer/detail/:id",
    element: <ChargerManufacturerDetail />,
  },
  { path: "/charger/operator", element: <ChargerOperator /> },
  { path: "/charger/operator/detail/:id", element: <ChargerOperatorDetail /> },
  {
    path: "/charger/operator/registration",
    element: <ChargerOperatorRegistration />,
  },

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
  { path: "/operate/notice/add", element: <OperateNoticeAdd /> },
  { path: "/operate/notice/detail/:id", element: <OperateNoticeDetail /> },
  { path: "/operate/qna", element: <OperateQnA /> },
  { path: "/operate/qna/detail/:id", element: <OperateQnADetail /> },
  { path: "/operate/faq", element: <OperateFAQ /> },
  { path: "/operate/faq/add", element: <OperateFAQAdd /> },
  { path: "/operate/faq/detail/:id", element: <OperateFAQDetail /> },
  { path: "/operate/corporateNotice", element: <CorporateNotice /> },
  { path: "/operate/corporateNotice/add", element: <CorporateNoticeAdd /> },
  {
    path: "/operate/corporateNotice/detail/:id",
    element: <CorporateNoticeDetail />,
  },
  { path: "/operate/corporateQnA", element: <CorporateQnA /> },
  { path: "/operate/corporateQnA/detail/:id", element: <CorporateQnADetail /> },
  { path: "/operate/event", element: <Event /> },
  { path: "/operate/event/add", element: <EventAdd /> },
  { path: "/operate/event/detail/:id", element: <EventDetail /> },
  { path: "/operate/evNews", element: <EvNews /> },
  { path: "/operate/evNews/add", element: <EvNewsAdd /> },
  { path: "/operate/evNews/detail/:id", element: <EvNewsDetail /> },
  { path: "/operate/popup", element: <OperatePopup /> },
  { path: "/operate/popup/add", element: <OperatePopupAdd /> },
  { path: "/operate/popup/detail/:id", element: <OperatePopupDetail /> },
  { path: "/operate/installCharger", element: <InstallCharger /> },
  { path: "/operate/installCharger/add", element: <InstallChargerAdd /> },
  {
    path: "/operate/installCharger/detail/:id",
    element: <InstallChargerDetail />,
  },
  { path: "/operate/evModel", element: <EvModel /> },
  { path: "/operate/policy", element: <OperatePolicy /> },
  { path: "/operate/policy/add", element: <OperatePolicyAdd /> },
  { path: "/operate/policy/detail/:id", element: <OperatePolicyDetail /> },
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

  { path: "/payment/charging", element: <PaymentInCharging /> },
  {
    path: "/payment/charging/detail/:id",
    element: <PaymentInChargingDetail />,
  },
  {
    path: "/payment/charging/registration",
    element: <PaymentInChargingRegistration />,
  },
  { path: "/payment/kepco", element: <PaymentInKepco /> },
  {
    path: "/payment/kepco/registration",
    element: <PaymentInKepcoRegistration />,
  },
  { path: "/payment/roaming", element: <PaymentInRoaming /> },

  //매출 모니터링
  { path: "/sales/individualSettlement", element: <IndividualSettlement /> },
  { path: "/sales/totalSettlement", element: <TotalSettlement /> },
  { path: "/sales/billingHistory", element: <BillingHistory /> },
  { path: "/sales/total", element: <SalesTotal /> },
  { path: "/sales/region", element: <SalesByRegion /> },
  { path: "/sales/station", element: <SalesByStation /> },
  { path: "/sales/charger", element: <SalesByCharger /> },

  /* 정산 관리 */
  { path: "/settlement/regularMember", element: <RegularMember /> },
  { path: "/settlement/nonMember", element: <NonMember /> },

  /* 이용 내역 관리 */
  { path: "/usageHistory/claim", element: <UsageHistoryClaim /> },
  {
    path: "/usageHistory/claim/detail/:id",
    element: <UsageHistoryClaimDetail />,
  },
  { path: "/usageHistory/roaming", element: <UsageHistoryRoaming /> },
  {
    path: "/usageHistory/roaming/detail/:id",
    element: <UsageHistoryRoamingDetail />,
  },
];

const authRoutes: Array<RouteProps> = [
  { path: "login", element: <Login /> },
  // { path: "/login2", element: <Login2 /> },
  // { path: "/pages-500", element: <Error500 /> },
];

export { userRoutes, authRoutes };
