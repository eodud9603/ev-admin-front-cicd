import { getCategory } from "src/api/category/categoryApi";
import { IRequestCategory } from "src/api/category/categoryApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { getFaqList } from "src/api/board/faqApi";
import { IRequestFaqList } from "src/api/board/faqApi.interface";
import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";

const categoryDefaultParams: IRequestCategory = {
  fieldType: "FAQ",
};
const defaultParams: IRequestFaqList = {
  size: 10,
  page: 0,
  sort: "CreateAt",
  isExpose: "N",
};

export const INIT_FAQ_LIST = {
  startDate: "",
  endDate: "",
  isExpose: "" as YNType,
  uploadType: "ALL" as TUploadTypeKeys,
  searchRange: "Title",
  searchText: "",
  categoryId: "",
  sort: "" as IRequestFaqList["sort"],
  count: "10",
};

export const faqListLoader = async () => {
  const loadData = loadTabData("/operate/faq");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code: categoryCode, data: categoryList } = await getCategory(
    categoryDefaultParams
  );
  const { code, data } = await getFaqList(defaultParams);
  /** 검색 성공 */
  const categorySuccess = categoryCode === "SUCCESS" && !!categoryList;
  const success = code === "SUCCESS" && !!data;

  const category = categoryList?.map((e) => ({
    label: e?.name,
    value: e?.id,
  }));

  return {
    data: success ? data : {},
    filterData: INIT_FAQ_LIST,
    categoryList: categorySuccess ? category : [],
  };
};
