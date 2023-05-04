import { getNormalMemberList } from "src/api/member/memberApi";
import { IRequestNormalMemberList } from "src/api/member/memberApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { TMemberStatusTypeKey, TStationTypeKey } from "src/constants/status";

const defaultParams: IRequestNormalMemberList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const INIT_NORMAL_MEMBER = {
  startDate: "",
  endDate: "",
  statusType: "" as TMemberStatusTypeKey,
  searchRange: "Name",
  searchText: "",
  stationOperator: "" as TStationTypeKey,
  sort: "CreatedDate" as IRequestNormalMemberList["sort"],
  count: "10",
};

export const normalMemberListLoader = async () => {
  const loadData = loadTabData("/member/normal");
  if (loadData?.data || loadData?.filterData) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getNormalMemberList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data, filterData: INIT_NORMAL_MEMBER } : null;
};
