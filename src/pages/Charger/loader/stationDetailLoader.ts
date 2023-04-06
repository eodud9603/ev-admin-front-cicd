import { getStationDetail } from "src/api/station/stationApi";

interface IStationDetailParams {
  params: {
    id?: string;
  }
}

export const stationDetailLoader = async ({ params }: IStationDetailParams) => {
  if (!params?.id) {
    return null;
  }

  const { code, data } = await getStationDetail({ id: params.id });
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
