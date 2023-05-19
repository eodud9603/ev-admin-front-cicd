import { getStationContractList } from "src/api/station/stationApi";
import { IRequestStationContractList } from "src/api/station/stationApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { TContractStatus } from "src/constants/status";
import { YNType } from "src/api/api.interface";

const defaultParams: IRequestStationContractList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "ContractedDate",
};

export const INIT_CONTRACT = {
  sido: "",
  gugun: "",
  dong: "",
  contractCode: "" as TContractStatus,
  searchRange: "ContractPlace",
  searchText: "",
  isUse: "" as YNType,
  sort: "ContractedDate",
  count: "10",
};

export const stationContractListLoader = async () => {
  const loadData = loadTabData("/station/contract");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }

  /* 검색  */
  const { code, data } = await getStationContractList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_CONTRACT };
};
