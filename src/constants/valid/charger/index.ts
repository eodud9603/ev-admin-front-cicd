import {
  BROKEN_STATUS,
  STATION_OPERATOR,
  SUPPLY_METHOD,
} from "src/constants/status";
import { FieldValidation } from "src/utils/validate";
import { number, string } from "yup";
import { REGEX } from "src/constants/valid/regex";

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
      .oneOf(
        Object.keys(STATION_OPERATOR),
        "충전서비스사업자 값이 유효하지 않습니다."
      ),
  },
  isUse: {
    validation: string()
      .required("사용여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "사용여부는 사용 또는 미사용 중 하나여야 합니다."),
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
      .matches(REGEX.yn, "개방여부는 완전 또는 부분 중 하나여야 합니다."),
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
      .oneOf(
        Object.keys(SUPPLY_METHOD),
        "수전방식은 자중 또는 가공 중 하나여야 합니다."
      ),
  },
  billDivision: {
    validation: string()
      .required("모자분리여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "모자분리여부는 모자 또는 자가 중 하나여야 합니다."),
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
      .matches(REGEX.tel, "충전불가 차량 형식이 맞지 않습니다."),
  },
  /* 운영정보 */
  baseOperationTimeFrom: {
    validation: string()
      .required("운영시작시간(평일)는 필수 입력 항목입니다.")
      .matches(REGEX.time, "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."),
  },
  baseOperationTimeTo: {
    validation: string()
      .required("운영시작시간(휴일)는 필수 입력 항목입니다.")
      .matches(REGEX.time, "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."),
  },
  holidayOperationTimeFrom: {
    validation: string()
      .required("운영종료시간(휴일)는 필수 입력 항목입니다.")
      .matches(REGEX.time, "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."),
  },
  holidayOperationTimeTo: {
    validation: string()
      .required("운영종료시간(토)는 필수 입력 항목입니다.")
      .matches(REGEX.time, "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."),
  },
  saturdayOperationTimeFrom: {
    validation: string()
      .required("운영시작시간(토)는 필수 입력 항목입니다.")
      .matches(REGEX.time, "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."),
  },
  saturdayOperationTimeTo: {
    validation: string()
      .required("운영종료시간(토)는 필수 입력 항목입니다.")
      .matches(REGEX.time, "00:00 ~ 23:59 범위내 형식을 맞춰 작성해주세요."),
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

/** 충전기 > 기본정보 yup */
export const YUP_CHARGER: FieldSchemaMap = {
  chargerKey: {
    validation: number().required("충전기 ID는 필수 입력 항목입니다."),
  },
  assetNumber: {
    validation: string().required("충전기 자산번호는 필수 입력 항목입니다."),
  },
  chargerClass: {
    validation: string().required("종별은 필수 입력 항목입니다."),
  },
  installType: {
    validation: string().required("설치 타입은 필수 입력 항목입니다."),
  },
  capacity: {
    validation: number()
      .required("충전 용량은 필수 입력 항목입니다.")
      .min(1, "충전 용량은 1보다 작을 수 없습니다."),
  },
  isDualChannel: {
    validation: string()
      .optional()
      .matches(REGEX.yn, "듀얼형 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  channelType01: {
    validation: string().required("서버통신채널 타입1은 필수 입력 항목입니다."),
  },
  channelType02: {
    validation: string().optional(),
  },
  envVersion: {
    validation: string().required("환경변수버전은 필수 입력 항목입니다."),
  },
  consignmentGubun: {
    validation: string().required("자사/위탁 구분은 필수 입력 항목입니다."),
  },
  /** @TODO 수정 필요 */
  useCode: {
    validation: string().required("사용/전용 구분은 필수 입력 항목입니다."),
  },
  /** @TODO 위탁사 api추가 후, 수정 필요 */
  consignmentName: {
    // validation: string().required("위탁사는 필수 입력 항목입니다."),
    validation: string().optional(),
  },
  manufactureCode: {
    validation: string().required("제조사는 필수 입력 항목입니다."),
  },
  modelId: {
    validation: string().required("제조사 모델은 필수 입력 항목입니다."),
  },
  operationStatus: {
    validation: string().required("충전기 설치 상태는 필수 입력 항목입니다."),
  },
  type: {
    validation: string().required("충전기 커넥터 종류는 필수 입력 항목입니다."),
  },
  isBroken: {
    validation: string()
      .required("고장유무는 필수 입력 항목입니다.")
      .matches(REGEX.yn, "고장유무는 Y 또는 N 중 하나여야 합니다."),
  },
  status: {
    validation: string().required("충전기 상태는 필수 입력 항목입니다."),
  },
  hasPgTerm: {
    validation: string()
      .required("결제단말기 여부는 필수 입력 항목입니다.")
      .matches(REGEX.yn, "결제단말기 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  pgCode: {
    validation: string().required("결제단말기 PG사는 필수 입력 항목입니다."),
  },
  infProtocol: {
    validation: string().required("연동 규격은 필수 입력 항목입니다."),
  },
  maxChargeTime: {
    validation: number()
      .optional()
      .min(1, "최대 충전 시간(분)은 1분 보다 작을 수 없습니다.")
      .max(60, "최대 충전 시간(분)은 60분 보다 클 수 없습니다."),
  },
  idleCommunicationTime: {
    validation: number()
      .required("미사용 전송 주기(분)는 필수 입력 항목입니다.")
      .min(1, "미사용 전송 주기(분)는 1분 보다 작을 수 없습니다.")
      .max(60, "미사용 전송 주기(분)는 60분 보다 클 수 없습니다."),
  },
  busyCommunicationTime: {
    validation: number()
      .required("충전중 전송 주기(분)는 필수 입력 항목입니다.")
      .min(1, "충전중 전송 주기(분)는 1분 보다 작을 수 없습니다.")
      .max(60, "충전중 전송 주기(분)는 60분 보다 클 수 없습니다."),
  },
  isMeRoaming: {
    validation: string()
      .required("환경부 연동 여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "환경부 연동 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  isKepcoRoaming: {
    validation: string()
      .required("한전 연동 여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "한전 연동 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  enableCharging: {
    validation: string()
      .required("앱 충전 가능 여부는 필수 선택 항목입니다.")
      .matches(REGEX.yn, "앱 충전 가능 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  unitPrice: {
    validation: number()
      .required("계약 단가(원)는 필수 입력 항목입니다.")
      .min(1, "계약 단가(원)는 1보다 작을 수 없습니다."),
  },
  qrType: {
    validation: string().required("QR 연동여부는 필수 입력 항목입니다."),
  },
  reservationType: {
    validation: string().required("예약 가능 여부는 필수 입력 항목입니다."),
  },
  etcInfo: {
    validation: string().optional(),
  },
};

/** 충전기 > 기본정보(수정) yup */
export const YUP_CHARGER_EXTRA: FieldSchemaMap = {
  id: {
    validation: number().required("충전소 키를 찾을 수 없습니다."),
  },
};

/** 충전기 > 충전소정보 yup */
export const YUP_CHARGER_IN_STATION: FieldSchemaMap = {
  stationKey: {
    validation: string().required("충전소키는 필수 입력 항목입니다."),
  },
};

/** 충전기 > 설치정보 yup */
export const YUP_CHARGER_INSTALL: FieldSchemaMap = {
  gubun: {
    validation: string().required("설치구분은 필수 입력 항목입니다."),
  },
  companyName: {
    validation: string().required("설치업체는 필수 입력 항목입니다."),
  },
  yyyy: {
    validation: string().required("설치 연도는 필수 입력 항목입니다."),
  },
  mm: {
    validation: number()
      .required("설치 월은 필수 입력 항목입니다.")
      .min(1, "설치 월은 최소 1월이어야 합니다.")
      .max(12, "설치 월은 최대 12월이어야 합니다."),
  },
  serverDomain: {
    validation: string().required("서버 도메인은 필수 입력 항목입니다."),
  },
  serverPort: {
    validation: number().required("서버 PORT는 필수 입력 항목입니다."),
  },
  sn: {
    validation: string().required("충전기 S/N은 필수 입력 항목입니다."),
  },
  hasTr: {
    validation: string()
      .required("TR 설치여부는 필수 입력 항목입니다.")
      .matches(REGEX.yn, "TR 설치여부는 Y 또는 N 중 하나여야 합니다."),
  },
  fwVer: {
    validation: string().required("충전기 펌웨어는 필수 입력 항목입니다."),
  },
  fwVerCurrent: {
    // validation: string().required("현재 충전기 펌웨어은 필수 입력 항목입니다."),
    validation: string().optional(),
  },
};

/** 충전기 > 모뎀정보 yup */
export const YUP_CHARGER_MODEM: FieldSchemaMap = {
  openNumber: {
    validation: string().required("모뎀개통 번호는 필수 입력 항목입니다."),
  },
  company: {
    validation: string().required("모뎀 제조사는 필수 입력 항목입니다."),
  },
  companyPhone: {
    validation: string()
      .required("모뎀 제조사 연락처는 필수 입력 항목입니다.")
      .matches(
        REGEX.tel,
        "유효한 모뎀 제조사 연락처를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  name: { validation: string().required("모뎀명은 필수 입력 항목입니다.") },
  sn: { validation: string().required("모뎀S/N은 필수 입력 항목입니다.") },
  carrierName: {
    validation: string().required("통신사는 필수 입력 항목입니다."),
  },
  commFee: {
    validation: string().required("통신요금은 필수 입력 항목입니다."),
  },
  openCompany: {
    validation: string().required("개통사는 필수 입력 항목입니다."),
  },
  openCompanyPhone: {
    validation: string()
      .required("개통사 연락처는 필수 입력 항목입니다.")
      .matches(
        REGEX.tel,
        "유효한 개통사 연락처를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
};

/** 충전소 계약 yup */
export const YUP_CHARGER_CONTRACT: FieldSchemaMap = {
  place: { validation: string().required("계약 장소를 입력해주세요.") },
  contractorName: {
    validation: string().required("계약자 이름을 입력해주세요."),
  },
  code: { validation: string().required("계약여부를 입력해주세요.") },
  isMeRoaming: {
    validation: string()
      .required("환경부 연동 여부를 입력해주세요.")
      .matches(
        REGEX.yn,
        "환경부 연동 여부는 연동 또는 미연동 중 하나여야 합니다."
      ),
  },
  meStationId: { validation: string().optional() },
  contractStartDt: {
    validation: string().required("계약 시작일를 입력해주세요."),
  },
  contractEndDt: {
    validation: string().required("계약 종료일를 입력해주세요."),
  },
  addressSido: {
    validation: string().required("행정동 주소 (시도)를 입력해주세요."),
  },
  addressSigugun: {
    validation: string().required("행정동 주소(구군)를 입력해주세요."),
  },
  addressDongmyun: {
    validation: string().required("행정동 주소(동읍)를 입력해주세요."),
  },
  managerName: { validation: string().required("장소 담당자를 입력해주세요.") },
  managerPhone: {
    validation: string()
      .required("담당자 전화번호를 입력해주세요.")
      .matches(
        REGEX.tel,
        "유효한 담당자 전화번호를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  salesCompany: { validation: string().required("영업업체를 입력해주세요.") },
  salesManagerName: {
    validation: string().required("영업담당자를 입력해주세요."),
  },
  salesManagerPhone: {
    validation: string()
      .required("영업담당자 전화번호를 입력해주세요.")
      .matches(
        REGEX.tel,
        "유효한 영업담당자 전화번호를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  contractInfo: { validation: string().required("영업내용을 입력해주세요.") },
  contractDt: { validation: string().required("계약일를 입력해주세요.") },
  subsidyAgency: {
    validation: string().required("보조금 기관을 입력해주세요."),
  },
  subsidyYyyy: { validation: string().required("보조금 연도를 입력해주세요.") },
  subsidyAmount: {
    validation: number().required("보조금 금액을 입력해주세요."),
  },
  subsidyRevDt: {
    validation: string().required("보조금 수령일를 입력해주세요."),
  },
  costSales: { validation: number().required("영업비용을 입력해주세요.") },
  costConstruct: { validation: number().required("공사비를 입력해주세요.") },
  esafetyMng: { validation: string().optional() },
};
/** 충전소 계약 수정 yup */
export const YUP_CHARGER_CONTRACT_EXTRA: FieldSchemaMap = {
  id: { validation: number().required("필수 값이 누락되었습니다.") },
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

/** 충전기 제조사 yup */
export const YUP_CHARGER_MANUFACTURE: FieldSchemaMap = {
  companyId: {
    validation: string().required("제조사 ID는 필수 입력 항목입니다."),
  },
  code: {
    validation: string().required("제조사 코드는 필수 입력 항목입니다."),
  },
  name: {
    validation: string().required("제조사명은 필수 입력 항목입니다."),
  },
  managerName: {
    validation: string().required("담당자명은 필수 입력 항목입니다."),
  },
  managerPhone: {
    validation: string()
      .required("담당자 연락처는 필수 입력 항목입니다.")
      .matches(
        REGEX.tel,
        "유효한 담당자 연락처를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  managerExtPhone: {
    validation: string()
      .required("담당자 내선번호는 필수 입력 항목입니다.")
      .matches(
        REGEX.extTel,
        "유효한 담당자 내선번호를 입력해주세요.\n(00-000-0000 또는 000-0000-0000 또는 000-000-0000)"
      ),
  },
  phone: {
    validation: string()
      .required("사업자 대표번호는 필수 입력 항목입니다.")
      .matches(
        REGEX.extTel,
        "유효한 사업자 대표번호를 입력해주세요.\n(00-000-0000 또는 000-0000-0000 또는 000-000-0000)"
      ),
  },
  zipCode: {
    validation: string().required("우편번호는 필수 입력 항목입니다."),
  },
  address: {
    validation: string().required("사업자 주소는 필수 입력 항목입니다."),
  },
  addressDetail: {
    validation: string().required("사업자 상세주소는 필수 입력 항목입니다."),
  },
};

/** 충전기 펌웨어 yup */
export const YUP_CHARGER_MANUFACTURE_FIRMWARE: FieldSchemaMap = {
  modelName: {
    validation: string().required("모델명은 필수 입력 항목입니다."),
  },
  imageId: {
    validation: number().required("모델 이미지는 필수 입력 항목입니다."),
  },
  version: {
    validation: string().required("펌웨어 버전은 필수 입력 항목입니다."),
  },
  firmwareId: {
    validation: number().required("펌웨어 파일은 필수 입력 항목입니다."),
  },
  size: {
    validation: number().required("펌웨어 크기(Byte)는 필수 입력 항목입니다."),
  },
};

/** 충전기 제조사 수정 yup */
export const YUP_CHARGER_MANUFACTURE_EXTRA: FieldSchemaMap = {
  id: {
    validation: string().required("제조사 키를 찾을 수 없습니다."),
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
        REGEX.tel,
        "유효한 사업자 전화번호를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
      ),
  },
  mainPhoneNumber: {
    validation: string()
      .required("사업자 대표 번호는 필수 입력 항목입니다.")
      .matches(
        REGEX.tel,
        "유효한 사업자 대표 전화번호를 입력해주세요.\n(000-0000-0000 또는 000-000-0000)"
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
      .matches(REGEX.yn, "계약 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  isActive: {
    validation: string()
      .required("활용 여부는 필수 입력 항목입니다.")
      .matches(REGEX.yn, "활용 여부는 Y 또는 N 중 하나여야 합니다."),
  },
  contractedDate: {
    validation: string().required(),
  },
};
