
/**  목록 표시 개수 */
export const COUNT_FILTER_LIST = [
    { label: "10개씩 보기", value: "1" },
    { label: "20개씩 보기", value: "2" },
    { label: "30개씩 보기", value: "3" },
    { label: "50개씩 보기", value: "4" },
    { label: "100개씩 보기", value: "5" },
  ];

/** 운영사 필터 */
export const OPERATOR_FILTER_LIST  = [
  {
    label: "전체",
    value: ""
  },
  {
    label: "HEV",
    value: "1"
  },
  {
    label: "JEV",
    value: "2"
  },
];

/** 철거여부 필터 */
export const DEMOLITION_FILTER_LIST  = [
  {
    label: "전체",
    value: ""
  },
  {
    label: "철거",
    value: "1"
  },
  {
    label: "철거예정",
    value: "2"
  },
];

/** 삭제여부 필터 */
export const DELETE_FILTER_LIST = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "Y",
    value: "Y",
  },
  {
    label: "N",
    value: "N",
  },
];

/** 업로드 대상 필터 */
export const UPLOAD_FILTER_LIST = [
  {
    label: "전체",
    value: ""
  },
  {
    label: "IOS",
    value: "1"
  },
  {
    label: "AOS",
    value: "2"
  },
  {
    label: "WEB",
    value: "3"
  },
];

/** 답변상태 필터 */
export const ANSWER_STATUS_FILTER_LIST = [
  {
    label: "전체",
    value: ""
  },
  {
    label: "완료",
    value: "1"
  },
  {
    label: "대기",
    value: "2"
  },
];

/** 권한등급 목록 */
export const ROLE_LIST  = [
  {
    label: "최고관리자",
    value: "1",
  },
  {
    label: "일반관리자",
    value: "2",
  },
  {
    label: "상담사",
    value: "3",
  },
  {
    label: "제조사",
    value: "4",
  },
  {
    label: "관계사",
    value: "5",
  },
];

/** 권한등급 목록 데이터(서버에서 받는 목록) */
export const ROLE_TABLE_LIST = [
  /* default */
  {
    name: "전체",
    detailList: [],
    read: true,
    write: true,
  },
  /* server sample response */
  {
    name: "충전소 및 충전기 관리",
    detailList: [
      {
        name: "충전소 관리",
        read: true,
        write: true,
      },
      {
        name: "충전기 관리",
        read: true,
        write: true,
      },
      {
        name: "충전기 고장/파손 관리",
        read: true,
        write: true,
      },
      {
        name: "충전기 제조사 관리",
        read: true,
        write: true,
      },
      {
        name: "서비스 운영사(사업자) 관리",
        read: true,
        write: true,
      },
    ],
    read: true,
    write: true,
  },
  {
    name: "회원 및 카드 관리",
    detailList: [
      {
        name: "회원 관리",
        read: true,
        write: true,
      },
      {
        name: "탈퇴회원 관리",
        read: true,
        write: true,
      },
      {
        name: "소항목 목록 노출",
        read: true,
        write: true,
      },
    ],
    read: true,
    write: true,
  },
  {
    name: "운영 관리",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "상담 관리",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "운영자 관리",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "이용 통계",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "로그 관리",
    detailList: [],
    read: true,
    write: true,
  },
];

/** 카테고리 목록 임시 데이터 */
export const CATEGORY_LIST = [
  {
    categoryId: 1,
    text: "가입 승인",
  },
  {
    categoryId: 2,
    text: "결제 카드",
  },
  {
    categoryId: 3,
    text: "충전기 계약",
  },
  {
    categoryId: 4,
    text: "충전기 사용",
  },
  {
    categoryId: 5,
    text: "기타",
  },
];

export const POPUP_CATEGORY_LIST = [
  {
    categoryId: 1,
    text: "이벤트 팝업",
  },
  {
    categoryId: 2,
    text: "공지사항 팝업",
  },
];

/** 운영관리 > 문자발신 - 카테고리 목록 */
export const MESSAGE_CATEGORY_LIST = [
  {
    label: "회원",
    value: "1",
  },
];

/** 운영관리 > 문자발신 - 제목 목록 */
export const MESSAGE_TITLE_LIST = [
  {
    label: "회원 방침 변경",
    value: "1",
  },
];