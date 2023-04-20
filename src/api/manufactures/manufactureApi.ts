import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestManufactureList,
  IManufactureListResponse,
  IRequestManufactureDetail,
  IManufactureDetailResponse,
  IRequestManufactureModelList,
  IManufactureModelListResponse,
} from "src/api/manufactures/manufactureApi.interface";

const { manufactureUrl } = API_URL;

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
  return api.get<undefined>(
    `${manufactureUrl}/delete/${params.id}`
  );
};

/** 제조사 모델 목록 조회 api */
export const getManufactureModelList = (params: IRequestManufactureModelList) => {
  return api.get<IManufactureModelListResponse>(
    `${manufactureUrl}/model/list/${params.id}`
  );
};
