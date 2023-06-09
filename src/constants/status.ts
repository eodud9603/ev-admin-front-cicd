/**
 * @description 충전기 운영 상태
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%B6%A9%EC%A0%84%EA%B8%B0_%EC%9A%B4%EC%98%81_%EC%83%81%ED%83%9C
 * */
export const OPERATION_STATUS = {
  INSTALLED: "설치완료(정상)",
  REPAIR: "수리중",
  TO_BE_INSTALL: "설치예정",
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
  QUICK: "급속",
  STANDARD: "완속",
  UNKNOWN: "알수없음",
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
  PROGRESS: "진행중" /* (L2추가) */,
  EXCEPT: "접수제외" /* (L2추가) */,
  UNKNOWN: "알수없음",
} as const;
/** 고장/파손 처리 상태코드 키 타입 */
export type TChargerProcessingStatus = keyof typeof CHARGER_PROCESSING_STATUS;

/**
 * @description 계약 상태 코드
 * @see http://218.38.12.198:45081/docs/index.html#_%EA%B3%84%EC%95%BD_%EC%BD%94%EB%93%9C
 */
export const CONTRACT_STATUS = {
  SC01: "계약",
  SC80: "해지 대기",
  SC89: "해지",
} as const;
/** 계약 상태 코드 키 타입 */
export type TContractStatus = keyof typeof CONTRACT_STATUS;

/**
 * @description 고장 파손 부위, 서버 변경 가능성 있음.
 */
export const BROKEN_STATUS = {
  SB01: "액정",
  SB02: "충전기 외부",
  SB03: "분전함",
  SB04: "케이블",
  SB05: "커넥터",
  SB06: "충전불가",
  SB07: "사용불가",
} as const;
/** 고장 파손 부위 코드 키 타입 */
export type TBrokenStatus = keyof typeof BROKEN_STATUS;

/**
 * @description 연동규격
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%97%B0%EB%8F%99_%EA%B7%9C%EA%B2%A9
 */
export const INFPROTOCOL_STATUS = {
  IF01: "TCP",
  IF02: "OCPP 1.6",
} as const;
/** 연동규격 코드 키 타입 */
export type TInfprotocolStatusKeys = keyof typeof INFPROTOCOL_STATUS;

/**
 * @description 충전기 > 배터리 용량
 */
export const CAPACITY = {
  3: "3",
  7: "7",
  50: "50",
  100: "100",
} as const;
/** 충전기 > 배터리 용량 코드 키 타입 */
export type TCapacityKeys = keyof typeof CAPACITY;

/**
 * @description 충전소 > 수전방식
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%88%98%EC%A0%84%EB%B0%A9%EC%8B%9D
 */
export const SUPPLY_METHOD = {
  SM01: "자중",
  SM02: "가공",
} as const;
/** 충전소 > 수전방식 키 타입 */
export type TSupplyMethodKeys = keyof typeof SUPPLY_METHOD;

/**
 * @description 충전기 > 설치타입
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%84%A4%EC%B9%98%ED%83%80%EC%9E%85
 */
export const INSTALL_TYPE = {
  IS01: "스탠드형",
  IS02: "벽부형",
  IS03: "콘센트형",
} as const;
/** 충전기 > 설치타입 키 타입 */
export type TInstallTypeKeys = keyof typeof INSTALL_TYPE;

/**
 * @description 충전기 > 사용/전용 구분
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%82%AC%EC%9A%A9%EC%BD%94%EB%93%9C
 */
export const USE_CODE = {
  US01: "사용",
  US02: "미사용",
  US03: "전용",
} as const;
/** 충전기 > 사용/전용 구분 키 타입 */
export type TUseCodeKeys = keyof typeof USE_CODE;

/**
 * @description 충전기 > QR 연동여부
 * @see http://218.38.12.198:45081/docs/index.html#_qr_%EC%97%B0%EB%8F%99%EC%97%AC%EB%B6%80_qrtype
 */
export const QR_TYPE = {
  QR01: "카카오",
  QR02: "티맵",
  QR03: "현대",
  QR04: "E-PIT",
} as const;
/** 충전기 > QR 연동여부 키 타입 */
export type TQrTypeKeys = keyof typeof QR_TYPE;

/**
 * @description 충전기 > 예약 가능 여부
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%98%88%EC%95%BD_%ED%83%80%EC%9E%85_reservationtype
 */
