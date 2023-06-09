import { getChargerListByStation } from "src/api/charger/chargerApi";
import { getStationDetail } from "src/api/station/stationApi";
import { loadTabData } from "src/utils/loadTabData";

const INIT_DATA = {
  data: {
    station: {},
    charger: [],
  },
  editable: true,
};

interface IStationDetailParams {
  params: {
    id?: string;
  };
}

export const stationDetailLoader = async ({ params }: IStationDetailParams) => {
  if (!params?.id) {
    return INIT_DATA;
  }

  const loadData = loadTabData(`/charger/station/detail/${params.id}`);
  if (loadData?.data) {
    return loadData;
  }
  /* 충전소 상세 정보 조회 */
  const { data } = await getStationDetail({ id: params.id });
  /* 충전소별 충전기 목록 조회 */
  const { data: chargerData } = await getChargerListByStation({
    stationId: params.id,
  });

  return {
    ...INIT_DATA,
    data: { station: data ?? {}, charger: chargerData ?? [] },
  };
};
