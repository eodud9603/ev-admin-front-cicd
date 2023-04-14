import { getManufactureList } from "src/api/manufactures/manufactureApi";
import { IRequestManufactureList } from "src/api/manufactures/manufactureApi.interface";

const defaultParams: IRequestManufactureList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CompanyId",
};

export const manufactureListLoader = async () => {
   /* 검색  */
   const { code, data } = await getManufactureList(defaultParams);
   /** 검색 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};
