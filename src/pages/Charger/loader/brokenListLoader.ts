import { getBrokenList } from "src/api/broken/brokenApi";
import { IRequestBrokenList } from "src/api/broken/brokenApi.interface";

const defaultParams: IRequestBrokenList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const brokenListLoader = async () => {
   /* 검색  */
   const { code, data } = await getBrokenList(defaultParams);
   /** 검색 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};
