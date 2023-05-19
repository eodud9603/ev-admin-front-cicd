import { getBrokenList } from "src/api/broken/brokenApi";
import { IRequestBrokenList } from "src/api/broken/brokenApi.interface";
import { OperatorType } from "src/api/api.interface";
import { TChargerProcessingStatus } from "src/constants/status";
import { loadTabData } from "src/utils/loadTabData";
import { getParams } from "src/utils/params";
import { standardDateFormat } from "src/utils/day";

export const INIT_TROUBLE = {
  size: "10",
  page: 0,
  sido: "",
  gugun: "",
  dong: "",
  searchType: "StationName",
  submitStartDate: "",
  submitEndDate: "",
  searchKeyword: "",
  operator: "" as OperatorType,
  sort: "CreatedDate",
  status: "" as TChargerProcessingStatus,
};

export const brokenListLoader = async () => {
  const loadData = loadTabData("/charger/trouble");

  const params = {
    ...INIT_TROUBLE,
    ...(loadData?.filterData as unknown as IRequestBrokenList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestBrokenList;

  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }
  if (!params.submitStartDate || !params.submitEndDate) {
    delete params.submitStartDate;
    delete params.submitEndDate;
  } else {
    params.submitStartDate = standardDateFormat(
      params.submitStartDate,
      "YYYY.MM.DD"
    );
    params.submitEndDate = standardDateFormat(
      params.submitEndDate,
      "YYYY.MM.DD"
    );
  }

  /* 검색  */
  const { code, data } = await getBrokenList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_TROUBLE,
    currentPage: loadData?.currentPage,
  };
};
