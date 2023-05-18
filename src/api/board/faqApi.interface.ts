import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";
import { INoticeDetailFileItem } from "src/api/board/noticeApi.interface";

/* faq 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_7 */
export interface IRequestFaqList {
  size: number;
  page: number;
  // sortDirection: "ASC" | "DESC";

  startDate?: string;
  endDate?: string;
  isExpose?: YNType;
  uploadType?: TUploadTypeKeys;
  searchType?: "Title" | "Writer";
  searchKeyword?: string;
  categoryId?: number;
  sort: "CreateAt" | "ReadCount" | "";
}

export interface IFaqItem {
  id: number;
  title: string;
  categoryNm: string;
  uploadType: TUploadTypeKeys;
  writer: string;
  readCount: number;
  createAt: string;
  isExpose: YNType;
}

export interface IFaqListResponse {
  totalElements: number;
  elements: IFaqItem[];
  totalPages: number;
}

/* faq 상세 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_8 */
export interface IRequestFaqDetail {
  id: number;
}
export interface IFaqDetailResponse {
  id: number;
  title: string;
  uploadType?: TUploadTypeKeys;
  writer: string;
  content: string;
  readCount: number;
  createAt: string;
  isExpose: YNType;
  files: INoticeDetailFileItem[];
}

/* faq 등록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_8 */
export interface IRequestFaqRegister {
  boardId: number;
  title: string;
  content: string;
  writer: string;
  isExpose: YNType;
  files: Array<number>;
  uploadType: TUploadTypeKeys;
  categoryId: number;
}

/* faq 수정 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%88%98%EC%A0%95_9 */
export interface IRequestFaqModify {
  id: number;
  title: string;
  content: string;
  isExpose: YNType;
  files: Array<number>;
  uploadType: TUploadTypeKeys;
  categoryId: number;
}

/* faq 선택 비노출 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%84%A0%ED%83%9D_%EB%B9%84%EB%85%B8%EC%B6%9C_2 */
export interface IRequestFaqListExposure {
  ids: number[];
}
