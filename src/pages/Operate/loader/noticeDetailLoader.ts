import { getNoticeDetail } from "src/api/board/noticeApi";
import {
  INoticeDetailResponse,
  IRequestNoticeDetail,
} from "src/api/board/noticeApi.interface";
import { loadTabData } from "src/utils/loadTabData";

export const noticeDetailLoader = async ({
  params,
}: {
  params: Partial<IRequestNoticeDetail>;
}) => {
  const { id } = params;
  if (!id) {
    return null;
  }

  const loadData = loadTabData<INoticeDetailResponse | null>(
    `/operate/notice/detail/${id}`
  );

  if (loadData?.data) {
    return { data: loadData.data, editable: loadData.editable };
  }

  /* 검색  */
  const { code, data } = await getNoticeDetail({ id });
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data } : null;
};
