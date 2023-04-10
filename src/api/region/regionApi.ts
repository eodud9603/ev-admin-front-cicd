import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IRegionResponse, IRequestDongmyun, IRequestSigugun } from "src/api/region/regionApi.interface";

const { regionUrl } = API_URL;

/** 시/도 목록 조회 api */
export const getRegionSido = () => {
  return api.get<IRegionResponse>(`${regionUrl}/sido`);
};

/** 구/군 목록 조회 api */
export const getRegionSigugun = (params: IRequestSigugun) => {
  return api.get<IRegionResponse>(`${regionUrl}/sigugun`, {
    params,
  });
};

/** 동/읍 목록 조회 api */
export const getRegionDongmyun = (params: IRequestDongmyun) => {
  return api.get<IRegionResponse>(`${regionUrl}/dongmyun`, {
    params,
  });
};
  
