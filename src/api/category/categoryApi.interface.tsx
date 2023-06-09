import { YNType } from "src/api/api.interface";
/* 카테고리 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EC%A1%B0%ED%9A%8C */
export interface IRequestCategoryList {
  size: number;
  page: number;
  fieldId?: number;
  isExposed?: YNType;
  searchType?: "CategoryName" | "Writer";
  searchKeyword?: string;
}

export interface ICategoryItem {
  id: number;
  field: string;
  name: string;
  writer: string;
  createAt: string;
  isExpose: YNType;
}

export interface ICategoryListResponse {
  totalElements: number;
  totalPages: number;
  elements: ICategoryItem[];
}

/* 카테고리 분야 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%B6%84%EC%95%BC_%EC%A1%B0%ED%9A%8C */
export interface ICategoryFieldItem {
  id: number;
  name: string;
}

export type ICategoryFieldsResponse = ICategoryFieldItem[];

/* 카테고리 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EC%83%81%EC%84%B8_%EC%A1%B0%ED%9A%8C */
export interface ICategoryDetailResponse {
  id: number;
  fieldId: number;
  field: string;
  name: string;
  writer: string;
  createAt: string;
  isExpose: YNType;
}

/* 카테고리 수정 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EC%88%98%EC%A0%95 */
export interface IRequestCategoryModify {
  id: number;
  fieldId: number;
  name: string;
  isExpose: YNType;
}

/* 카테고리 수정 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EB%93%B1%EB%A1%9D */
export interface IRequestCategoryRegister {
  fieldId: number;
  name: string;
  isExpose: YNType;
}
/* 분야별 카테고리 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%B6%84%EC%95%BC%EB%B3%84_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EC%A1%B0%ED%9A%8C */
export interface IRequestCategory {
  fieldType: "POPUP" | "INQUIRY" | "FAQ" | "QNA" | "MESSAGE" | "NOTIFICATION";
}
