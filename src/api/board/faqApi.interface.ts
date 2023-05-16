import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";

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
