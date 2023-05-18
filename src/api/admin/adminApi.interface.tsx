import { TRoleTypeKey } from "src/constants/status";
import { YNType } from "src/api/api.interface";

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
  isExel: YNType;
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
  code: string;
  elements: IAdminMainRoleItem[];
}
