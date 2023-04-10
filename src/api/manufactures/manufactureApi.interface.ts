/* 제조사 목록 조회 */
/** @see http://218.38.12.31:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%A1%B0%ED%9A%8C */
export interface IRequestManufactureList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number; // 0부터 시작
  sort?: "StationName" | "CrateAt";
  name?: string;
  companyId?: string;
}

export interface IManufactureListItem {
  id: number; /** 고유 ID */
  code: string;
  name: string;
  identifier: string;
  companyId: string;
  managerName:string;
  managerPhone: string;
  phone: string;
  address: string;
  modifiedDate: string;
}

export interface IManufactureListResponse {
  elements: IManufactureListItem[];
  totalElements: number;
  totalPages: number;
}
