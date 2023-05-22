import { loadTabData } from "src/utils/loadTabData";
import { TBrokenStatus } from "src/constants/status";

export const INIT_BROKEN_ADD = {
  /* 기본정보 */
  inputs: {
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
  },
};

export const brokenRegistrationLoader = () => {
  const loadData = loadTabData<typeof INIT_BROKEN_ADD>(
    "/charger/trouble/registration"
  );

  return loadData?.data ?? INIT_BROKEN_ADD;
};
