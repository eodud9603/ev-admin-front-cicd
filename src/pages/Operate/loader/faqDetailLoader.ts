import { loadTabData } from "src/utils/loadTabData";
import {
  IFaqDetailResponse,
  IRequestFaqDetail,
} from "src/api/board/faqApi.interface";
import { getFaqDetail } from "src/api/board/faqApi";
import { getCategory } from "src/api/category/categoryApi";
import { IRequestCategory } from "src/api/category/categoryApi.interface";
import { convertDropdownKeys } from "src/utils/convertDropdownKeys";

const categoryDefaultParams: IRequestCategory = {
  fieldType: "FAQ",
};
export const faqDetailLoader = async ({
  params,
}: {
  params: Partial<IRequestFaqDetail>;
}) => {
  const { id } = params;
  if (!id) {
    return null;
  }

  const loadData = loadTabData<IFaqDetailResponse | null>(
    `/operate/faq/detail/${id}`
  );

  if (loadData?.data) {
    return {
      data: loadData.data,
      categoryList: loadData.categoryList,
      editable: loadData.editable,
    };
  }

  /* 검색  */
  const { code: categoryCode, data: categoryList } = await getCategory(
    categoryDefaultParams
  );
  const category = convertDropdownKeys(categoryList);
  /* 검색  */
  const { code, data } = await getFaqDetail({ id });
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data, categoryList: category } : null;
};
