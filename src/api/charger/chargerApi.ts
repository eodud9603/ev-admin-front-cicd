import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IRequestChargerList, IChargerListResponse } from "src/api/charger/chargerApi.interface";

const { chargerUrl } = API_URL;

/** 충전소 목록 조회 api */
export const getChargerList = (params: IRequestChargerList) => {
  return api.get<IChargerListResponse>(`${chargerUrl}/list`, {
    params
  });
};

