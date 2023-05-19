import { getManufactureList } from "src/api/manufactures/manufactureApi";
import { IRequestManufactureList } from "src/api/manufactures/manufactureApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { getParams } from "src/utils/params";

export const INIT_MANUFACTURE = {
  searchType: "CompanyId",
  searchKeyword: "",
  sort: "CompanyId",
  size: "10",
  page: 0,
};

export const manufactureListLoader = async () => {
  const loadData = loadTabData("/charger/manufacturer");

  const params = {
    ...INIT_MANUFACTURE,
    ...(loadData?.filterData as unknown as IRequestManufactureList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestManufactureList;
  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }

  /* 검색  */
  const { code, data } = await getManufactureList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_MANUFACTURE,
    currentPage: loadData?.currentPage,
  };
};
