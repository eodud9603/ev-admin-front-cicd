import { getBrokenList } from "src/api/broken/brokenApi";
import { IRequestBrokenList } from "src/api/broken/brokenApi.interface";
import { OperatorType } from "src/api/api.interface";
import { TChargerProcessingStatus } from "src/constants/status";
import { loadTabData } from "src/utils/loadTabData";

const defaultParams: IRequestBrokenList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const INIT_TROUBLE = {
  sido: "",
  gugun: "",
  dong: "",
  searchRange: "StationName",
  startDate: "",
  endDate: "",
  searchText: "",
  operator: "" as OperatorType,
  sort: "CreatedDate",
  status: "" as TChargerProcessingStatus,
  count: "10",
};

export const brokenListLoader = async () => {
  const loadData = loadTabData("/charger/trouble");
  if (loadData?.data || loadData?.filterData) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getBrokenList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data, filterData: INIT_TROUBLE } : null;
};
