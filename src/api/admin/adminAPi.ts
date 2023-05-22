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

/** 계정관리 > 목록 조회 api */
export const getAdminList = (params: IRequestAdminList) => {
  return api.get<IAdminListResponse>(`${adminUrl}/list`, {
    params,
  });
};

/** 계정관리 > 목록 엑셀 다운로드 api */
export const getAdminListExcel = (params: IRequestAdminList) => {
  return api.get<IAdminListResponse>(`${adminUrl}/list/excel`, {
    params,
    responseType: "blob",
  }) as unknown as Promise<Blob>;
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
