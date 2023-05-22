import { getManufactureDetail } from "src/api/manufactures/manufactureApi";
import {
  IManufactureDetailResponse,
  IRequestManufactureDetail,
} from "src/api/manufactures/manufactureApi.interface";
import { loadTabData } from "src/utils/loadTabData";

const INIT_DATA = {
  tab: "BASIC",
  basic: {},
  models: [],
  editable: true,
};

export const manufactureDetailLoader = async ({
  params,
}: {
  params: Partial<IRequestManufactureDetail>;
}) => {
  if (!params?.id) {
    return INIT_DATA;
  }

  const loadData = loadTabData<IManufactureDetailResponse | null>(
    `/charger/manufacturer/detail/${params.id}`
  );

  if (loadData?.data) {
    return {
      ...loadData.data,
      editable: loadData.editable,
    };
  }

  /* 상세 조회  */
  const { data: manufactureData } = await getManufactureDetail({
    id: params.id,
  });

  return {
    ...INIT_DATA,
    basic: manufactureData || {},
    models: manufactureData?.models || [],
  };
};
