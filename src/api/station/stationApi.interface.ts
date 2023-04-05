/* 충전소 목록 조회 */
/** @see http://218.38.12.31:45081/docs/index.html#_%EB%AA%A9%EB%A1%9D_%EC%A1%B0%ED%9A%8C */
export interface IRequestStationList {
  sort: "StationName" | "StationId" | "CrateAt";
  sortDirection: "ASC" | "DESC";
  size: number;
  page: number // 0부터 시작

  sido?: string;
  gugun?: string;
  dong?: string
  stationNm?: string
  stationId?: string;
  operation?: string;
  isOpen?: "Y" | "N";
}

export interface IStationListItem {
  region: string;
  stationNm: string;
  stationId: string;
  address: string;
  isOpen: string;
  operation: string;
  fastCharger: number;
  fullCharger: number;
  createAt: string;
}

export interface IStationListResponse {
  elements: IStationListItem[];
  totalElements: number;
  totalPages: number;
}

/** */