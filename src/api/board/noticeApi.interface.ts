import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";

/* 공지사항 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_5 */
export interface IRequestNoticeList {
  size: number;
  page: number;
  // sortDirection: "ASC" | "DESC";

  startDate?: string;
  endDate?: string;
  isDeleted?: YNType;
  uploadType?: TUploadTypeKeys;
  searchType?: "Title" | "Content" | "Writer";
  searchKeyword?: string;
  sort?: "CreateAt" | "ReadCount";
}

export interface INoticeItem {
  id: number;
  title: string;
  uploadType: TUploadTypeKeys;
  writer: string;
  readCount: number;
  createAt: string;
  delete: YNType;
}

export interface INoticeListResponse {
  totalElements: number;
  elements: INoticeItem[];
  totalPages: number;
}

/* 공지사항 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_6 */
export interface IRequestNoticeDetail {
  id: number;
}

export interface INoticeDetailFileItem {
  id: number;
  fileName: string;
  filePath: string;
  fileSize?: number;
}

export interface INoticeDetailResponse {
  id: number;
  title: string;
  uploadType?: TUploadTypeKeys;
  writer: string;
  content: string;
  readCount: number;
  createAt: string;
  delete: YNType;
  files: INoticeDetailFileItem[];
}

/* 공지사항 수정 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%88%98%EC%A0%95_7 */
export interface IRequestNoticeModify {
  id: number;
  title: string;
  content: string;
  deleted: YNType;
  files: number[];
  uploadType: TUploadTypeKeys;
}

/* 공지사항 등록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_7 */
export interface IRequestNoticeRegister {
  boardId: number /* 게시판 ID(NOTICE: 1) */;
  title: string;
  content: string;
  writer: string;
  deleted: YNType;
  files: number[];
  uploadType: TUploadTypeKeys;
}

/* 공지사항 선택 삭제 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%84%A0%ED%83%9D_%EC%82%AD%EC%A0%9C */
export interface IRequestNoticeListDelete {
  noticeIds: number[];
}
