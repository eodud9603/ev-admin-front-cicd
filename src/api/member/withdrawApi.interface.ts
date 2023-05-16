/* 탈퇴회원 목록 조회 */
import { OperatorType } from "src/api/api.interface";
import { TMemberStatusTypeKey } from "src/constants/status";

/** @see http://218.38.12.198:45081/docs/index.html#_%ED%83%88%ED%87%B4%ED%9A%8C%EC%9B%90_%EC%A1%B0%ED%9A%8C */
export interface IRequestWithdrawMemberList {
  searchStartDate?: string;
  searchEndDate?: string;
  stationOperator?: OperatorType;
  searchType?: "UserId";
  searchKeyword?: string;
  statusType?: TMemberStatusTypeKey;
  sort?: "DeleteAt";
  size: number;
  page: number;
  sortDirection?: "ASC" | "DESC";
}

export interface IWithdrawMemberItem {
  id: number;
  stationOperator: OperatorType;
  statusType: TMemberStatusTypeKey;
  userId: string;
  deactivateReason: string;
  deletedAt: string;
}

export interface IWithdrawMemberListResponse {
  totalElements: number;
  totalPages: number;
  elements: IWithdrawMemberItem[];
}
