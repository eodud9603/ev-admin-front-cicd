
import { YNType } from "src/api/api.interface";
import { TChargerModeKeys, TChargerRationKeys, TChargerTypeKeys, TOperationStatusKeys } from "src/constants/charger";

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
