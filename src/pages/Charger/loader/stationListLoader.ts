import { getStationList } from "src/api/station/stationApi";
import { IRequestStationList } from "src/api/station/stationApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { YNType } from "src/api/api.interface";
import { getParams } from "src/utils/params";

export const INIT_STATION = {
  size: "10",
  page: 0,

  sido: "",
  gugun: "",
  dong: "",
  operation: "",
  searchType: "StationName",
  searchKeyword: "서울",
  isUse: "" as YNType,
  sort: "CreatedDate",
};

export const stationListLoader = async () => {
  const loadData = loadTabData("/charger/station");

  const params = {
    ...INIT_STATION,
    ...(loadData?.filterData as unknown as IRequestStationList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestStationList;

  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }

  /* 검색  */
  const { code, data } = await getStationList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_STATION,
  };
};
