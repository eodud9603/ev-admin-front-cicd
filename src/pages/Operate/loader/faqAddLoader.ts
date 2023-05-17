import { loadTabData } from "src/utils/loadTabData";
import { INoticeDetailFileItem } from "src/api/board/noticeApi.interface";
import { getCategory } from "src/api/category/categoryApi";
import { IRequestCategory } from "src/api/category/categoryApi.interface";
import { convertDropdownKeys } from "src/utils/convertDropdownKeys";
import { YNType } from "src/api/api.interface";

const defaultParams: IRequestCategory = {
  fieldType: "FAQ",
};
export const INIT_OPERATE_FAQ_ADD = {
  writer: "",
  categoryId: "",
  isExpose: "N" as YNType,
  uploadType: "ALL",
  title: "",
  content: "",
  files: [] as INoticeDetailFileItem[],
};

export const faqAddLoader = async () => {
  const loadData = loadTabData<{
    data: typeof INIT_OPERATE_FAQ_ADD;
    categoryList: [];
  }>("/operate/faq/add");

  let cateData = [];
  if (!loadData?.categoryList) {
    const { code, data: categoryArr } = await getCategory(defaultParams);
    const category = convertDropdownKeys(categoryArr);
    cateData = JSON.parse(JSON.stringify(category));
  }

  return {
    data: loadData?.data ?? INIT_OPERATE_FAQ_ADD,
    categoryList: cateData.length > 0 ? cateData : loadData?.categoryList,
  };
};
