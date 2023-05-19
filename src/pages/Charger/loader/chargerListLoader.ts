import { getChargerList } from "src/api/charger/chargerApi";
import { IRequestChargerList } from "src/api/charger/chargerApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { getParams } from "src/utils/params";

export const INIT_CHARGER = {
  size: "10",
  page: 0,
  sido: "",
  gugun: "",
  dong: "",
  operation: "",
  searchType: "StationName",
  searchKeyword: "",
  operationStatus: "",
  sort: "CreatedDate",
};

export const chargerListLoader = async () => {
  const loadData = loadTabData("/charger/charger");

  const params = {
    ...INIT_CHARGER,
    ...(loadData?.filterData as unknown as IRequestChargerList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestChargerList;

  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }

  /* 검색  */
  const { code, data } = await getChargerList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_CHARGER,
    currentPage: loadData?.currentPage,
  };
};
