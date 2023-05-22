import { loadTabData } from "src/utils/loadTabData";
import { YNType } from "src/api/api.interface";

export const INIT_SUPPLIER_ADD = {
  /* 기본정보 */
  inputs: {
    name: "",
    supplierId: "",
    code: "",
    meAuthKey: "",
    phoneNumber: "",
    mainPhoneNumber: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    isContracted: "" as YNType,
    isActive: "" as YNType,
    contractedDate: "",
    /** @TODO 로밍담가 데이터 추가 필요 (서버 우선 작업 필요) */
  },
};

export const supplierAddLoader = () => {
  const loadData = loadTabData<typeof INIT_SUPPLIER_ADD>(
    "/charger/operator/registration"
  );

  return loadData?.data ?? INIT_SUPPLIER_ADD;
};
