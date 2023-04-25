import { getStationContractList } from "src/api/station/stationApi";
import { IRequestStationContractList } from "src/api/station/stationApi.interface";
import { loadTabData } from "src/utils/loadTabData";

const defaultParams: IRequestStationContractList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "ContractedDate",
};

export const stationContractListLoader = async () => {
  const loadData = loadTabData("/charger/contract");
  if (loadData?.data) {
    return loadData?.data;
  }

  /* 검색  */
  const { code, data } = await getStationContractList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
