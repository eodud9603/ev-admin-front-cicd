import { getBrokenDetail } from "src/api/broken/brokenApi";

interface IBrokenDetailParams {
  params: {
    id?: number;
  };
}

export const brokenDetailLoader = async ({ params }: IBrokenDetailParams) => {
  if (!params?.id) {
    return {};
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getBrokenDetail({ id: params.id });

  return  data ?? {};
};
