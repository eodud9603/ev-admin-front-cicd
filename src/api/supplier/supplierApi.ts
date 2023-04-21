import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestSupplierDelete,
  IRequestSupplierDetail,
  IRequestSupplierList,
  IRequestSupplierListActive,
  IRequestSupplierListResponse,
  IRequestSupplierModify,
  IRequestSupplierRegister,
  ISupplierDetailResponse,
} from "src/api/supplier/supplierApi.interface";

const { supplierUrl } = API_URL;

/** 운영서비스 업체 관리 목록 조회 api */
export const getSupplierList = (params: IRequestSupplierList) => {
  return api.get<IRequestSupplierListResponse>(`${supplierUrl}/list`, {
    params,
  });
};

/** 운영서비스 업체 관리 목록 > 활성화 여부 변경 api */
export const postSupplierModifyActive = (body: IRequestSupplierListActive) => {
  return api.post<undefined>(`${supplierUrl}/modify/active`, {
    body,
  });
};

/** 운영서비스 업체 관리 상세 조회 api */
export const getSupplierDetail = (params: IRequestSupplierDetail) => {
  return api.get<ISupplierDetailResponse>(
    `${supplierUrl}/detail/${params.id}`
  );
};

/** 운영서비스 업체 관리 수정 api */
export const postSupplierModify = (body: IRequestSupplierModify) => {
  return api.post<undefined>(
    `${supplierUrl}/modify`,{
      body
    }
  );
};

/** 운영서비스 업체 관리 삭제 api */
export const deleteSupplier = (params: IRequestSupplierDelete) => {
  return api.get<undefined>(
    `${supplierUrl}/delete/${params.id}`
  );
};

/** 운영서비스 업체 관리 등록 api */
export const postSupplierRegister = (body: IRequestSupplierRegister) => {
  return api.post<undefined>(
    `${supplierUrl}/register`,{
      body
    }
  );
};
