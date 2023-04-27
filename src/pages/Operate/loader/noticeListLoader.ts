import { getNoticeList } from "src/api/board/noticeApi";
import { IRequestNoticeList } from "src/api/board/noticeApi.interface";

const defaultParams: IRequestNoticeList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreateAt",
};

export const noticeListLoader = async () => {
  /* 검색  */
  const { code, data } = await getNoticeList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
