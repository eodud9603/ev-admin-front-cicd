import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IRequestManufactureList, IManufactureListResponse } from "src/api/manufactures/manufactureApi.interface";

const { manufactureUrl } = API_URL;

/** 제조사 목록 조회 api */
export const getManufactureList = (params: IRequestManufactureList) => {
  return api.get<IManufactureListResponse>(`${manufactureUrl}/list`, {
    params,
  });
};
