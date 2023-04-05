import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IRequestStationList, IStationListResponse } from "src/api/station/stationApi.interface";

const { stationUrl } = API_URL;

/** 충전소 목록 조회 api */
export const getStationList = (params: IRequestStationList) => {
  return api.get<IStationListResponse>(`${stationUrl}/list`, {
    params
  });
};

