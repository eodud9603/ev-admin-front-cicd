
import { OperatorType, YNType } from "src/api/api.interface";
import { TChargerModeKeys, TChargerRationKeys, TChargerTypeKeys, TInfprotocolStatusKeys, TInstallGubunKeys, TInstallTypeKeys, TOperationStatusKeys, TPgCodeKeys, TQrTypeKeys, TReservationTypeKeys } from "src/constants/status";

/* 충전기별 충전기 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EC%86%8C%EB%B3%84_%EC%B6%A9%EC%A0%84%EA%B8%B0_%EB%AA%A9%EB%A1%9D_%EC%A1%B0%ED%9A%8C */
export interface IRequestChargerListByStation {
  stationId: string;
}

export interface IChargerListByStationItem {
  id: number;
  station: string;
  chargerKey: string;
  operationStatus: TOperationStatusKeys;
  mode: TChargerModeKeys;
  status: TChargerModeKeys;
  type: TChargerRationKeys;
  chargerClass: TChargerRationKeys;
  isConnection: YNType;
}

export type IChargerListByStationResponse = IChargerListByStationItem[]

/* 충전기 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%AA%A9%EB%A1%9D_%EC%A1%B0%ED%9A%8C_2 */
export interface IRequestChargerList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number // 0부터 시작
  sort: "StationName" | "StationKey" | "CreatedDate";
  sido?: string;
  gugun?: string;
  dong?: string;
  searchType?: "StationName" | "StationKey" | "Address";
  searchKeyword?: string;
  operation?: string;
  operationStatus?: TOperationStatusKeys;
}

export interface IChargerListItem {
  region: string;
  operator: OperatorType;
  stationName: string;
  stationAddress: string;
  stationId: string;
  chargerKey: string; /* 충전소별 충전기 키 */
  searchKey: number; /* 충전기 키(충전기 고유값) */
  chargerClass: TChargerRationKeys;
  type: TChargerTypeKeys;
  status: TChargerModeKeys;
  lastConnection: string;
  assetNumber: number;
  nowChargingStartTime: string;
  lastChargingStartTime: string;
  lastChargingEndTime: string;
  operationStatus: TOperationStatusKeys;
  isConnection: YNType;
}

export interface IChargerListResponse {
  elements: IChargerListItem[];
  totalElements: number;
  totalPages: number;
}

/* 충전기 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_%EC%A1%B0%ED%9A%8C */
export interface IRequestChargerDetail {
  searchKey: number;
}

interface IStationItem {
  id?: number; /* 충전소 내부 관리 ID */
  stationKey: string; /* 충전기 고유키 */
  stationName: string;
  operationStatus: TOperationStatusKeys;
  roamingNumber: string;
  region: string;
  zoneCode: string;
  addressRoad: string;
  addressJibun: string;
  sigunguCode: string;
  lat: number;
  lng: number;
  operatingTime: string;
  isHidden: YNType;
  etcInfo: string;
  memo: string;
  updateDate: string;
  isKakako: YNType;
}

interface IModemItem {
  id?: number; /* 모뎀 관리 ID 등록시 없어야함 */
  openNumber: string;
  company: string;
  companyPhone: string;
  name: string;
  sn: string;
  carrierName: string;
  commFee: string;
  openCompany: string;
  openCompanyPhone: string;
}

interface IInstallItem {
  id?: number; /* 설치 관리 ID 등록시 없어야함 */
  gubun: TInstallGubunKeys;
  companyName: string;
  yyyy: string;
  mm: string;
  serverDomain: string;
  serverPort: number;
  sn: string;
  hasTr: string;
  fwVer: string;
  fwVerCurrent: string;
  modem?: IModemItem;

}
export interface IChargerDetailResponse {
  id?: number; /* 충전기 고유 ID 등록시 없어야함 */
  assetNumber: number;
  chargerKey?: number;
  chargerClass: TChargerRationKeys;
  installType: TInstallTypeKeys;
  capacity: string;
  isDualChannel: YNType;
  channelType01: string;
  channelType02: string;
  envVersion: string;
  consignmentGubun: string;
  useCode: string;
  consignmentName: string;
  operationStatus: TOperationStatusKeys;
  isBroken: YNType;
  status: TChargerModeKeys;
  hasPgTerm: string;
  pgCode: TPgCodeKeys;
  pgName: string;
  infProtocol: TInfprotocolStatusKeys;
  maxChargeTime: number;
  idleCommunicationTime: number;
  busyCommunicationTime: number;
  isKepcoRoaming: YNType;
  searchKey?: number; /* 충전기 고유 키 */
  qrType: TQrTypeKeys;
  reservationType: TReservationTypeKeys;
  etcInfo: string; /* 특이사항 */
  isRoaming: YNType;
  unitPrice: number;
  station?: IStationItem;
  install?: IInstallItem;
  manufactureId: number;
  manufactureCode: string;
  manufactureName: string;
  modelId: number;
  model: string;
  type: TChargerTypeKeys;
  enableCharging: YNType;
}

/* 충전기 등록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_3 */
export interface IRequestChargerRegister extends Omit<IChargerDetailResponse, "station"> {
  station?: {
    stationKey: string;
  }
};

/* 충전기 수정 */
/** @see  */
export type IRequestChargerModify = IRequestChargerRegister;