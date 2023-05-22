/* 회원 카드 목록 조회 */
import {
  TMemberCardDivisionTypeKey,
  TMemberCardStatusTypeKey,
  TMemberGradeTypeKey,
} from "src/constants/status";

/* 회원카드 목록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_5 */
export interface IRequestNormalCardList {
  page: number;
  size: number;
  searchStartDate?: string;
  searchEndDate?: string;
  cardStatusType?: TMemberCardStatusTypeKey;
  cardIssuanceType?: TMemberCardDivisionTypeKey;
  searchType?: "Name";
  searchKeyword?: string;
  sort?: "Default";
  sortDirection?: "ASC" | "DESC";
}

export interface INormalCardItem {
  id: number;
  cardStatusType: TMemberCardStatusTypeKey;
  cardIssuanceType: TMemberCardDivisionTypeKey;
  grade: TMemberGradeTypeKey;
  groupName: string;
  userId: string;
  name: string;
  no: string;
  regDtm: string;
}

export interface INormalCardListResponse {
  totalElements: number;
  totalPages: number;
  elements: INormalCardItem[];
}
