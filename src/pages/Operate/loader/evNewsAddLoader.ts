import { loadTabData } from "src/utils/loadTabData";
import { INoticeDetailFileItem } from "src/api/board/noticeApi.interface";
import { getCategory } from "src/api/category/categoryApi";
import { IRequestCategory } from "src/api/category/categoryApi.interface";
import { convertDropdownKeys } from "src/utils/convertDropdownKeys";
import { YNType } from "src/api/api.interface";

const defaultParams: IRequestCategory = {
  fieldType: "FAQ",
};
export const INIT_EV_NEWS_ADD = {
  writer: "",
  isExpose: "N" as YNType,
  uploadType: "ALL",
  title: "",
  content: "",
  files: [] as INoticeDetailFileItem[],
  banners: [] as INoticeDetailFileItem[],
};

export const evNewsAddLoader = () => {
  const loadData = loadTabData<{
    data: typeof INIT_EV_NEWS_ADD;
  }>("/operate/evNews/add");

  return {
    data: loadData?.data ?? INIT_EV_NEWS_ADD,
  };
};
