import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IRequestStationList, IRequestStationRegister, IStationListResponse } from "src/api/station/stationApi.interface";

const { stationUrl } = API_URL;

/** 충전소 목록 조회 api */
export const getStationList = (params: IRequestStationList) => {
  return api.get<IStationListResponse>(`${stationUrl}/list`, {
    params
  });
};

/** 충전소 등록 api */
export const postStation = (params: IRequestStationRegister) => {
  return api.post<undefined>(`${stationUrl}/register`, {
    params
  });
};

