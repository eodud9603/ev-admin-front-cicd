import { loadTabData } from "src/utils/loadTabData";
import { TUploadTypeKeys } from "src/constants/status";

export const INIT_OPERATE_NOTICE_ADD = {
  /* 기본정보 */
  writer: "",
  readCount: "",
  uploadType: "" as TUploadTypeKeys,
  title: "",
  content: "",
  files: [] as { id: number; fileName: string; filePath: string }[],
};

export const noticeAddLoader = () => {
  const loadData = loadTabData<typeof INIT_OPERATE_NOTICE_ADD>(
    "/operate/notice/add"
  );

  return loadData?.data ?? INIT_OPERATE_NOTICE_ADD;
};
