import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IBrokenDetailResponse,
  IBrokenListResponse,
  IRequestBrokenDelete,
  IRequestBrokenDetail,
  IRequestBrokenList,
  IRequestBrokenModify,
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
  return api.get<IBrokenDetailResponse>(`${brokenUrl}/detail/${params.id}`);
};

/** 충전기 고장/파손 수정 api */
export const postBrokenModify = (body: IRequestBrokenModify) => {
  return api.post<undefined>(`${brokenUrl}/modify`, { body });
};

/** 충전기 고장/파손 삭제 api */
export const deleteBroken = (params: IRequestBrokenDelete) => {
  return api.get<undefined>(`${brokenUrl}/delete/${params.id}`);
};

/** 충전기 고장/파손 등록 api */
export const postBrokenRegister = (body: IRequestBrokenRegister) => {
  return api.post<undefined>(`${brokenUrl}/register`, {
    body,
  });
};
