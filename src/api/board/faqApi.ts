import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IFaqListResponse,
  IRequestFaqList,
  IRequestFaqRegister,
} from "src/api/board/faqApi.interface";

const { boardUrl } = API_URL;
const faqUrl = `${boardUrl}/faq`;

/** 공지사항 목록 조회 api */
export const getFaqList = (params: IRequestFaqList) => {
  return api.get<IFaqListResponse>(`${faqUrl}/list`, {
    params,
  });
};

export const postFaqRegister = (body: IRequestFaqRegister) => {
  return api.post<number>(faqUrl, { body });
};
