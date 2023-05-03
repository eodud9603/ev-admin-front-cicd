/* 회원 목록 조회 */

import {
  TMemberGradeTypeKey,
  TMemberStatusTypeKey,
  TStationTypeKey,
} from "src/constants/status";
import { OperatorType } from "src/api/api.interface";

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
  sort: "CreatedDate";
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
