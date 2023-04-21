import { BROKEN_STATUS } from "src/constants/status";
import { FieldValidation } from "src/utils/validate";
import { string } from "yup";

type FieldSchemaMap = Record<string, FieldValidation>;

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
      .oneOf(Object.keys(BROKEN_STATUS), "유효한 고장 부위2을 입력해주세요.")
      .required("고장부위1은 필수 입력 항목입니다."),
  },
  damagedPart02: {
    validation: string()
      .oneOf(
        [...Object.keys(BROKEN_STATUS), ""],
        "유효한 고장 부위1을 입력해주세요."
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
  // managerName: {
  //   validation: string().required("관리자 이름은 필수 입력 항목입니다."),
  // },
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
      .matches(
        /^(\d{3})-(\d{4})-(\d{4})$/,
        "유효한 사업자 전화번호를 입력해주세요.\n(000-0000-0000)"
      )
      .required("사업자 전화번호는 필수 입력 항목입니다."),
  },
  mainPhoneNumber: {
    validation: string()
      .matches(
        /^(\d{3})-(\d{4})-(\d{4})$/,
        "유효한 사업자 대표 전화번호를 입력해주세요.\n(000-0000-0000)"
      )
      .required("사업자 대표 번호는 필수 입력 항목입니다."),
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
      .oneOf(["Y", "N"], "계약 여부는 Y 또는 N 중 하나여야 합니다.")
      .required("계약 여부는 필수 입력 항목입니다."),
  },
  isActive: {
    validation: string()
      .oneOf(["Y", "N"], "활용 여부는 Y 또는 N 중 하나여야 합니다.")
      .required("활용 여부는 필수 입력 항목입니다."),
  },
  contractedDate: {
    validation: string().required(),
  },
};
