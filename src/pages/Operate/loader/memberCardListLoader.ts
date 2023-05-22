import { loadTabData } from "src/utils/loadTabData";
import {
  TMemberCardDivisionTypeKey,
  TMemberCardStatusTypeKey,
} from "src/constants/status";
import { IRequestNormalCardList } from "src/api/card/cardApi.interface";
import { getNormalCardList } from "src/api/card/cardApi";

const defaultParams: IRequestNormalCardList = {
  size: 10,
  page: 0,
};

export const INIT_MEMBER_NORMAL_CARD = {
  startDate: "",
  endDate: "",
  groupName: "",
  cardStatusType: "" as TMemberCardStatusTypeKey,
  cardIssuanceType: "" as TMemberCardDivisionTypeKey,
  searchRange: "Name",
  searchText: "",
  sort: "Default",
  count: "10",
};

export const memberCardListLoader = async () => {
  const loadData = loadTabData("/member/card/normal");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getNormalCardList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_MEMBER_NORMAL_CARD };
};
