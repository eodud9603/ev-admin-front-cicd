import { ROLE_TYPE, TRoleTypeKey } from "src/constants/status";
import { getAdminRoleList } from "src/api/admin/adminAPi";

export const [INIT_ROLE] = Object.keys(ROLE_TYPE);

export const operatorRoleListLoader = async () => {
  /* 검색  */
  const { code, data } = await getAdminRoleList({
    role: INIT_ROLE as TRoleTypeKey,
  });
  /** 검색 성공 */
  const success = code === "SUCCESS" && !!data;

  return { data: success ? data : {}, filterData: {} };
};
