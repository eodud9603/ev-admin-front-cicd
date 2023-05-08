import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  INoticeDetailResponse,
  INoticeListResponse,
  IRequestNoticeDetail,
  IRequestNoticeList,
  IRequestNoticeListExposure,
  IRequestNoticeModify,
  IRequestNoticeRegister,
} from "src/api/board/noticeApi.interface";

const { boardUrl } = API_URL;
const noticeUrl = `${boardUrl}/notice`;

/** 공지사항 목록 조회 api */
export const getNoticeList = (params: IRequestNoticeList) => {
  return api.get<INoticeListResponse>(`${noticeUrl}/list`, {
    params,
  });
};

/** 공지사항 상세 조회 api */
export const getNoticeDetail = (params: IRequestNoticeDetail) => {
  return api.get<INoticeDetailResponse>(`${noticeUrl}/${params.id}`);
};

/** 공지사항 수정 api */
export const putNoticeModify = (body: IRequestNoticeModify) => {
  return api.put<number>(noticeUrl, { body });
};

/** 공지사항 등록 api */
export const postNoticeRegister = (body: IRequestNoticeRegister) => {
  return api.post<number>(noticeUrl, { body });
};

/**
 * 공지사항 선택 비노출 api
 * @Description 2022.05.08 - 선택 삭제 api에서 비노출 api로 변경 (delete field를 exposure용으로 사용)
 */
export const exposureNoticeList = (body: IRequestNoticeListExposure) => {
  return api.delete<undefined>(noticeUrl, { body });
};
