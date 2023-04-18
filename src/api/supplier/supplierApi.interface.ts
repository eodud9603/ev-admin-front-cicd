
/* 파일 업로드 */

import { YNType } from "src/api/api.interface";

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

