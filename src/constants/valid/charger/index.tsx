import { FieldValidation } from "src/utils/validate";
import { string } from "yup";

type FieldSchemaMap = Record<string, FieldValidation>;

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
