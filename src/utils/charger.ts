import { TChargerModeKeys } from "src/constants/charger";

/* 충전기 상태별 컬러 return */
export const getChargerStatusColor = (status: TChargerModeKeys) => {
  switch (status) {
    case "S1":
      return "danger";
    case "S2":
    case "S3":
      return "info";
    case "S6":
      return "success";
    default:
      return "secondary";
  }
};
