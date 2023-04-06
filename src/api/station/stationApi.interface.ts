/* 충전소 목록 조회 */
/** @see http://218.38.12.31:45081/docs/index.html#_%EB%AA%A9%EB%A1%9D_%EC%A1%B0%ED%9A%8C */
export interface IRequestStationList {
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
  isUse?: "Y" | "N";
}

export interface IStationListItem {
  region: string;
  stationNm: string;
  stationId: string;
  address: string;
  isOpen: string;
  operation: string;
  fastCharger: number;
  fullCharger: number;
  createAt: string;
}

export interface IStationListResponse {
  elements: IStationListItem[];
  totalElements: number;
  totalPages: number;
}

/* 충전소 상세 조회 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EC%83%81%EC%
 */
export interface IRequestStationDetail {
  id: string;
}

export interface IStationDetailResponse {
  stationName: string;
  stationKey: string; /** 자동생성? */
  location: string;
  operator: string; // HEV, JEV
  isUse?: "Y" | "N";
  isOpen?: "Y" | "N";
  consignmentCompany: string;
  quickChargerCount: number;
  standardChargerCount: number;
  powerSocket: string;
  powerSocketCount: number;
  isHidden: "Y" | "N"; 
  supplyMethod: string; 
  billDivision: null; 
  kepcoCustomerNum: string; 
  meterNum: null; 
  kepcoFee: string;
  kepcoOffice: string;
  kepcoPayment: string;
  entryDate: string;
  chargerLocation: string;
  addressRoad: string;
  addressJibun: string;
  sido: string;
  sigugun: string;
  dongmyun: string;
  zoneCode: string;
  memo: null;
  etcInfo: null;
  lat: number;
  lng: number;
  isParkFeeFree: string;
  baseOperationTimeFrom: string;
  baseOperationTimeTo: string;
  holidayOperationTimeFrom: string;
  holidayOperationTimeTo: string;
  saturdayOperationTimeFrom: string;
  saturdayOperationTimeTo: string;
}

/* 충전소 등록 조회 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EB%93%B1%EB%A1%9D
 * 타입 및 필수값 미확정 & string 타입 중 Y/N 등 서버 enum 확인 필요
 */
export type IRequestStationRegister  = IStationDetailResponse
