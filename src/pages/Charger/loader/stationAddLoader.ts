import { loadTabData } from "src/utils/loadTabData";
import { YNType } from "src/api/api.interface";

export const INIT_CHARGER_STATION_ADD = {
  /* 기본정보 */
  stationName: "",
  stationKey: "",
  location: "",
  operator: "HEV",
  isUse: "" as YNType,
  business: "" /* 위탁사업자 > dropdown */,
  directInput: "1" /* 직접입력 check "1": 체크, "0": "미체크" */,
  consignmentCompany: "" /* 위탁사업자명 (input text) */,
  isOpen: "" as YNType,
  quickChargerCount: "",
  standardChargerCount: "",
  powerSocket: "",
  powerSocketCount: "",
  isHidden: "" as YNType,
  supplyMethod: "",
  billDivision: "" as YNType,
  kepcoCustomerNum: "",
  meterNum: "",
  kepcoFee: "",
  kepcoOffice: "",
  kepcoPayment: "",
  entryDate: "",
  chargerLocation: "",
  addressRoad: "",
  zoneCode: "",
  addressJibun: "",
  addressJibunDetail: "",
  memo: "",
  etcInfo: "",
  /* 운영정보 */
  baseOperationTimeFrom: "",
  baseOperationTimeTo: "",
  holidayOperationTimeFrom: "",
  holidayOperationTimeTo: "",
  saturdayOperationTimeFrom: "",
  saturdayOperationTimeTo: "",
  isParkFeeFree: "",
  parkFee: "" /* 수정 필요 필드 */,
  /* 지도 좌표 */
  lat: "",
  lng: "",
  /* 계약정보 */
  contractId: "",
};

export const stationAddLoader = () => {
  const loadData = loadTabData<typeof INIT_CHARGER_STATION_ADD>(
    "/charger/station/add"
  );

  return loadData?.data ?? INIT_CHARGER_STATION_ADD;
};
