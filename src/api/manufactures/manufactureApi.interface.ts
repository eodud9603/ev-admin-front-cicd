/* 제조사 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%A1%B0%ED%9A%8C */
export interface IRequestManufactureList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number; // 0부터 시작
  sort: "CompanyId" | "Name" | "ModifiedDate";
  searchType?: "CompanyName" | "ManagerName" | "CompanyId" | "NameOrCode";
  searchKeyword?: string;
}

export interface IManufactureListItem {
  id: number /** 고유 ID */;
  code: string;
  name: string;
  identifier: string;
  companyId: string;
  managerName: string;
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
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%83%81%EC%84%B8 */
export interface IRequestManufactureDetail {
  id: number;
}

export interface IManufactureDetailResponse {
  id: number /** 고유 ID */;
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

/* 제조사 등록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EB%93%B1%EB%A1%9D */
export interface IRequestManufactureRegister {
  code: string;
  name: string;
  identifier: string /* 고유값, 서버 확인 필요 */;
  companyId: string;
  managerName: string;
  managerPhone: string;
  phone: string /* 업체 번호 */;
  address: string;
  zipCode: string;
  managerExtPhone: string /* 내선 번호 */;
}

/* 제조사 수정 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%88%98%EC%A0%95 */
export type IRequestManufactureModify = IRequestManufactureRegister;

/* 제조사 삭제 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EC%82%AD%EC%A0%9C */
export interface IRequestManufactureDelete {
  id: string;
}

/* 제조사 모델 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A0%9C%EC%A1%B0%EC%82%AC_%EB%AA%A8%EB%8D%B8_%EC%A1%B0%ED%9A%8C */
export interface IRequestManufactureModelList {
  id: number;
}

export interface IManufactureModelItem {
  id: number;
  modelName: string;
  manufactureId: number;
  size: number;
  version: string;
  firmwareId: number;
  firmwareFileName: string;
  firmwareFileUrl: string;
  imageId: number;
  imageFileName: string;
  imageUrl: string;
}
export interface IManufactureModelListResponse {
  elements: IManufactureModelItem[];
  totalElements: number;
  totalPages: number;
}
