import { getStationList } from "src/api/station/stationApi";
import { IRequestStationList } from "src/api/station/stationApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { YNType } from "src/api/api.interface";

const defaultParams: IRequestStationList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
  searchType: "StationName",
  searchKeyword: "서울",
};

export const INIT_STATION = {
  sido: "",
  gugun: "",
  dong: "",
  operation: "",
  searchRange: "StationName",
  searchText: "서울",
  isUse: "" as YNType,
  sort: "StationName",
  count: "10",
};

export const stationListLoader = async () => {
  const loadData = loadTabData("/charger/ChargerStation");
  if (loadData?.data || loadData?.filterData) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getStationList(defaultParams);

  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data, filterData: INIT_STATION } : null;
};
