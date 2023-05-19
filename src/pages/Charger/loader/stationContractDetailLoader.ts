import { getStationContractDetail } from "src/api/station/stationApi";
import { loadTabData } from "src/utils/loadTabData";
import { IChargerDetailResponse } from "src/api/charger/chargerApi.interface";

interface IStationContractDetailParams {
  params: {
    id?: number;
  };
}

export const stationContractDetailLoader = async ({
  params,
}: IStationContractDetailParams) => {
  if (!params?.id) {
    return null;
  }

  const loadData = loadTabData<IChargerDetailResponse | null>(
    `/station/contract/detail/${params.id}`
  );

  if (loadData?.data) {
    return loadData;
  }
  /* 충전소 상세 정보 조회 */
  const { data } = await getStationContractDetail({ contractId: params.id });

  return data ? { data: data } : {};
};
