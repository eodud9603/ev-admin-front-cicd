import { getManufactureList } from "src/api/manufactures/manufactureApi";
import { IRequestManufactureList } from "src/api/manufactures/manufactureApi.interface";
import { loadTabData } from "src/utils/loadTabData";

const defaultParams: IRequestManufactureList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CompanyId",
};

export const INIT_MANUFACTURE = {
  searchRange: "CompanyId",
  searchText: "",
  sort: "CompanyId",
  count: "10",
};

export const manufactureListLoader = async () => {
  const loadData = loadTabData("/charger/manufacturer");
  if (loadData?.data || loadData?.filterData) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getManufactureList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data, filterData: INIT_MANUFACTURE } : null;
};
