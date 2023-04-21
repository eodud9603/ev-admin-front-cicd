import { getEvModelList } from "src/api/ev/evModelApi";
import { IRequestEvModelList } from "src/api/ev/evModelApi.interface";

const defaultParams: IRequestEvModelList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const evModelListLoader = async () => {
   /* 검색  */
   const { code, data } = await getEvModelList(defaultParams);
   /** 검색 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};
