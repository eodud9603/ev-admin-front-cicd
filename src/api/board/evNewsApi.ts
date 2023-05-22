import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IEvNewsResponse,
  IRequestEvNewsRegister,
} from "src/api/board/evNewsApi.interface";

const { boardUrl } = API_URL;
const evNewsUrl = `${boardUrl}/ev-news`;
/** ev news 목록 api */
export const getEvNewsList = (params: any) => {
  return api.get<IEvNewsResponse>(`${evNewsUrl}/list`, { params });
};

/** ev news 등록 api */
export const postEvNewsRegister = (body: IRequestEvNewsRegister) => {
  return api.post<number>(evNewsUrl, { body });
};
