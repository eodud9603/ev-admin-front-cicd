import { getCategoryList } from "src/api/category/categoryApi";
import { IRequestCategoryList } from "src/api/category/categoryApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { YNType } from "src/api/api.interface";

const defaultParams: IRequestCategoryList = {
  size: 10,
  page: 0,
};

export const INIT_CATEGORY_LIST = {
  isExposed: "" as YNType,
  searchRange: "CategoryName",
  searchText: "",
  fieldName: "",
  fieldId: "",
  count: "10",
};

export const categoryListLoader = async () => {
  const loadData = loadTabData("/operate/category");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getCategoryList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_CATEGORY_LIST };
};
