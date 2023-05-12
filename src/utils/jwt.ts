/* eslint-disable camelcase */
import jwt_decode from "jwt-decode";
import { IAuthProps } from "src/store/authStore";

interface IAuthReturnType {
  token: string;
  refreshToken: string;
  adminSeq: number;
  name: string;
}

/** auth storage 초기화 */
export const initAuthStorage = () => {
  sessionStorage.setItem("auth-storage", JSON.stringify({ state: {} }));
};

/** auth storage 업데이트 */
export const updateAuthStorage = (updateState: Partial<IAuthProps> = {}) => {
  const authStore = JSON.parse(sessionStorage.getItem("auth-storage") ?? "{}");

  const updateStore = {
    ...(authStore?.state ?? {}),
    ...updateState,
  };
  sessionStorage.setItem(
    "auth-storage",
    JSON.stringify({ state: updateStore })
  );
};

/** jwt 토큰 복호화 */
export const jwtDecode = (): Partial<IAuthReturnType> => {
  try {
    const auth =
      JSON.parse(sessionStorage.getItem("auth-storage") ?? "{}")?.state ?? {};
    const token: string = auth?.accessToken ?? "";
    const refreshToken: string = auth?.refreshToken ?? "";
    const user: Partial<Pick<IAuthReturnType, "adminSeq" | "name">> = token
      ? jwt_decode(token)
      : {};

    return { token, refreshToken, ...user } as IAuthReturnType;
  } catch (e) {
    return {};
  }
};