import { getNormalMemberList } from "src/api/member/memberApi";
import { IRequestNormalMemberList } from "src/api/member/memberApi.interface";

const defaultParams: IRequestNormalMemberList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreatedDate",
};

export const normalMemberListLoader = async () => {
  /* 검색  */
  const { code, data } = await getNormalMemberList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