export const RESERVATION_TYPE = {
  RV01: "비예약",
  RV02: "예약",
  RV03: "시범",
} as const;
/** 충전기 > 예약 가능 여부 키 타입 */
export type TReservationTypeKeys = keyof typeof RESERVATION_TYPE;

/**
 * @description 충전기 > 계약 > 설치구분
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%84%A4%EC%B9%98_%EA%B5%AC%EB%B6%84_install_gubun
 */
export const INSTALL_GUBUN = {
  IG01: "자체",
  IG02: "보조금",
  IG03: "납품",
  IG04: "위탁",
} as const;
/** 충전기 > 계약 > 설치구분 키 타입 */
export type TInstallGubunKeys = keyof typeof INSTALL_GUBUN;

/**
 * @description 충전기 > pg사
 * @see http://218.38.12.198:45081/docs/index.html#_pg%EC%82%AC_%EC%BD%94%EB%93%9C_pgcode
 */
export const PG_CODE = {
  PG01: "스마트로",
} as const;
/** 충전기 > pg사 키 타입 */
export type TPgCodeKeys = keyof typeof PG_CODE;

/**
 * @description 업로드 대상
 */
export const UPLOAD_TYPE = {
  ALL: "전체",
  IOS: "IOS",
  AOS: "AOS",
  APP: "APP",
  WEB: "WEB",
} as const;
/** 업로드 대상 키 타입 */
export type TUploadTypeKeys = keyof typeof UPLOAD_TYPE;

/**
 * @description 게시판 타입 (FAQ 등 추가 예정)
 */
export const enum BoardIdEnum {
  NOTICE = 1,
  FAQ = 2,
  EV_NEWS = 3,
}

/* 회원 관리 */
/**
 * @description 운영기관(회원 소속)
 */
export const STATION_OPERATOR = {
  HEV: "HEV",
  JEV: "JEV",
} as const;
/** 운영기관(회원 소속) 키 타입 */
export type TStationTypeKey = keyof typeof STATION_OPERATOR;

/**
 * @description 회원그룹(grade)
 */
export const MEMBER_STATUS_TYPE = {
  MS01: "정회원",
  MS02: "준회원",
  MS03: "이용정지",
} as const;
/** 회원그룹(grade) 키 타입 */
export type TMemberStatusTypeKey = keyof typeof MEMBER_STATUS_TYPE;

/**
 * @description 회원 등급(statusType)
 */
export const MEMBER_GRADE_TYPE = {
  MEMBER: "개인",
  GROUP: "그룹",
  COMPANY: "법인",
} as const;
/** 회원 등급(statusType) 키 타입 */
export type TMemberGradeTypeKey = keyof typeof MEMBER_GRADE_TYPE;

/**
 * @description 회원 카드 발급 상태(cardStatusType)
 */
export const MEMBER_CARD_STATUS_TYPE = {
  MCS01: "신청",
  MCS02: "발급",
  MCS03: "발송",
  MCS04: "수령완료",
} as const;
/** 회원 회원 카드 발급 상태(statusType) 키 타입 */
export type TMemberCardStatusTypeKey = keyof typeof MEMBER_CARD_STATUS_TYPE;

/**
 * @description 회원 카드 발급 상태(cardStatusType)
 */
export const MEMBER_CARD_DIVISION_TYPE = {
  NEW: "신규",
  REISSUANCE: "재발급",
} as const;
/** 회원 회원 카드 발급 상태(statusType) 키 타입 */
export type TMemberCardDivisionTypeKey = keyof typeof MEMBER_CARD_DIVISION_TYPE;

/**
 * @description 성별(gender)
 */
export const GENDER_TYPE = {
  1: "남자",
  2: "여자",
} as const;
/** 성별(gender) 키 타입 */
export type TGenderTypeKey = keyof typeof GENDER_TYPE;

/**
 * @description 관리자 유형 코드(권한코드)
 * @see http://218.38.12.198:45081/docs/index.html#_%EA%B4%80%EB%A6%AC%EC%9E%90_%EC%9C%A0%ED%98%95_%EC%BD%94%EB%93%9C%EA%B6%8C%ED%95%9C%EC%BD%94%EB%93%9C
 */
export const ROLE_TYPE = {
  ROLE001: "최고관리자",
  ROLE002: "일반관리자",
  ROLE011: "상담사",
  ROLE021: "제조사",
  ROLE031: "관계사",
} as const;
/** 관리자 유형 코드(권한코드) 키 타입 */
export type TRoleTypeKey = keyof typeof ROLE_TYPE;
