import { getSupplierList } from "src/api/supplier/supplierApi";
import { IRequestSupplierList } from "src/api/supplier/supplierApi.interface";
import { YNType } from "src/api/api.interface";
import { loadTabData } from "src/utils/loadTabData";

const defaultParams: IRequestSupplierList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const INIT_SUPPLIER = {
  searchRange: "SupplierName",
  searchText: "",
  isActive: "" as YNType,
  sort: "CreatedDate",
  isContracted: "" as YNType,
  count: "10",
};

export const supplierListLoader = async () => {
  const loadData = loadTabData("/charger/operator");
  if (loadData?.data || loadData?.filterData) {
    return loadData;
  }

  /* 검색  */
  const { code, data } = await getSupplierList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data, filterData: INIT_SUPPLIER } : null;
};
