import { getChargerDetail } from "src/api/charger/chargerApi";
import { loadTabData } from "src/utils/loadTabData";
import { IChargerDetailResponse } from "src/api/charger/chargerApi.interface";

interface IChargerDetailParams {
  params: {
    id?: number;
  };
}

export type chargerDetailLoaderType = {
  charger: Partial<IChargerDetailResponse>;
  editable?: boolean;
};

export const chargerDetailLoader = async ({ params }: IChargerDetailParams) => {
  if (!params?.id) {
    return {};
  }

  const loadData = loadTabData<IChargerDetailResponse | null>(
    `/charger/charger/detail/${params.id}`
  );

  if (loadData?.data) {
    return { charger: loadData.data, editable: loadData.editable };
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getChargerDetail({ searchKey: params.id });

  return { charger: data } ?? {};
};
