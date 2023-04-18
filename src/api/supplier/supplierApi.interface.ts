
/* 파일 업로드 */

import { YNType } from "src/api/api.interface";

/* 서비스 운영사 관리 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_3 */
export interface IRequestSupplierList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  isActive?: YNType;
  isContracted?: YNType;
  searchType?: "SupplierName" | "SupplierId";
  searchKeyword?: string;
  sort?: "SupplierName" | "CreatedDate";
  size: number;
  page: number;
}

export interface ISupplierItem {
  id: number;
  platformType: string;
  code: string;
  name: string;
  phoneNumber: string;
  supplierId: string;
  mainPhoneNumber: string;
  meAuthKey: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  isActive: YNType;
  isContracted: YNType;
  createdDate: string;
}

export interface IRequestSupplierListResponse {
  totalElements: number;
  totalPages: number;
  elements: ISupplierItem[];
}

/* 서비스 운영사 관리 목록 > 활성화 여부 변경 */
/** @see http://218.38.12.198:45081/docs/index.html#_활성화_여부_변경 */
export interface IRequestSupplierListActive {
  isActive: boolean;
  ids: number[];
}

/* 서비스 운영사 관리 등록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_5 */
export interface IRequestSupplierRegister {
  id?: number;
  platformType?: string;
  code: string;
  name: string;
  phoneNumber: string;
  supplierId: string;
  mainPhoneNumber: string;
  meAuthKey: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  isActive: YNType;
  isContracted: YNType;
  contractedDate: string;
  contractFileId?: number;
  contractFileName?: string;
  contractFileUrl?: string;
}

/* 서비스 운영사 관리 수정 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%88%98%EC%A0%95_4 */
export interface IRequestSupplierModify extends Omit<IRequestSupplierRegister, "id"> {
  id: string;
}

/* 서비스 운영사 관리 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_4 */
export interface IRequestSupplierDetail {
  id: number;
}

export interface ISupplierDetailResponse extends Required<IRequestSupplierRegister> {
  createdDate: string;
}

/* 서비스 운영사 관리 삭제 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%82%AD%EC%A0%9C_2 */
export type IRequestSupplierDelete = IRequestSupplierDetail