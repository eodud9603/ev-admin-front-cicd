import { loadTabData } from "src/utils/loadTabData";

export const chargerAddLoader = () => {
  const loadData: { [key: string]: string | number } | undefined = loadTabData(
    "/charger/charger/add"
  ) as { [key: string]: string | number };

  return (
    loadData ?? {
      /* 기본정보 */
      chargerStationName: "",
      chargerId: "",
      chargerAssetNumber: "",
      chargerType: "",
      installType: "",
      chargerVolume: "",
      /* 듀얼형 */
      dualType: "",
      dualCh1: "",
      dualCh2: "",
      envVersion: "",
      companyType: "",
      useStatus: "",
      consignmentName: "",
      manufacturerName: "",
      manufacturerModel: "",
      installStatus: "",
      connectorType: "",
      breakdownStatus: "",
      chargerStatus: "",
      paymentTerminalStatus: "",
      pg: "",
      interlockingStandard: "",
      rapidTime: "",
      unusedCycle: "",
      chargingCycle: "",
      syncEnvironment: "",
      syncKEPCO: "",
      rechargeAppAvailable: "",
      contractPrice: "",
      syncQR: "",
      reservationAvailable: "",
      significant: "",
      /* 계약정보 */
      installationCategory: "",
      installer: "",
      installationYear: "",
      installationMonth: "",
      serverDomain: "",
      serverPort: "",
      chargerSN: "",
      installationTR: "",
      chargerFirmware: "",
      currentChargerFirmware: "",
      /* 모뎀  */
      modemNumber: "",
      modemManufacturer: "",
      modemManufacturerTel: "",
      modemName: "",
      modemSN: "",
      /* 통신사  */
      carrier: "",
      communicationFee: "",
      /* 개통사  */
      openCarrier: "",
      openCarrierTel: "",
    }
  );
};
