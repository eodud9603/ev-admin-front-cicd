import api from "src/utils/api";
import {
  IRequestWithdrawMemberList,
  IWithdrawMemberListResponse,
} from "src/api/member/withdrawApi.interface";
import { API_URL } from "src/constants/url";

const { memberUrl } = API_URL;

/** 탈퇴회원 목록 조회 api */
export const getMemberWithdrawList = (params: IRequestWithdrawMemberList) => {
  return api.get<IWithdrawMemberListResponse>(
    `${memberUrl}/list/deactivateList`,
    { params }
  );
};

/** 탈퇴회원 목록 excel download api */
export const getWithdrawMemberListExcel = (
  params: IRequestWithdrawMemberList
) => {
  return api.get<unknown>(`${memberUrl}/list/deactivateExcel`, {
    params,
    responseType: "blob",
  }) as unknown as Promise<Blob>;
};
