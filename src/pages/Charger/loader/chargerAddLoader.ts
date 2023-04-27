import { loadTabData } from "src/utils/loadTabData";
import {
  TCapacityKeys,
  TChargerModeKeys,
  TChargerRationKeys,
  TChargerTypeKeys,
  TInfprotocolStatusKeys,
  TInstallGubunKeys,
  TInstallTypeKeys,
  TOperationStatusKeys,
  TPgCodeKeys,
  TQrTypeKeys,
  TReservationTypeKeys,
  TUseCodeKeys,
} from "src/constants/status";
import { YNType } from "src/api/api.interface";

export const INIT_CHARGER_ADD = {
  /* 기본정보 */
  inputs: {
    chargerKey: "",
    assetNumber: "",
    chargerClass: "" as TChargerRationKeys,
    installType: "" as TInstallTypeKeys, 
    capacity: "" as `${TCapacityKeys}`,
    isDualChannel: "N" as YNType,
    channelType01: "",
    channelType02: "",
    envVersion: "",
    consignmentGubun: "",
    useCode: "" as TUseCodeKeys,
    consignmentName: "",
    manufactureId: "",
    manufactureCode: "",
    manufactureName: "",
    modelId: "", 
    model: "", 
    operationStatus: "" as TOperationStatusKeys,
    type: "" as TChargerTypeKeys,
    isBroken: "" as YNType,
    status: "" as TChargerModeKeys,
    hasPgTerm: "" as YNType,
    pgCode: "" as TPgCodeKeys,
    pgName: "",
    infProtocol: "" as TInfprotocolStatusKeys,
    maxChargeTime: "",
    idleCommunicationTime: "",
    busyCommunicationTime: "",
    isMeRoaming: "" as YNType,
    isKepcoRoaming: "" as YNType,
    enableCharging: "" as YNType,
    unitPrice: "",
    qrType: "" as TQrTypeKeys,
    reservationType: "" as TReservationTypeKeys,
    etcInfo: "",
  },
  /* 충전소 정보 */
  stationInputs: {
    chargerStationName: "",
    stationKey: "",
  },
  /* 설치 정보 */
  installInputs: {
    gubun: "" as TInstallGubunKeys,
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
