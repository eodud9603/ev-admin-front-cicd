import { getSupplierDetail } from "src/api/supplier/supplierApi";

interface ISupplierDetailParams {
  params: {
    id?: number;
  };
}

export const supplierDetailLoader = async ({ params }: ISupplierDetailParams) => {
  if (!params?.id) {
    return {};
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getSupplierDetail({ id: params.id });

  return  data ?? {};
};
