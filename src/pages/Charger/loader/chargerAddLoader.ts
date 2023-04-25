import { loadTabData } from "src/utils/loadTabData";
import {
  TChargerModeKeys,
  TChargerRationKeys,
  TChargerTypeKeys,
  TOperationStatusKeys,
} from "src/constants/status";
import { YNType } from "src/api/api.interface";

export const chargerAddLoader = () => {
  const loadData = loadTabData("/charger/charger/add");

  return (
    loadData?.data ?? {
      /* 기본정보 */
      inputs: {
        chargerKey: "",
        assetNumber: "",
        chargerClass: "" as TChargerRationKeys,
        installType: "" as TChargerTypeKeys, // 서버 확인
        capacity: "",
        isDualChannel: "" as YNType,
        channelType01: "",
        channelType02: "",
        envVersion: "",
        consignmentGubun: "",
        useCode: "", // 서버 확인
        consignmentName: "",
        manufacturerId: "", // 서버 확인
        manufacturerName: "", // 서버 확인
        manufacturerModeId: "", // 서버 확인
        manufacturerModelName: "", // 서버 확인
        operationStatus: "" as TOperationStatusKeys, // 서버 확인
        connectorType: "", // 서버 확인
        isBroken: "" as YNType,
        status: "" as TChargerModeKeys,
        hasPgTerm: "",
        pgName: "",
        infProtocol: "",
        maxChargeTime: "",
        idleCommunicationTime: "",
        busyCommunicationTime: "",
        isRoaming: "" as YNType,
        isKepcoRoaming: "" as YNType,
        rechargeAppAvailable: "", // 서버 확인
        contractPrice: "", // 서버 확인
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
        installer: "",
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
    }
  );
};
