import { loadTabData } from "src/utils/loadTabData";
import { TContractStatus } from "src/constants/status";
import { YNType } from "src/api/api.interface";

export const INIT_STATION_CONTRACT_ADD = {
  /* 기본정보 */
  inputs: {
    place: "",
    contractorName: "",
    code: "" as TContractStatus,
    isMeRoaming: "" as YNType,
    meStationId: "",
    contractStartDt: "",
    contractEndDt: "",
    addressSido: "",
    addressSigugun: "",
    addressDongmyun: "",
    managerName: "",
    managerPhone: "",
    salesCompany: "",
    salesManagerName: "",
    salesManagerPhone: "",
    contractInfo: "",
    contractDt: "",
    subsidyAgency: "",
    subsidyYyyy: "",
    subsidyAmount: "",
    subsidyRevDt: "",
    costSales: "",
    costConstruct: "",
    esafetyMng: "",
  },
  fileData: {
    fileInfoData: {
      type: "",
      name: "",
    },
    blobStringData: "",
  },
};

export const stationContractAddLoader = () => {
  const loadData = loadTabData("/station/contract/add");

  return loadData?.data ?? INIT_STATION_CONTRACT_ADD;
};
