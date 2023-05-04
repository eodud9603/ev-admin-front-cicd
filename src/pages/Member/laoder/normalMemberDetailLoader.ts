import { getNormalMemberDetail } from "src/api/member/memberApi";
import { IRequestNormalMemberDetail } from "src/api/member/memberApi.interface";
import { loadTabData } from "src/utils/loadTabData";
import { IChargerDetailResponse } from "src/api/charger/chargerApi.interface";

export const normalMemberDetailLoader = async ({
  params,
}: {
  params: Partial<IRequestNormalMemberDetail>;
}) => {
  const { id } = params;
  if (!id) {
    return null;
  }

  const loadData = loadTabData<IChargerDetailResponse | null>(
    `/member/normal/detail/${id}`
  );

  if (loadData?.data) {
    return { data: loadData.data, editable: loadData.editable };
  }

  /* 상세 조회  */
  const { code, data } = await getNormalMemberDetail({ id });
  /** 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? { data: data } : null;
};
