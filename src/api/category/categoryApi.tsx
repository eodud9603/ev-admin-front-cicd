import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestCategoryList,
  ICategoryListResponse,
  ICategoryFieldsResponse,
  ICategoryDetailResponse,
} from "src/api/category/categoryApi.interface";

const { categoryUrl } = API_URL;

/** 카테고리 목록 조회 api */
export const getCategoryList = (params: IRequestCategoryList) => {
  return api.get<ICategoryListResponse>(`${categoryUrl}/list`, {
    params,
  });
};

/** 카테고리 목록 조회 api */
export const getCategoryFields = () => {
  return api.get<ICategoryFieldsResponse>(`${categoryUrl}/fields`);
};

/** 카테고리 상세 조회 api */
export const getCategoryDetail = (params: { id: number }) => {
  return api.get<ICategoryDetailResponse>(`${categoryUrl}/${params.id}`);
};
