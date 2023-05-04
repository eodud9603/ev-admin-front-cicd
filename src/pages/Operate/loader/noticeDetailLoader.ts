import { getNoticeDetail } from "src/api/board/noticeApi";
import { IRequestNoticeDetail } from "src/api/board/noticeApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { IChargerDetailResponse } from "src/api/charger/chargerApi.interface";

export const noticeDetailLoader = async ({
  params,
}: {
  params: Partial<IRequestNoticeDetail>;
}) => {
  const { id } = params;
  if (!id) {
    return null;
  }

  const loadData = loadTabData<IChargerDetailResponse | null>(
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
