import { UploadType, YNType } from "src/api/api.interface";

/* 공지사항 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_5 */
export interface IRequestNoticeList {
  size: number;
  page: number;
  // sortDirection: "ASC" | "DESC";

  startDate?: string;
  endDate?: string;
  isDeleted?: YNType;
  uploadType?: UploadType;
  searchType?: "Title" | "Content" | "Writer";
  searchKeyword?: string;
  sort?: "CreateAt" | "ReadCount";
}

export interface INoticeItem {
  id: number;
  title: string;
  uploadType?: UploadType;
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
  fileSize: number;
}

export interface INoticeDetailResponse {
  id: number;
  title: string;
  uploadType?: UploadType;
  writer: string;
  content: string;
  readCount: number;
  createAt: string;
  delete: YNType;
  files: INoticeDetailFileItem[];
}
