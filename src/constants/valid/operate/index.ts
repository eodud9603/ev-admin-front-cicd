import { UPLOAD_TYPE } from "src/constants/status";
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
  fileId: {
    validation: number().required("차량 이미지는 필수 입력 항목입니다."),
  },
};

/** 전기차 모델 수정 yup */
export const YUP_OPERATE_EV_MODEL_EXTRA: FieldSchemaMap = {
  id: { validation: string().required("ID는 필수 입력 항목입니다.") },
};

/** 공지사항 yup */
export const YUP_OPERATE_NOTICE: FieldSchemaMap = {
  title: {
    validation: string().required("제목은 필수 입력 항목입니다."),
  },
  content: {
    validation: string().required("내용은 필수 입력 항목입니다."),
  },
  isExpose: {
    validation: string().required("삭제여부는 필수 입력 항목입니다."),
  },
  uploadType: {
    validation: string()
      .required("업로드 대상은 필수 입력 항목입니다.")
      .oneOf(Object.keys(UPLOAD_TYPE), "잘못된 업로드 대상입니다."),
  },
};

/** 공지사항 수정 yup */
export const YUP_OPERATE_NOTICE_EXTRA: FieldSchemaMap = {
  id: { validation: number().required("ID는 필수 입력 항목입니다.") },
};

/** 카테고리 수정 yup */
export const YUP_OPERATE_CATEGORY: FieldSchemaMap = {
  fieldId: {
    validation: number()
      .required("ID는 필수 입력 항목입니다.")
      .moreThan(0, "분야를 선택해주세요."),
  },
  name: {
    validation: string().required("카테고리명은 필수 입력 항목입니다."),
  },
};
