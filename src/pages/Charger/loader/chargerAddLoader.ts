import { loadTabData } from "src/utils/loadTabData";
import {
  TCapacityKeys,
  TChargerModeKeys,
  TChargerRationKeys,
  TChargerTypeKeys,
  TInfprotocolStatusKeys,
  TOperationStatusKeys,
} from "src/constants/status";
import { YNType } from "src/api/api.interface";

export const INIT_CHARGER_ADD = {
  /* 기본정보 */
  inputs: {
    chargerKey: "",
    assetNumber: "",
    chargerClass: "" as TChargerRationKeys,
    installType: "" as TChargerTypeKeys, // 서버 확인
    capacity: "" as `${TCapacityKeys}`,
    isDualChannel: "N" as YNType,
    channelType01: "",
    channelType02: "",
    envVersion: "",
    consignmentGubun: "",
    useCode: "", // 서버 확인
    consignmentName: "",
    manufactureId: "",
    manufactureCode: "",
    manufactureName: "",
    manufacturerModelId: "", // 서버 확인
    manufacturerModelName: "", // 서버 확인
    operationStatus: "" as TOperationStatusKeys, // 서버 확인
    type: "" as TChargerTypeKeys,
    isBroken: "" as YNType,
    status: "" as TChargerModeKeys,
    hasPgTerm: "",
    pgName: "",
    infProtocol: "" as TInfprotocolStatusKeys,
    maxChargeTime: "",
    idleCommunicationTime: "",
    busyCommunicationTime: "",
    isRoaming: "" as YNType,
    isKepcoRoaming: "" as YNType,
    rechargeAppAvailable: "", // 서버 확인
    unitPrice: "",
    qrType: "",
    reservationType: "",
    etcInfo: "",
  },
  /* 충전소 정보 */
  stationInputs: {
    chargerStationName: "",
    stationKey: "",
  },
  /* 설치 정보 */
  installInputs: {
    gubun: "",
    companyName: "",
    yyyy: "",
    mm: "",
    serverDomain: "",
    serverPort: "",
    sn: "",
    hasTr: "",
    fwVer: "",
    fwVerCurrent: "",
  },
  /* 모뎀 정보 */
  modemInputs: {
    /* 모뎀  */
    openNumber: "",
    company: "",
    companyPhone: "",
    name: "",
    sn: "",
    /* 통신사  */
    carrierName: "",
    commFee: "",
    /* 개통사  */
    openCompany: "",
    openCompanyPhone: "",
  },
};

export const chargerAddLoader = () => {
  const loadData = loadTabData<typeof INIT_CHARGER_ADD>("/charger/charger/add");

  return (
    loadData?.data ?? INIT_CHARGER_ADD
  );
};
