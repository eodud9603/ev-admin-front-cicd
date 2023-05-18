import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestAdminRoleList,
  IAdminRoleListResponse,
} from "src/api/admin/adminApi.interface";

const { adminUrl } = API_URL;

/** 기본 권한 조회 [단건] api */
export const getAdminRoleList = (params: IRequestAdminRoleList) => {
  return api.get<IAdminRoleListResponse>(
    `${adminUrl}/role/privileges/detail/${params.role}`
  );
};
