import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  INormalCardListResponse,
  IRequestNormalCardList,
} from "src/api/card/cardApi.interface";

const { cardUrl } = API_URL;

export const getNormalCardList = (params: IRequestNormalCardList) => {
  return api.get<INormalCardListResponse>(`${cardUrl}/list`, { params });
};

export const getNormalCardExcel = (params: IRequestNormalCardList) => {
  return api.get<unknown>(`${cardUrl}/list/excel`, {
    params,
    responseType: "blob",
  }) as unknown as Promise<Blob>;
};
