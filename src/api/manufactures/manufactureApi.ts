import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestManufactureList,
  IManufactureListResponse,
  IRequestManufactureDetail,
  IManufactureDetailResponse,
  IRequestManufactureModelList,
  IManufactureModelListResponse,
  IRequestManufactureRegister,
  IRequestManufactureModify,
  IRequestManufactureDelete,
} from "src/api/manufactures/manufactureApi.interface";

const { manufactureUrl } = API_URL;

/* 제조사 */

/** 제조사 목록 조회 api */
export const getManufactureList = (params: IRequestManufactureList) => {
  return api.get<IManufactureListResponse>(`${manufactureUrl}/list`, {
    params,
  });
};

/** 제조사 상세 조회 api */
export const getManufactureDetail = (params: IRequestManufactureDetail) => {
  return api.get<IManufactureDetailResponse>(
    `${manufactureUrl}/detail/${params.id}`
  );
};

/** 제조사 삭제 조회 api */
export const deleteManufacture = (params: IRequestManufactureDetail) => {
  return api.get<undefined>(`${manufactureUrl}/delete/${params.id}`);
};

/** 제조사 등록 api */
export const postManufactureRegister = (body: IRequestManufactureRegister) => {
  return api.post<undefined>(`${manufactureUrl}/register`, { body });
};

/** 제조사 수정 api */
export const postManufactureModify = (body: IRequestManufactureModify) => {
  return api.post<undefined>(`${manufactureUrl}/modify`, { body });
};

/** 제조사 삭제 api */
export const getManufactureDelete = (params: IRequestManufactureDelete) => {
  return api.get<undefined>(`${manufactureUrl}/delete/${params.id}`);
};

/* 제조사 모델 */

/** 제조사 모델 목록 조회 api */
export const getManufactureModelList = (
  params: IRequestManufactureModelList
) => {
  return api.get<IManufactureModelListResponse>(
    `${manufactureUrl}/model/list/${params.id}`
  );
};
