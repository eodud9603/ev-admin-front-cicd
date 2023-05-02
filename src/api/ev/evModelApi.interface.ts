
import { TChargerTypeKeys } from "src/constants/status";
import { TChargerRationKeys } from "src/constants/status";

/* 전기차 모델 목록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%A1%B0%ED%9A%8C_4 */
export interface IRequestEvModelList {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC" | "DESC";
  size: number;
  page: number; // 0부터 시작
  sort: "ManufactureName" | "ModelName" | "Year" | "Capacity";

  searchType?: "ManagerName" | "ManufactureName" | "ModelName";
  searchKeyword?: string;
  regStartDate?: string;
  regEndDate?: string;
  chargerClass?: TChargerRationKeys;
  chargerType?: TChargerTypeKeys;
}

export interface IEvModelItem {
  id: number;
  chargerType: TChargerTypeKeys;
  chargerClass: TChargerRationKeys;
  manufactureName: string;
  modelName: string;
  year: string;
  capacity: number;
  managerId: string;
  managerName: string;
  createdDate: string;
}

export interface IEvModelListResponse {
  elements: IEvModelItem[];
  totalElements: number;
  totalPages: number;
}

/* 전기차 모델 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%88%98%EC%A0%95_6 */
export interface IRequestEvModelModify {
  id: number;
  chargerType: TChargerTypeKeys;
  chargerClass: TChargerRationKeys;
  manufactureName?: string;
  manufactureId?: number;
  modelName: string;
  year: string;
  capacity: number;
  memo: string;
  fileId?: number;
  fileUrl?: string;
  fileName?: string;
  createdDate?: string;
}

/* 전기차 모델 등록 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EB%93%B1%EB%A1%9D_6 */
export interface IRequestEvModelRegister extends Omit<IRequestEvModelModify, "id"> {
  id?: number; 
};

/* 전기차 모델 상세 조회 */
/** @see http://218.38.12.198:45081/docs/index.html#_%EC%83%81%EC%84%B8_5 */
export interface IRequestEvModelDetail {
  id: number;
}

export type IEvModelDetailResponse = Required<IRequestEvModelModify>;

