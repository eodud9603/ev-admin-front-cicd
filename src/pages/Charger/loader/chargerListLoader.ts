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

export const chargerListLoader = async () => {
  const loadData = loadTabData("/charger/charger");
  if (loadData?.data) {
    return loadData?.data;
  }
  /* 검색  */
  const { code, data } = await getChargerList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
