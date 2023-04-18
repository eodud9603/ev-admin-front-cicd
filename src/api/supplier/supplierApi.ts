import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IRequestSupplierDelete,
  IRequestSupplierDetail,
  IRequestSupplierList,
  IRequestSupplierListResponse,
  ISupplierDetailResponse,
} from "src/api/supplier/supplierApi.interface";

const { supplier } = API_URL;

/** 운영서비스 업체 관리 목록 조회 api */
export const getSupplierList = (params: IRequestSupplierList) => {
  return api.get<IRequestSupplierListResponse>(`${supplier}/list`, {
    params,
  });
};

/** 운영서비스 업체 관리 상세 조회 api */
export const getSupplierDetail = (params: IRequestSupplierDetail) => {
  return api.get<ISupplierDetailResponse>(
    `${supplier}/detail/${params.id}`
  );
};

/** 운영서비스 업체 관리 삭제 api */
export const deleteSupplier = (params: IRequestSupplierDelete) => {
  return api.get<undefined>(
    `${supplier}/delete/${params.id}`
  );
};
