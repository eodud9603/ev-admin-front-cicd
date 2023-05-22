import { loadTabData } from "src/utils/loadTabData";

export const INIT_FIRMWARE_LIST = [
  {
    id: undefined,
    modelName: "",
    size: undefined,
    version: "",
    firmwareId: undefined,
    firmwareFileName: "",
    firmwareFileUrl: "",
    imageId: undefined,
    imageFileName: "",
    imageUrl: "",
  },
];

export const INIT_MANUFACTURE_ADD = {
  tab: "BASIC" as "BASIC" | "FIRMWARE",
  /* 기본정보 */
  inputs: {
    code: "",
    name: "",
    identifier: "",
    companyId: "",
    managerName: "",
    managerPhone: "",
    managerExtPhone: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "" /** @TODO 서버에서 추가해줘야 하는 필드 */,
  },
  firmwareList: INIT_FIRMWARE_LIST,
};

export const manufactureAddLoader = () => {
  const loadData = loadTabData<typeof INIT_MANUFACTURE_ADD>(
    "/charger/manufacturer/registration"
  );

  return loadData?.data ?? INIT_MANUFACTURE_ADD;
};
