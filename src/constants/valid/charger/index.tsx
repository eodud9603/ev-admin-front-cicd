import { BROKEN_STATUS } from "src/constants/status";
import { FieldValidation } from "src/utils/validate";
import { number, string } from "yup";

type FieldSchemaMap = Record<string, FieldValidation>;

/** 충전소 yup */
export const YUP_CHARGER_STATION: FieldSchemaMap = {
  stationName: {
    validation: string().required("충전소명은 필수 입력 항목입니다."),
  },
  stationKey: {
    validation: string()
      .required("충전소 ID는 필수 입력 항목입니다.")
      .min(6, "충전소 ID는 최소 6자리입니다.")
      .max(8, "충전소 ID는 최대 8자리입니다."),
  },
  location: {
    validation: string().required("충전소 위치는 필수 입력 항목입니다."),
  },
  operator: {
    validation: string()
      .required("충전서비스사업자 필수 선택 항목입니다.")
      .oneOf(["HEV", "JEV"], "충전서비스사업자 값이 유효하지 않습니다."),
  },
  isUse: {
    validation: string()
      .required("사용여부는 필수 선택 항목입니다.")
      .oneOf(["Y", "N"], "사용여부는 사용 또는 미사용 중 하나여야 합니다."),
  },
  /** @TODO 위탁사업자 dropdown */
  business: {
    validation: string().optional(),
    // validation: string().required("위탁사업자명은 필수 선택 항목입니다."),
  },
  consignmentCompany: {
    validation: string().required("위탁사업자명은 필수 선택 항목입니다."),
  },
  isOpen: {
    validation: string()
      .required("개방여부는 필수 선택 항목입니다.")
      .oneOf(["Y", "N"], "개방여부는 완전 또는 부분 중 하나여야 합니다."),
  },
  quickChargerCount: {
    validation: number()
      .required("급속충전기 수는 필수 선택 항목입니다.")
      .min(0, "급속충전기 수는 0보다 커야합니다."),
  },
  standardChargerCount: {
    validation: number()
      .required("완속충전기 수는 필수 선택 항목입니다.")
      .min(0, "완속충전기 수는 0보다 커야합니다."),
  },
  powerSocket: {
    validation: string().required("과금형콘센트명은 필수 선택 항목입니다."),
  },
  powerSocketCount: {
    validation: number()
      .required("과금형콘센트 수는 필수 선택 항목입니다.")
      .min(0, "과금형콘센트 수는 0보다 커야합니다."),
  },
  isHidden: {
    validation: string().required("충전소 노출여부는 필수 선택 항목입니다."),
  },
  supplyMethod: {
    validation: string()
      .required("수전방식은 필수 선택 항목입니다.")
      .oneOf(["1", "2"], "수전방식은 자중 또는 가공 중 하나여야 합니다."),
  },
  billDivision: {
    validation: string()
      .required("모자분리여부는 필수 선택 항목입니다.")
      .oneOf(["Y", "N"], "모자분리여부는 모자 또는 자가 중 하나여야 합니다."),
  },
  kepcoCustomerNum: {
    validation: string().required("한전고객번호는 필수 입력 항목입니다."),
  },
  meterNum: {
    validation: string().required("계기번호는 필수 입력 항목입니다."),
  },
  kepcoFee: {
    validation: number().required("한전선택요금은 필수 입력 항목입니다."),
  },
  kepcoOffice: {
    validation: string().required("해당 한전영업소은 필수 입력 항목입니다."),
  },
  kepcoPayment: {
    validation: string().required("한전불임금은 필수 선택 항목입니다."),
  },
  entryDate: {
    validation: string().required("전기인입일은 필수 입력 항목입니다."),
  },
  chargerLocation: {
    validation: string().required("충전기 위치는 필수 입력 항목입니다."),
  },
  addressRoad: {
    validation: string().required("도로명 주소는 필수 입력 항목입니다."),
  },
  zoneCode: {
    validation: string().required("우편번호는 필수 입력 항목입니다."),
  },
  addressJibun: {
    validation: string().required("지번 주소는 필수 입력 항목입니다."),
  },
  addressJibunDetail: {
    validation: string().required("지번 상세 주소는 필수 입력 항목입니다."),
  },
  memo: {
    validation: string().required("충전소 특이사항은 필수 입력 항목입니다."),
  },
  etcInfo: {
    validation: string()
      .required("충전불가 차량은 필수 입력 항목입니다.")
      .matches(
        /^[\s\S]*?(?:,[\s\S]+)*$/,
        "충전불가 차량 형식이 맞지 않습니다."
      ),
  },
  /* 운영정보 */
  baseOperationTimeFrom: {
    validation: string()
      .required("운영시작시간(평일)는 필수 입력 항목입니다.")
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."
      ),
  },
  baseOperationTimeTo: {
    validation: string()
      .required("운영시작시간(휴일)는 필수 입력 항목입니다.")
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."
      ),
  },
  holidayOperationTimeFrom: {
    validation: string()
      .required("운영종료시간(휴일)는 필수 입력 항목입니다.")
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."
      ),
  },
  holidayOperationTimeTo: {
    validation: string()
      .required("운영종료시간(토)는 필수 입력 항목입니다.")
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."
      ),
  },
  saturdayOperationTimeFrom: {
    validation: string()
      .required("운영시작시간(토)는 필수 입력 항목입니다.")
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."
      ),
  },
  saturdayOperationTimeTo: {
    validation: string()
      .required("운영종료시간(토)는 필수 입력 항목입니다.")
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."
      ),
  },
  isParkFeeFree: {
    validation: string()
      .optional()
      .oneOf(["", "Y", "N"], "활용 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  parkFee: {
    validation: string().required("주차비 상세는 필수 입력 항목입니다."),
  },
  /* 지도 좌표 */
  lat: {
    validation: number()
      .required("위도는 필수 입력 항목입니다.")
      .min(35, "위도는 35보다 커야합니다.")
      .max(38, "위도는 38보다 클 수 없습니다."),
  },
  lng: {
    validation: number()
      .required("경도는 필수 입력 항목입니다.")
      .min(125, "경도는 125보다 커야합니다.")
      .max(128, "경도는 128보다 작을 수 없습니다."),
  },
  /* 계약정보 */
  contractId: {
    // validation: number().required("계약 ID는 필수 입력 항목입니다."),
    validation: number().optional(),
  },
};

