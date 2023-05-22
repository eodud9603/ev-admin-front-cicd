import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestAdminRoleList,
  IAdminRoleListResponse,
  IRequestAdminRoleModify,
  IRequestAdminList,
  IAdminListResponse,
} from "src/api/admin/adminApi.interface";

const { adminUrl } = API_URL;

/** 기본 권한 조회 [단건] api */
export const getAdminList = (params: IRequestAdminList) => {
  return api.get<IAdminListResponse>(`${adminUrl}/list`, {
    params,
  });
};

/** 기본 권한 조회 [단건] api */
export const getAdminRoleList = (params: IRequestAdminRoleList) => {
  return api.get<IAdminRoleListResponse>(
    `${adminUrl}/role/privileges/detail/${params.role}`
  );
};

/** 기본 권한 조회 [단건] api */
export const postAdminRoleModify = (body: IRequestAdminRoleModify) => {
  return api.post<IAdminRoleListResponse>(
    `${adminUrl}/role/privileges/modify`,
    {
      body,
    }
  );
};
