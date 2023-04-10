import { getStationContractDetail } from "src/api/station/stationApi";

interface IStationContractDetailParams {
  params: {
    id?: number;
  };
}

export const stationContractDetailLoader = async ({ params }: IStationContractDetailParams) => {
  if (!params?.id) {
    return null;
  }

  /* 충전소 상세 정보 조회 */
  const { data } = await getStationContractDetail({ contractId: params.id });

  return data ?? {};
};