/** 충전기 고장/파손 yup */
export const YUP_CHARGER_BROKEN: FieldSchemaMap = {
  stationKey: {
    validation: string().required("충전소 ID는 필수 입력 항목입니다."),
  },
  stationName: {
    validation: string().required("충전소명은 필수 입력 항목입니다."),
  },
  chargerKey: {
    validation: string().required("충전기 ID는 필수 입력 항목입니다."),
  },
  searchKey: {
    validation: string().required("충전기검색키는 필수 입력 항목입니다."),
  },
  reservation: {
    validation: string().required("예약번호는 필수 입력 항목입니다."),
  },
  damagedPart01: {
    validation: string()
      .required("고장부위1은 필수 입력 항목입니다.")
      .oneOf(Object.keys(BROKEN_STATUS), "유효한 고장 부위2을 입력해주세요."),
  },
  damagedPart02: {
    validation: string()
      .oneOf(
        [...Object.keys(BROKEN_STATUS), ""],
        "유효한 고장 부위2을 입력해주세요."
      )
      .optional(),
  },
  managerMemo: {
    validation: string().required("관리자 내용은 필수 입력 항목입니다."),
  },
  brokenContent: {
    validation: string().required("내용은 필수 입력 항목입니다."),
  },
  /** @TODO 현재 관리자 검색 후, 등록할 수 있는 서버 API가 없으므로 대기 */
  managerName: {
    validation: string().optional(),
    // validation: string().required("관리자 이름은 필수 입력 항목입니다."),
  },
};

/** 충전기 고장/파손 추가(등록 이후 생기는 데이터) yup */
export const YUP_CHARGER_BROKEN_EXTRA: FieldSchemaMap = {
  /** @TODO optional 항목 추후 필수로 변경 필요 (현재 해당 필드에 데이터가 없으므로 optional 처리) */
  reporterName: {
    validation: string().optional(),
    // validation: string().required("등록자 이름은 필수 입력 항목입니다."),
  },
  reporterPhone: {
    validation: string().optional(),
    // validation: string()
    //   .matches(
    //     /^(\d{3})-(\d{3,4})-(\d{4})$/,
    //     "등록자 연락처에 유효한 전화번호를 입력해주세요.\n(000-000-0000 또는 000-0000-0000)"
    //   )
    //   .required("등록자 연락처는 필수 입력 항목입니다."),
  },
  brokenStatus: {
    validation: string().required("처리 상태는 필수 선택 항목입니다."),
  },
  processDate: {
    validation: string().optional(),
    // validation: string().required("처리 일자는 필수 입력 항목입니다."),
  },
  processMemo: {
    validation: string().required("처리자 내용은 필수 입력 항목입니다."),
  },
};

/** 서비스 운영사 yup */
export const YUP_CHARGER_OPERATOR: FieldSchemaMap = {
  name: {
    validation: string().required("운영사명은 필수 입력 항목입니다."),
  },
  supplierId: {
    validation: string().required("운영사ID는 필수 입력 항목입니다."),
  },
  code: {
    validation: string().required("한전기관ID 필수 입력 항목입니다."),
  },
  meAuthKey: {
    validation: string().required(
      "한전기관인증키(로밍)은 필수 입력 항목입니다."
    ),
  },
  phoneNumber: {
    validation: string()
      .required("사업자 전화번호는 필수 입력 항목입니다.")
      .matches(
        /^(\d{3})-(\d{4})-(\d{4})$/,
        "유효한 사업자 전화번호를 입력해주세요.\n(000-0000-0000)"
      ),
  },
  mainPhoneNumber: {
    validation: string()
      .required("사업자 대표 번호는 필수 입력 항목입니다.")
      .matches(
        /^(\d{3})-(\d{4})-(\d{4})$/,
        "유효한 사업자 대표 전화번호를 입력해주세요.\n(000-0000-0000)"
      ),
  },
  zipCode: {
    validation: string().required("우편번호는 필수 입력 항목입니다."),
  },
  address: {
    validation: string().required("주소는 필수 입력 항목입니다."),
  },
  addressDetail: {
    validation: string().required("상세주소는 필수 입력 항목입니다."),
  },
  isContracted: {
    validation: string()
      .required("계약 여부는 필수 입력 항목입니다.")
      .oneOf(["Y", "N"], "계약 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  isActive: {
    validation: string()
      .required("활용 여부는 필수 입력 항목입니다.")
      .oneOf(["Y", "N"], "활용 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  contractedDate: {
    validation: string().required(),
  },
};
