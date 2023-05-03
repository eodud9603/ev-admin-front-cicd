import { getBrokenDetail } from "src/api/broken/brokenApi";
import { loadTabData } from "src/utils/loadTabData";
import { IChargerDetailResponse } from "src/api/charger/chargerApi.interface";

interface IBrokenDetailParams {
  params: {
    id?: number;
  };
}

export const brokenDetailLoader = async ({ params }: IBrokenDetailParams) => {
  if (!params?.id) {
    return {};
  }

  const loadData = loadTabData<IChargerDetailResponse | null>(
    `/charger/trouble/detail/${params.id}`
  );

  if (loadData?.data) {
    return { data: loadData.data, editable: loadData.editable };
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getBrokenDetail({ id: params.id });

  return data ? { data: data } : {};
};
