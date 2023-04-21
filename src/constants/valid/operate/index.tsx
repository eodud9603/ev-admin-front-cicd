import { FieldValidation } from "src/utils/validate";
import { number, string } from "yup";

type FieldSchemaMap = Record<string, FieldValidation>;

/** 전기차 모델 등록 yup */
export const YUP_OPERATE_EV_MODEL: FieldSchemaMap = {
  chargerClass: {
    validation: string().required("급속/완속은 필수 입력 항목입니다."),
  },
  chargerType: {
    validation: string().required("커넥터 타입은 필수 입력 항목입니다."),
  },
  manufactureId: {
    validation: number().required("제조사명은 필수 입력 항목입니다."),
  },
  modelName: {
    validation: string().required("모델명은 필수 입력 항목입니다."),
  },
  year: {
    validation: number()
      .required("연식은 필수 입력 항목입니다.(yyyy)")
      .moreThan(1959, "1960년 이후의 숫자를 입력해주세요."),
  },
  capacity: {
    validation: number().required("배터리 용량은 필수 입력 항목입니다."),
  },
  memo: { validation: string().required("차량 이슈는 필수 입력 항목입니다.") },
};

/** 전기차 모델 수정 yup */
export const YUP_OPERATE_EV_MODEL_EXTRA: FieldSchemaMap = {
  id: { validation: string().required("ID는 필수 입력 항목입니다.") },
  managerName: {
    // validation: string().required("관리자명은 필수 입력 항목입니다."),
    validation: string().optional(),
  },
};
