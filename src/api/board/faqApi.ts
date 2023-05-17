import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IFaqListResponse,
  IRequestFaqList,
  IRequestFaqListExposure,
  IRequestFaqRegister,
} from "src/api/board/faqApi.interface";

const { boardUrl } = API_URL;
const faqUrl = `${boardUrl}/faq`;

/** faq 목록 조회 api */
export const getFaqList = (params: IRequestFaqList) => {
  return api.get<IFaqListResponse>(`${faqUrl}/list`, {
    params,
  });
};

/** faq 등록 api */
export const postFaqRegister = (body: IRequestFaqRegister) => {
  return api.post<number>(faqUrl, { body });
};

/**
 * faq 선택 비노출 api
 */
export const exposureFaqList = (body: IRequestFaqListExposure) => {
  return api.delete<undefined>(`${faqUrl}/all-modify`, { body });
};
