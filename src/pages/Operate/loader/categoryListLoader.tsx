import { getCategoryList } from "src/api/category/categoryApi";
import { IRequestCategoryList } from "src/api/category/categoryApi.interface";

const defaultParams: IRequestCategoryList = {
  size: 10,
  page: 0,
};

export const categoryListLoader = async () => {
  /* 검색  */
  const { code, data } = await getCategoryList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : {};
};
