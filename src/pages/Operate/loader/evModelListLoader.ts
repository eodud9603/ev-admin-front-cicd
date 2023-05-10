import { getEvModelList } from "src/api/ev/evModelApi";
import { IRequestEvModelList } from "src/api/ev/evModelApi.interface";
import { loadTabData } from "src/utils/loadTabData";

const defaultParams: IRequestEvModelList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "Year",
};

export const INIT_EV_MODEL = {
  startDate: "",
  endDate: "",
  chargerClass: "",
  searchRange: "ManagerName",
  searchText: "",
  chargerType: "",
  sort: "Year",
  count: "10",
};

export const evModelListLoader = async () => {
  const loadData = loadTabData("/operate/evModel");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getEvModelList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_EV_MODEL };
};
