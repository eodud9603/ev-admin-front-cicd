import { loadTabData } from "src/utils/loadTabData";
import {
  TBrokenStatus,
  TCapacityKeys,
  TChargerModeKeys,
  TChargerRationKeys,
  TChargerTypeKeys,
  TInfprotocolStatusKeys,
  TInstallGubunKeys,
  TInstallTypeKeys,
  TOperationStatusKeys,
  TPgCodeKeys,
  TQrTypeKeys,
  TReservationTypeKeys,
  TUseCodeKeys,
} from "src/constants/status";
import { YNType } from "src/api/api.interface";

export const INIT_BROKEN_ADD = {
  /* 기본정보 */
  stationKey: "",
  stationName: "",
  chargerKey: "",
  searchKey: "",
  reservation: "",
  damagedPart01: "" as TBrokenStatus,
  damagedPart02: "" as TBrokenStatus,
  managerMemo: "",
  brokenContent: "",
  managerName: "",
};

export const brokenRegistrationLoader = () => {
  const loadData = loadTabData<typeof INIT_BROKEN_ADD>(
    "/charger/trouble/registration"
  );

  return loadData?.data ?? INIT_BROKEN_ADD;
};
