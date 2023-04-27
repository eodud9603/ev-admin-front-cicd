import { loadTabData } from "src/utils/loadTabData";
import { TContractStatus } from "src/constants/status";
import { YNType } from "src/api/api.interface";
import { IStationContractDetailResponse } from "src/api/station/stationApi.interface";

export type chargerContractAddLoaderType = {
  inputs: IStationContractDetailResponse;
  fileData: Partial<{
    fileInfoData: Partial<{
      type: string;
      name: string;
    }>;
    blobStringData: string;
  }>;
};
export const chargerContractAddLoader = () => {
  const loadData = loadTabData("/charger/contract/add");

  return (
    loadData?.data ?? {
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
    }
  );
};
