import { getNoticeList } from "src/api/board/noticeApi";
import { IRequestNoticeList } from "src/api/board/noticeApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";

const defaultParams: IRequestNoticeList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "CreateAt",
};

export const INIT_OPERATE_NOTICE_LIST = {
  startDate: "",
  endDate: "",
  isExpose: "" as YNType,
  uploadType: "" as TUploadTypeKeys,
  searchRange: "Title",
  searchText: "",
  sort: "CreateAt" as IRequestNoticeList["sort"],
  count: "10",
};

export const noticeListLoader = async () => {
  const loadData = loadTabData("/operate/notice");
  if (Object.keys(loadData?.data ?? {}).length > 0) {
    return loadData;
  }
  /* 검색  */
  const { code, data } = await getNoticeList(defaultParams);
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: INIT_OPERATE_NOTICE_LIST };
};
