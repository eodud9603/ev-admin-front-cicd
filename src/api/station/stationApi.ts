import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestStationContractDetail,
  IRequestStationContractList,
  IRequestStationContractRegister,
  IRequestStationDetail,
  IRequestStationList,
  IRequestStationRegister,
  IStationContractListResponse,
  IStationDetailResponse,
  IStationListResponse,
  IRequestStationContractModify,
  IStationContractDetailResponse,
} from "src/api/station/stationApi.interface";

const { stationUrl } = API_URL;

/* 충전소 관리 */

/** 충전소 목록 조회 api */
export const getStationList = (params: IRequestStationList) => {
  return api.get<IStationListResponse>(`${stationUrl}/list`, {
    params,
  });
};

/** 충전소 상세 api */
export const getStationDetail = (params: IRequestStationDetail) => {
  const { id } = params;

  return api.get<IStationDetailResponse>(`${stationUrl}/detail/${id}`);
};

/** 충전소 등록 api */
export const postStationRegistration = (body: IRequestStationRegister) => {
  return api.post<undefined>(`${stationUrl}/register`, {
    body,
  });
};

/** 충전소 수정 api */
export const postStationModify = (body: IRequestStationRegister) => {
  return api.post<undefined>(`${stationUrl}/modify`, {
    body,
  });
};

/* 계약 관리 */

/** 충전소 계약 목록 조회 api */
export const getStationContractList = (params: IRequestStationContractList) => {
  return api.get<IStationContractListResponse>(`${stationUrl}/contract/list`, {
    params,
  });
};

/** 충전소 계약 상세 조회 api */
export const getStationContractDetail = (
  params: IRequestStationContractDetail
) => {
  return api.get<IStationContractDetailResponse>(
    `${stationUrl}/contract/detail/${params.contractId}`
  );
};

/** 충전소 계약 수정 api */
export const postStationContractModify = (
  body: IRequestStationContractModify
) => {
  return api.post<undefined>(`${stationUrl}/contract/modify`, {
    body,
  });
};

/** 충전소 계약 등록 api */
export const postStationContractRegister = (
  body: IRequestStationContractRegister
) => {
  return api.post<undefined>(`${stationUrl}/contract/register`, {
    body,
  });
};
