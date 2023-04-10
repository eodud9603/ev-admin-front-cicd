
import { YNType } from "src/api/api.interface";

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
  isUse?: YNType
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
  /* 지도 */
  lat: number;
  lng: number;
  /* 기본정보 */
  stationName: string;
  stationKey?: string; /** 자동생성? */
  location?: string;
  operator?: string; // HEV, JEV
  isUse?: YNType;
  isOpen?: YNType;
  consignmentCompany?: string;
  quickChargerCount?: number;
  standardChargerCount?: number;
  powerSocket?: string;
  powerSocketCount?: number;
  isHidden?: YNType;
  supplyMethod?: string; 
  billDivision?: null; 
  kepcoCustomerNum?: string; 
  meterNum?: null; 
  kepcoFee?: string;
  kepcoOffice?: string;
  kepcoPayment?: string;
  entryDate?: string;
  chargerLocation?: string;
  addressRoad?: string;
  addressJibun?: string;
  sido?: string;
  sigugun?: string;
  dongmyun?: string;
  zoneCode?: string;
  memo?: null;
  etcInfo?: null;
  /* 운영 정보 */
  baseOperationTimeFrom?: string;
  baseOperationTimeTo?: string;
  holidayOperationTimeFrom?: string;
  holidayOperationTimeTo?: string;
  saturdayOperationTimeFrom?: string;
  saturdayOperationTimeTo?: string;
  isParkFeeFree?: string;
}

/* 충전소 등록 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EB%93%B1%EB%A1%9D
 * 타입 및 필수값 미확정 & string 타입 중 Y/N 등 서버 enum 확인 필요
 */
export type IRequestStationRegister  = IStationDetailResponse

/* 충전소 계약 목록 조회 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C
 * 타입 및 필수값 미확정 & string 타입 중 Y/N 등 서버 enum 확인 필요
 */
export interface IRequestStationContractList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number;
  sort: "ContractPlace";

  sido?: string;
  gugun?: string;
  dong?: string;
  contractPlace?: string;
  contractCode?: string;
  isUse?: YNType;
}

export interface IStationContractItem {
  id: number;
  place: string;
  code: string;
  isUse: YNType;
  managerName: string;
  managerPhone: string;
  meStationId: string;
  addressSido: string;
  addressSigugun: string;
  addressDongmyun: string;
  salesCompany: string;
  contractStartDt: string;
  contractEndDt: string;
  contractDt: string;
  createdDate: string;
}

export interface IStationContractListResponse {
  totalElements: number;
  totalPages: number;
  elements: IStationContractItem[];
}

/* 충전소 계약 상세 조회 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EC%83%81%EC%84%B8_2
 * 타입 및 필수값 미확정 & string 타입 중 Y/N 등 서버 enum 확인 필요
 */
export interface IRequestStationContractDetail {
  contractId: number;
}

export interface IStationContractDetailResponse {
  id: number;
  place: string;
  contractorName: string;
  code: string; /* 계약코드 관리 */
  isMeRoaming: YNType;
  // isUse: YNType;
  meStationId?: string;
  contractStartDt: string;
  contractEndDt: string;
  addressSido: string;
  addressSigugun: string;
  addressDongmyun: string;
  managerName: string;
  managerPhone: string;
  salesCompany: string;
  salesManagerName: string;
  salesManagerPhone: string;
  contractInfo: string;
  /** 계약파일 임시 옵셔널 */
  contractFileUrl?: string;
  contractFileName?: string;
  contractDt: string;
  subsidyAgency: string;
  subsidyYyyy: string;
  subsidyAmount: number;
  subsidyRevDt: string;
  costSales: number;
  costConstruct: number;
  esafetyMng: string;
}

/* 충전소 계약 상세 수정 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EC%88%98%EC%A0%95
 * 타입 및 필수값 미확정 & string 타입 중 Y/N 등 서버 enum 확인 필요
 */
export type IRequestStationContractModify = IStationContractDetailResponse

/* 충전소 계약 등록 */
/** 
 * @see http://218.38.12.31:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_2
 * 타입 및 필수값 미확정 & string 타입 중 Y/N 등 서버 enum 확인 필요
 */
export type IRequestStationContractRegister = Omit<IStationContractDetailResponse, "id">