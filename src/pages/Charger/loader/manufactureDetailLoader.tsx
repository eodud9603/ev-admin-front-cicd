import { getManufactureDetail } from "src/api/manufactures/manufactureApi";
import { IRequestManufactureDetail } from "src/api/manufactures/manufactureApi.interface";

export const manufactureDetailLoader = async ({
  params,
}: {
  params: Partial<IRequestManufactureDetail>;
}) => {
  if (!params?.id) {
    return {
      basic: {},
      model: {},
    };
  }
  /* 상세 조회  */
  const { data: manufactureData } = await getManufactureDetail({
    id: params.id,
  });

  return {
    basic: manufactureData || {},
    models: manufactureData?.models || [],
  };
};