
import { YNType } from "src/api/api.interface";
import { TChargerModeKeys, TChargerRationKeys, TChargerTypeKeys, TOperationStatusKeys } from "src/constants/charger";

/* 충전기별 충전기 목록 조회 */
/** @see http://218.38.12.31:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EC%86%8C%EB%B3%84_%EC%B6%A9%EC%A0%84%EA%B8%B0_%EB%AA%A9%EB%A1%9D_%EC%A1%B0%ED%9A%8C */
export interface IRequestChargerListByStation {
  stationId: string;
}

export interface IChargerListByStationItem {
  id: string;
  station: null;
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
/** @see http://218.38.12.31:45081/docs/index.html#_%EB%AA%A9%EB%A1%9D_%EC%A1%B0%ED%9A%8C_2 */
export interface IRequestChargerList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number // 0부터 시작
  
  sort?: "StationName" | "StationId" | "CrateAt";
  sido?: string;
  gugun?: string;
  dong?: string
  stationNm?: string
  stationId?: string;
  operation?: string;
  operationStatus?: TOperationStatusKeys;
}

export interface IChargerListItem {
  region: string;
  operator: "HEV" | "JEV";
  stationName: string;
  stationId: string;
  chargerKey: string; /* 충전소별 충전기 키 */
  searchKey: number; /* 충전기 키(충전기 고유값) */
  chargerClass: TChargerRationKeys;
  type: TChargerTypeKeys;
  status: TChargerModeKeys;
  lastConnection: string;
  assetNumber: string;
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
/** @see http://218.38.12.31:45081/docs/index.html#_%EC%83%81%EC%84%B8_%EC%A1%B0%ED%9A%8C */
export interface IRequestChargerDetail {
  searchKey: number;
}

export interface IChargerDetailResponse {
  id: number; /* 충전기 고유 ID, 등록시 X */
  assetsNumber: string;
  chargerKey: string;
}
