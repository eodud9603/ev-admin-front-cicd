import { YNType } from "src/api/api.interface";
import { loadTabData } from "src/utils/loadTabData";
import { getParams } from "src/utils/params";
import {
  IAdminListResponse,
  IRequestAdminList,
} from "src/api/admin/adminApi.interface";
import { getAdminList } from "src/api/admin/adminAPi";

export const INIT_PARAMS = {
  searchType: "Name",
  searchKeyword: "",
  isBlock: "" as YNType,
  size: "10",
  page: 0,
};

export interface IOperatorAccountListType {
  data: IAdminListResponse;
  filterData: { [key: string]: any };
  currentPage: number;
}

export const operatorAccountListLoader = async () => {
  const loadData = loadTabData("/operator/account");

  const params = {
    ...INIT_PARAMS,
    ...(loadData?.filterData as unknown as IRequestAdminList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestAdminList;
  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }

  /* 검색  */
  const { code, data } = await getAdminList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_PARAMS,
    currentPage: loadData?.currentPage,
  };
};
