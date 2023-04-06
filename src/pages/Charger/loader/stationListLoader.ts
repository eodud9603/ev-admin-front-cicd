import {  getStationList } from "src/api/station/stationApi";
import { IRequestStationList } from "src/api/station/stationApi.interface";

const defaultParams: IRequestStationList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "StationName",
  stationNm: "서울",
};

export const stationListLoader = async () => {
   /* 검색  */
   const { code, data } = await getStationList(defaultParams);
   /** 검색 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};