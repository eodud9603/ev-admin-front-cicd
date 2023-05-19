import { ROLE_TYPE, TRoleTypeKey } from "src/constants/status";
import { getAdminRoleList } from "src/api/admin/adminAPi";
import { loadTabData } from "src/utils/loadTabData";
import { IAdminRoleListResponse } from "src/api/admin/adminApi.interface";

interface IFilterProps {
  selectedRole?: TRoleTypeKey;
}

export const [INIT_ROLE] = Object.keys(ROLE_TYPE) as TRoleTypeKey[];

export const operatorRoleListLoader = async () => {
  const loadData = loadTabData<IAdminRoleListResponse | null>("/operator/role");

  /* 검색 */
  const { code, data } = await getAdminRoleList({
    role:
      (loadData?.filterData as unknown as IFilterProps)?.selectedRole ??
      INIT_ROLE,
  });
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return {
    data: success ? data : {},
    filterData: loadData?.filterData ?? {},
    editable: loadData?.editable ?? true,
  };
};
