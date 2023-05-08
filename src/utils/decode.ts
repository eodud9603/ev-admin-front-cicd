/* eslint-disable camelcase */
import jwt_decode from "jwt-decode";

/** jwt 토큰 복호화 */
export const jwtDecode = () => {
  try {
    const auth = JSON.parse(sessionStorage.getItem("auth-storage") ?? "{}");
    const token: string = auth?.state?.accessToken ?? "";
    const user = jwt_decode(token);

    return user;
  } catch (e) {
    return {};
  }
};
