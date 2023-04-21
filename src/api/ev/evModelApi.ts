import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IEvModelDetailResponse,
  IEvModelListResponse,
  IRequestEvModelDetail,
  IRequestEvModelList,
  IRequestEvModelModify,
  IRequestEvModelRegister,
} from "src/api/ev/evModelApi.interface";

const { evModelUrl } = API_URL;

/** 전기차 목록 조회 api */
export const getEvModelList = (params: IRequestEvModelList) => {
  return api.get<IEvModelListResponse>(`${evModelUrl}/list`, {
    params,
  });
};

/** 전기차 상세 조회 api */
export const getEvModelDetail = (params: IRequestEvModelDetail) => {
  return api.get<IEvModelDetailResponse>(`${evModelUrl}/detail/${params.id}`);
};

/** 전기차 수정 api */
export const postEvModelModify = (body: IRequestEvModelModify) => {
  return api.post<undefined>(`${evModelUrl}/modify`, { body });
};

/** 전기차 등록 api */
export const postEvModelRegister = (body: IRequestEvModelRegister) => {
  return api.post<undefined>(`${evModelUrl}/register`, { body });
};
