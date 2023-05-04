import { FieldValidation } from "src/utils/validate";
import { number, string } from "yup";
import { REGEX } from "src/constants/valid/regex";
import { GENDER_TYPE } from "src/constants/status";

type FieldSchemaMap = Record<string, FieldValidation>;

/** 회원 및 카드 관리 > 회원관리 > 수정 yup */
export const YUP_NORMAL_MEMBER: FieldSchemaMap = {
  id: {
    validation: string().required("회원정보를 찾을 수 없습니다."),
  },
  gender: {
    validation: number()
      .required("성별은 필수 입력 항목입니다.")
      .oneOf(
        Object.keys(GENDER_TYPE).map((key) => Number(key)),
        "성별은 남자 또는 여자여야 합니다."
      ),
  },
  empNumber: {
    validation: string().required("사원번호는 필수 입력 항목입니다."),
  },
  checkerPhone: {
    validation: string()
      .required("휴대전화 번호는 필수 입력 항목입니다.")
      .matches(
        REGEX.tel,
        "유효한 휴대전화 번호를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  email: {
    validation: string()
      .required("이메일은 필수 입력 항목입니다.")
      .matches(REGEX.email, "유효한 이메일 주소를 입력해주세요."),
  },
  phone: {
    validation: string()
      .required("전화번호는 필수 입력 항목입니다.")
      .matches(
        REGEX.tel,
        "유효한 전화번호를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  isAgreeEmail: {
    validation: string()
      .required("메일 수신 동의 여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "메일 수신 동의 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  isAgreeSms: {
    validation: string()
      .required("SMS 수신 동의 여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "SMS 수신 동의 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  isAgreeMarketing: {
    validation: string()
      .required("마케팅 활용 동의 여부는 필수 선택 항목입니다.")
      .matches(
        REGEX.yn,
        "마케팅 활용 동의 여부는 Y 또는 N 중 하나여야 합니다."
      ),
  },
};
