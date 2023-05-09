/* eslint-disable camelcase */
import jwt_decode from "jwt-decode";

/** jwt 토큰 복호화 */
export const jwtDecode = (): Partial<{ adminSeq: number; name: string }> => {
  try {
    const auth = JSON.parse(sessionStorage.getItem("auth-storage") ?? "{}");
    const token: string = auth?.state?.accessToken ?? "";
    const user = jwt_decode(token);

    return user as { adminSeq: number; name: string };
  } catch (e) {
    return {};
  }
};
