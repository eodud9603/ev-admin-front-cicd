import { getStationContractList } from "src/api/station/stationApi";
import { IRequestStationContractList } from "src/api/station/stationApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { TContractStatus } from "src/constants/status";
import { YNType } from "src/api/api.interface";
import { getParams } from "src/utils/params";

export const INIT_CONTRACT = {
  size: "10",
  page: 0,

  sido: "",
  gugun: "",
  dong: "",
  contractCode: "" as TContractStatus,
  searchType: "ContractPlace",
  searchKeyword: "",
  isUse: "" as YNType,
  sort: "ContractedDate",
};

export const stationContractListLoader = async () => {
  const loadData = loadTabData("/station/contract");

  const params = {
    ...INIT_CONTRACT,
    ...(loadData?.filterData as unknown as IRequestStationContractList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestStationContractList;

  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }

  /* 검색  */
  const { code, data } = await getStationContractList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_CONTRACT,
    currentPage: loadData?.currentPage,
  };
};
