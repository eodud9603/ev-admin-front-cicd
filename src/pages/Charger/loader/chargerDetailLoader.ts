import { getChargerDetail } from "src/api/charger/chargerApi";

interface IChargerDetailParams {
  params: {
    id?: number;
  };
}

export const chargerDetailLoader = async ({ params }: IChargerDetailParams) => {
  if (!params?.id) {
    return {};
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getChargerDetail({ searchKey: params.id });

  return  data ?? {};
};
