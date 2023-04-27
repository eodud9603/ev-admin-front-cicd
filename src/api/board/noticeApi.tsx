import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  INoticeDetailResponse,
  INoticeListResponse,
  IRequestNoticeDetail,
  IRequestNoticeList,
} from "src/api/board/noticeApi.interface";

const { boardUrl } = API_URL;
const noticeUrl = `${boardUrl}/notice`;

/** 공지사항 목록 조회 api */
export const getNoticeList = (params: IRequestNoticeList) => {
  return api.get<INoticeListResponse>(`${noticeUrl}/list`, {
    params,
  });
};

/** 공지사항 상새 조회 api */
export const getNoticeDetail = (params: IRequestNoticeDetail) => {
  return api.get<INoticeDetailResponse>(`${noticeUrl}/${params.id}`);
};
