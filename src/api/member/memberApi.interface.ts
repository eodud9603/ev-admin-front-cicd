/* 회원 목록 조회 */

import {
  TMemberGradeTypeKey,
  TMemberStatusTypeKey,
  TStationTypeKey,
} from "src/constants/status";
import { OperatorType, YNType } from "src/api/api.interface";

/* 회원 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_4 */
export interface IRequestNormalMemberList {
  size: number;
  page: number;
  // sortDirection: "ASC" | "DESC";

  searchStartDate?: string;
  searchEndDate?: string;
  statusType?: TMemberStatusTypeKey;
  searchType?: "Name" | "UserId" | "PhoneNumber";
  searchKeyword?: string;
  stationOperator?: TStationTypeKey;
  sort: "CreatedDate" | "Birthday";
}

export interface INormalMemberItem {
  id: number;
  stationOperator: OperatorType;
  statusType: TMemberStatusTypeKey; // 정지, 준회원, 정회원
  grade: TMemberGradeTypeKey;
  name: string;
  userId: string;
  birthday: string;
  phone: string;
  memberCard: string;
  memberAuthDate: string;
}

export interface INormalMemberListResponse {
  totalElements: number;
  totalPages: number;
  elements: INormalMemberItem[];
}

/* 회원 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_5 */
export interface IRequestNormalMemberDetail {
  id: number;
}

export interface IMemberDetailResponse {
  id: number;
  name: string;
  userId: string;
  birthday: string;
  gender: string;
  empNumber: string;
  phone: string;
  email: string;
  stationOperator: TStationTypeKey;
  memberAuthDate: string;
  memberCard: string;
  payCards: unknown[];
  paymentCardNumber: string;
  statusType: TMemberStatusTypeKey;
  lastChangedPwdDate: string;
  delayChangePwdDate: string;
  isAgreeEmail: YNType;
  isAgreeSms: YNType;
  isAgreeMarketing: YNType;
  carCompany: string;
  carModel: string;
  carNumber: string;
}
