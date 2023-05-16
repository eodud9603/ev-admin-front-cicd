import { loadTabData } from "src/utils/loadTabData";
import { TMemberStatusTypeKey, TStationTypeKey } from "src/constants/status";
import { getMemberWithdrawList } from "src/api/member/withdrawApi";
import { IRequestWithdrawMemberList } from "src/api/member/withdrawApi.interface";

const defaultParams: IRequestWithdrawMemberList = {
  size: 10,
  page: 0,
};

export const INIT_WITHDRAW_MEMBER = {
  startDate: "",
  endDate: "",
  searchType: "" as TMemberStatusTypeKey,
  searchRange: "UserId",
  searchText: "",
  stationOperator: "" as TStationTypeKey,
  sort: "DeleteAt" as IRequestWithdrawMemberList["sort"],
  count: "10",
};

export const memberWithdrawListLoader = async () => {
  const loadData = loadTabData("/member/withdraw");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getMemberWithdrawList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_WITHDRAW_MEMBER };
};
