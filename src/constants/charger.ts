/**
 * @description 충전기 운영 상태
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EA%B8%B0_%EC%9A%B4%EC%98%81_%EC%83%81%ED%83%9C
 * */
export const OPERATION_STATUS = {
  TO_BE_INSTALL: "설치예정",
  INSTALLED: "설치완료",
  TO_BE_DEMOLISH: "철거예정",
  DEMOLISHED: "철거완료",
} as const;
/** 충전기 운영 상태 키 타입 */
export type TOperationStatusKeys = keyof typeof OPERATION_STATUS;

/**
 * @description 충전기 모드
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EA%B8%B0_%EB%AA%A8%EB%93%9C
 * */
export const CHARGER_MODE = {
  S0: "상태미정의",
  S1: "통신이상",
  S2: "충전대기",
  S3: "충전대기(케이블)",
  S4: "충전대기(비상정지)",
  S5: "충전대기(비상정지,케이블)",
  S6: "충전중",
  S7: "충전중(비상정지)",
  S8: "충전완료",
  S9: "충전완료(케이블)",
  S10: "충전완료(비상정지)",
  S11: "충전완료(비상정지,케이블)",
  S12: "운영중지",
  S13: "점검중",
  S14: "점검중",
  S99: "시운전필요(처음 설치시 데이터 통신 연결 전)",
} as const;
/** 충전기 모드 키 타입 */
export type TChargerModeKeys = keyof typeof CHARGER_MODE;

/**
 * @description 충전기 타입
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EA%B8%B0_%ED%83%80%EC%9E%85
 * */
export const CHARGER_TYPE = {
  T00: "알수없음",
  T01: "DC차데모",
  T02: "완속",
  T03: "AC3상 + DC차데모",
  T04: "DC콤보",
  T05: "DC콤보",
  T06: "AC3상",
  T07: "AC3상",
} as const;
/** 충전기 타입 키 타입 */
export type TChargerTypeKeys = keyof typeof CHARGER_TYPE;

/**
 * @description 충전기 등급
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EA%B8%B0_%EB%93%B1%EA%B8%89
 */
export const CHARGER_RATION = {
  UNKNOWN: "알수없음",
  QUICK: "급속",
  STANDARD: "완속",
} as const;
/** 충전기 등급 키 타입 */
export type TChargerRationKeys = keyof typeof CHARGER_RATION;

/**
 * @description 고장/파손 처리 상태코드 (서버: L1상태와 혼동되어 정리필요)
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%B2%98%EB%A6%AC_%EC%83%81_%ED%83%9C%EC%BD%94%EB%93%9C
 */
export const CHARGER_PROCESSING_STATUS = {
  SUBMIT: "알수없음",
  CONFIRM: "급속",
  COMPLETE: "완속",
  PROGRESS: "진행중", /* (L2추가) */
  EXCEPT: "접수제외", /* (L2추가) */
  UNKNOWN: "알수없음"
} as const;
/** 고장/파손 처리 상태코드 키 타입 */
export type TChargerProcessingStatus = keyof typeof CHARGER_PROCESSING_STATUS;