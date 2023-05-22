import { getSupplierDetail } from "src/api/supplier/supplierApi";
import { ISupplierDetailResponse } from "src/api/supplier/supplierApi.interface";
import { loadTabData } from "src/utils/loadTabData";

const INIT_DATA = {
  data: {},
  fileData: {},
  editable: true,
};

interface ISupplierDetailParams {
  params: {
    id?: number;
  };
}

export type ISupplierDetailLoaderType = {
  data: ISupplierDetailResponse;
  fileData: Partial<{
    fileInfoData: Partial<{
      type: string;
      name: string;
    }>;
    blobStringData: string;
  }>;
  editable: boolean;
};

export const supplierDetailLoader = async ({
  params,
}: ISupplierDetailParams) => {
  if (!params?.id) {
    return INIT_DATA;
  }

  const loadData = loadTabData<ISupplierDetailLoaderType | null>(
    `/charger/operator/detail/${params.id}`
  );

  if (loadData?.data) {
    return { ...loadData.data, editable: loadData.editable };
  }

  /* 충전기 상세 정보 조회 */
  const { data } = await getSupplierDetail({ id: params.id });

  return { ...INIT_DATA, data: data };
};
