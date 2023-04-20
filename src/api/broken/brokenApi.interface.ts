import { OperatorType } from "src/api/api.interface";
import { TBrokenStatus, TChargerProcessingStatus } from "src/constants/status";

/* 충전기 고장/파손 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_2 */
export interface IRequestBrokenList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number; // 0부터 시작
  sort: "StationName" | "CreatedDate";
  sido?: string;
  gugun?: string;
  dong?: string;
  searchType?:
    | "StationName"
    | "StationKey"
    | "SearchKey"
    | "AdminName"
    | "ManagerId";
  searchKeyword?: string;
  submitStartDate?: string;
  submitEndDate?: string;
  operator?: OperatorType;
  status?: TChargerProcessingStatus;
}

export interface IBrokenListItem {
  id: number /* 고유 ID */;
  stationOperator: string;
  stationRegion: string;
  brokenStatus: string /* 처리상태 */;
  adminId: string /* 처리자 */;
  adminName: string;
  managerId: string /* 운영자 */;
  managerName: string;
  reporterName: string;
  stationKey: string /* 충전소 키 */;
  searchKey: string /* 충전기 고유값 */;
  chargerKey: string /* 충전소별 충전기 키 */;
  damagedPart01: string;
  damagedPart02: string;
  stationName: string;
  createDate: string;
}

export interface IBrokenListResponse {
  elements: IBrokenListItem[];
  totalElements: number;
  totalPages: number;
}

/* 충전기 고장/파손 등록 */
/** 
 * @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_4
 * @description 옵션널 임시 추가 (서버/기획 확인 필요, 등록 데이터를 보내지 못하는 데이터)
 *  */
export interface IRequestBrokenRegister {
  adminId?: string;
  adminName?: string;
  managerId?: string;
  managerName?: string;
  reporterName?: string;
  searchKey: number; /* 충전기 고유값 */
  chargerKey: string; /* 충전소별 충전기키 */
  damagedPart01: TBrokenStatus;
  damagedPart02?: TBrokenStatus;
  stationName: string;
  stationKey: string; /* 충전소 고유 키 */
  brokenContent?: string; /* 신고자 메모 */
  fileIdPart01?: number;
  fileIdPart02?: number;
  managerMemo?: string; /* 관리자 메모 */
  processDate?: string;
  processMemo?: string;
  reporterId?: string; /* 등록자 ID */
  reporterPhone?: string;
  reservation?: number;
}

/* 충전기 고장/파손 상세 */
/** 
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_3
 * @description 옵션널 임시 추가 (서버/기획 확인 필요, 등록 데이터를 보내지 못하는 데이터)
 *  */
export interface IRequestBrokenDetail {
  id: number;
}

export interface IBrokenDetailResponse extends IRequestBrokenRegister {
  id: number;
  stationOperator: string;
  stationRegion: string;
  brokenStatus: TChargerProcessingStatus;
  fileNamePart01: string;
  fileNamePart02: string;
  fileUrlPart01: string;
  fileUrlPart02: string;
  createDate: string;
}

/* 충전기 고장/파손 삭제 */
/** 
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%82%AD%EC%A0%9C
 *  */
export interface IRequestBrokenDelete {
  id: number;
}

/* 충전기 고장/파손 수정 */
/** 
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%88%98%EC%A0%95_3
 *  */
export type IRequestBrokenModify = IRequestBrokenRegister

