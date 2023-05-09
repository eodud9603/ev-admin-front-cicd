import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestCategoryList,
  ICategoryListResponse,
  ICategoryFieldsResponse,
} from "src/api/category/categoryApi.interface";

const { categoryUrl } = API_URL;

/** 카테고리 목록 api */
export const getCategoryList = (params: IRequestCategoryList) => {
  return api.get<ICategoryListResponse>(`${categoryUrl}/list`, {
    params,
  });
};

/** 카테고리 목록 api */
export const getCategoryFields = () => {
  return api.get<ICategoryFieldsResponse>(`${categoryUrl}/fields`);
};
