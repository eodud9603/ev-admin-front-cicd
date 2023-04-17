import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IBrokenDetailResponse,
  IBrokenListResponse,
  IRequestBrokenDetail,
  IRequestBrokenList,
  IRequestBrokenRegister,
} from "src/api/broken/brokenApi.interface";

const { brokenUrl } = API_URL;

/** 충전기 고장/파손 목록 조회 api */
export const getBrokenList = (params: IRequestBrokenList) => {
  return api.get<IBrokenListResponse>(`${brokenUrl}/list`, {
    params,
  });
};

/** 충전기 고장/파손 상세 api */
export const getBrokenDetail = (params: IRequestBrokenDetail) => {
  return api.post<IBrokenDetailResponse>(`${brokenUrl}/detail/${params.id}`);
};

/** 충전기 고장/파손 등록 api */
export const postBrokenRegister = (body: IRequestBrokenRegister) => {
  return api.post<undefined>(`${brokenUrl}/register`, {
    body,
  });
};
