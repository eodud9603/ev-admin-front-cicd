import { loadTabData } from "src/utils/loadTabData";
import { IRequestFaqList } from "src/api/board/faqApi.interface";
import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";
import { getEvNewsList } from "src/api/board/evNewsApi";
import { IRequestEvNewsList } from "src/api/board/evNewsApi.interface";

const defaultParams: IRequestFaqList = {
  size: 10,
  page: 0,
};

export const INIT_EV_NEWS_LIST = {
  startDate: "",
  endDate: "",
  isExpose: "" as YNType,
  uploadType: "ALL" as TUploadTypeKeys,
  searchRange: "Title",
  searchText: "",
  categoryId: "",
  sort: "" as IRequestEvNewsList["sort"],
  count: "10",
};

export const evNewsListLoader = async () => {
  const loadData = loadTabData("/operate/evNews");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  const { code, data } = await getEvNewsList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: INIT_EV_NEWS_LIST,
  };
};
