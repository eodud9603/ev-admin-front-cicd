import { getStationDetail } from "src/api/station/stationApi";

interface IChargerDetailParams {
  params: {
    id?: string;
  };
}

export const chargerDetailLoader = async ({ params }: IChargerDetailParams) => {
  if (!params?.id) {
    return null;
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getStationDetail({ id: params.id });

  return { station: data ?? {} };
};
