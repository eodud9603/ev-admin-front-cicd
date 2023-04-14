/* 제조사 목록 조회 */
/** @see http://218.38.12.31:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%A1%B0%ED%9A%8C */
export interface IRequestManufactureList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number; // 0부터 시작
  sort: "CompanyId" | "Name" | "ModifiedDate";
  searchType?: "CompanyName" | "ManagerName" | "CompanyId";
  searchKeyword?: string
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

/* 제조사 상세 조회 */
/** @see http://218.38.12.31:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%83%81%EC%84%B8 */
export interface IRequestManufactureDetail {
 id: number;
}

export interface IManufactureDetailResponse {
  id: number; /** 고유 ID */
  code: string;
  name: string;
  identifier: string;
  companyId: string;
  managerName: string;
  managerPhone: string;
  phone: string;
  address: string;
  zipCode: string;
  managerExtPhone: string;
}