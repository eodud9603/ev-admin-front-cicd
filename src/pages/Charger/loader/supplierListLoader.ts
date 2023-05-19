import { getSupplierList } from "src/api/supplier/supplierApi";
import { IRequestSupplierList } from "src/api/supplier/supplierApi.interface";
import { YNType } from "src/api/api.interface";
import { loadTabData } from "src/utils/loadTabData";
import { getParams } from "src/utils/params";

export const INIT_SUPPLIER = {
  searchType: "SupplierName",
  searchKeyword: "",
  isActive: "" as YNType,
  sort: "CreatedDate",
  isContracted: "" as YNType,
  size: "10",
  page: 0,
};

export const supplierListLoader = async () => {
  const loadData = loadTabData("/charger/operator");

  const params = {
    ...INIT_SUPPLIER,
    ...(loadData?.filterData as unknown as IRequestSupplierList),
    page: (loadData?.currentPage ?? 1) - 1,
  } as IRequestSupplierList;
  getParams(params);
  if (!params.searchKeyword) {
    delete params.searchType;
  }

  /* 검색  */
  const { code, data } = await getSupplierList(params);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? INIT_SUPPLIER,
    currentPage: loadData?.currentPage,
  };
};
