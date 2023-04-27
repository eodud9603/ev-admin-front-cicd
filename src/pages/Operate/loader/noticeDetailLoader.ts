import { getNoticeDetail } from "src/api/board/noticeApi";
import { IRequestNoticeDetail } from "src/api/board/noticeApi.interface";

export const noticeDetailLoader = async ({ params }: {params: Partial<IRequestNoticeDetail>}) => {
  const { id } = params;
  if (!id) {
    return null;
  }

  /* 검색  */
  const { code, data } = await getNoticeDetail({ id });
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
