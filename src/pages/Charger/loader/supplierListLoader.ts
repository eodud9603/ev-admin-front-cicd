import { getSupplierList } from "src/api/supplier/supplierApi";
import { IRequestSupplierList } from "src/api/supplier/supplierApi.interface";

const defaultParams: IRequestSupplierList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const supplierListLoader = async () => {
   /* 검색  */
   const { code, data } = await getSupplierList(defaultParams);
   /** 검색 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};
