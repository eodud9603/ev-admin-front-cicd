import { getChargerList } from "src/api/charger/chargerApi";
import { IRequestChargerList } from "src/api/charger/chargerApi.interface";
import { loadTabData } from "src/utils/loadTabData";

const defaultParams: IRequestChargerList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const INIT_CHARGER = {
  sido: "",
  gugun: "",
  dong: "",
  operation: "",
  searchRange: "StationName",
  searchText: "",
  operationStatus: "",
  sort: "CreatedDate",
  count: "10",
};

export const chargerListLoader = async () => {
  const loadData = loadTabData("/charger/charger");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getChargerList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_CHARGER };
};
