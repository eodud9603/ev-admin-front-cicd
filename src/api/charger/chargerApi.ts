import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestChargerList,
  IChargerListResponse,
  IRequestChargerListByStation,
  IChargerListByStationResponse,
} from "src/api/charger/chargerApi.interface";

const { chargerUrl } = API_URL;

/** 충전소별 충전기 목록 조회 api */
export const getChargerListByStation = (
  params: IRequestChargerListByStation
) => {
  return api.get<IChargerListByStationResponse>(
    `${chargerUrl}/station/list/${params.stationId}`
  );
};

/** 충전기 목록 조회 api */
export const getChargerList = (params: IRequestChargerList) => {
  return api.get<IChargerListResponse>(`${chargerUrl}/list`, {
    params,
  });
};
