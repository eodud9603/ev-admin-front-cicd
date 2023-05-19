import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  INormalCardListResponse,
  IRequestNormalCardList,
} from "src/api/card/cardApi.interface";

const { cardUrl } = API_URL;

/** 회원카드 목록 조회 api */
export const getNormalCardList = (params: IRequestNormalCardList) => {
  return api.get<INormalCardListResponse>(`${cardUrl}/list`, { params });
};

/** 회원카드 엑셀 다운로드 api */
export const getNormalCardExcel = (params: IRequestNormalCardList) => {
  return api.get<unknown>(`${cardUrl}/list/excel`, {
    params,
    responseType: "blob",
  }) as unknown as Promise<Blob>;
};
