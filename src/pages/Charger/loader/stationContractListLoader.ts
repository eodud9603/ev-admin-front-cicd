import {  getStationContractList } from "src/api/station/stationApi";
import { IRequestStationContractList } from "src/api/station/stationApi.interface";

const defaultParams: IRequestStationContractList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "StationName",
};

export const stationContractListLoader = async () => {
   /* 검색  */
   const { code, data } = await getStationContractList(defaultParams);
   /** 검색 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};
