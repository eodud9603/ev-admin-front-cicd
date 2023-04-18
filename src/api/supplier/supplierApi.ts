import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IRequestSupplierList, IRequestSupplierListResponse } from "src/api/supplier/supplierApi.interface";

const { supplier } = API_URL;

/** 운영서비스 업체 관리 목록 조회 api */
export const getSupplierList = (params: IRequestSupplierList) => {
  return api.get<IRequestSupplierListResponse>(`${supplier}/list`, {
    params,
  });
};