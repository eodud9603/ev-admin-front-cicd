import { getStationList } from "src/api/station/stationApi";
import {
  IRequestStationList,
  IStationListResponse,
} from "src/api/station/stationApi.interface";
import { tabType } from "src/store/tabStore";

const defaultParams: IRequestStationList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
  searchType: "StationName",
  searchKeyword: "서울"
};

export const stationListLoader = async () => {
  const tabStorage: string | null = sessionStorage.getItem("tab-storage");

  const tabData: Array<tabType> =
    JSON.parse(tabStorage ?? "")?.state?.data?.filter(
      (e: tabType) => e.path === "/charger/ChargerStation"
    ) ?? [];
  if (tabData && tabData.length > 0) {
    const listData: IStationListResponse = tabData[0].data;

    return listData ?? null;
  }
  /* 검색  */
  const { code, data } = await getStationList(defaultParams);

  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;
  console.log("list data ::", data);
  return success ? data : null;
};
