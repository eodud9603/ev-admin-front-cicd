import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestNormalMemberList,
  INormalMemberListResponse,
  IRequestNormalMemberDetail,
  IMemberDetailResponse,
} from "src/api/member/memberApi.interface";

const { memberUrl } = API_URL;

/** 회원 목록 조회 api */
export const getNormalMemberList = (params: IRequestNormalMemberList) => {
  return api.get<INormalMemberListResponse>(`${memberUrl}/list`, { params });
};

/** 회원 목록 excel download api */
export const getNormalMemberListExcel = (params: IRequestNormalMemberList) => {
  return api.get<unknown>(`${memberUrl}/list/excel`, {
    params,
    responseType: "blob",
  }) as unknown as Promise<Blob>;
};

/** 회원 상세 조회 api */
export const getNormalMemberDetail = (params: IRequestNormalMemberDetail) => {
  return api.get<IMemberDetailResponse>(`${memberUrl}/detail/${params.id}`);
};
