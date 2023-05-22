import { TRoleTypeKey } from "src/constants/status";
import { YNType } from "src/api/api.interface";

/** 운영자 관리 관리
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%9A%B4%EC%98%81%EC%9E%90_%EA%B4%80%EB%A6%AC_%EA%B4%80%EB%A6%AC
 */
export interface IRequestAdminList {
  size: number;
  page: number;
  searchType?: "AdminId" | "Name";
  searchKeyword?: string;
  isBlock?: YNType;
  // sortDirection?: "DESC" | "ASC"
}

export interface IAdminAccountItem {
  id: number;
  groupName: string;
  name: string;
  adminId: string;
  manufactureId: number;
  manufactureName: string;
  roleCode: TRoleTypeKey;
  roleName: string;
  phoneNumber: string;
  department: string;
  allowMobile?: YNType;
  allowExternal?: YNType;
  isBlock?: YNType;
}

export interface IAdminListResponse {
  totalElements: number;
  totalPages: number;
  elements: IAdminAccountItem[];
}

/** 기본 권한 조회 [단건]
 * @see http://218.38.12.198:45081/docs/index.html#_%EA%B8%B0%EB%B3%B8_%EA%B6%8C%ED%95%9C_%EC%A1%B0%ED%9A%8C_%EB%8B%A8%EA%B1%B4
 */
export interface IRequestAdminRoleList {
  role: TRoleTypeKey;
}

/** 권한 > 소분류 아이템 타입 */
export interface IAdminSubRoleItem {
  id: number;
  menuId: number;
  name: string;
  isCreate: YNType;
  isModify: YNType;
  isDelete: YNType;
  isView: YNType;
  isExcel: YNType;
  isExecute: YNType;
}

/** 권한 > 대분류 아이템 타입 */
export interface IAdminMainRoleItem {
  id: number;
  name: string;
  children: IAdminSubRoleItem[];
}

export interface IAdminRoleListResponse {
  name: string;
  code: TRoleTypeKey;
  elements: IAdminMainRoleItem[];
}

/** 기본 권한 수정 [단건]
 * @see http://218.38.12.198:45081/docs/index.html#_%EA%B8%B0%EB%B3%B8_%EA%B6%8C%ED%95%9C_%EC%88%98%EC%A0%95_%EB%8B%A4%EA%B1%B4_2
 */
export interface IRequestAdminRoleModify {
  name: string;
  code: TRoleTypeKey;
  elements: IAdminMainRoleItem[];
}
