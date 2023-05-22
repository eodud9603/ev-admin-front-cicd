import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";
import { IFaqItem } from "src/api/board/faqApi.interface";

/* ev 뉴스 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_9 */
export interface IRequestEvNewsList {
  size: number;
  page: number;
  sortDirection?: "ASC" | "DESC";

  startDate?: string;
  endDate?: string;
  isExpose?: YNType;
  uploadType?: TUploadTypeKeys;
  searchType?: "Title" | "Writer";
  searchKeyword?: string;
  categoryId?: number;
  sort?: "ReadCount";
}

export interface IEvNewsItem {
  id: number;
  title: string;
  categoryNm: string;
  uploadType: TUploadTypeKeys;
  writer: string;
  readCount: number;
  createAt: string;
  isExpose: YNType;
}

export interface IEvNewsResponse {
  totalElements: number;
  elements: IFaqItem[];
  totalPages: number;
}

/* ev 뉴스 등록 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_9 */
export interface IRequestEvNewsRegister {
  boardId: number;
  title: string;
  content: string;
  writer: string;
  isExpose: YNType;
  files: Array<number>;
  banners: Array<number>;
  uploadType: TUploadTypeKeys;
}
