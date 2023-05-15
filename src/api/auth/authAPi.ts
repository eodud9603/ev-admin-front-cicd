import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IAuthCodeResponse,
  IAuthReissueResponse,
  IAuthenticateResponse,
  IRequestAuthCode,
  IRequestAuthReissue,
  IRequestAuthenticate,
} from "src/api/auth/authApi.interface";

const { authUrl } = API_URL;

/** 계정확인 api */
export const postAuthenticate = (body: IRequestAuthenticate) => {
  return api.post<IAuthenticateResponse>(authUrl, {
    body,
  });
};

/** 코드확인 api */
export const postAuthCode = (body: IRequestAuthCode) => {
  return api.post<IAuthCodeResponse>(`${authUrl}/code`, {
    body,
  });
};

/** 토근 갱신 api */
export const postAuthReissue = (body: IRequestAuthReissue) => {
  return api.post<IAuthReissueResponse>(`${authUrl}/reissue`, {
    body,
  });
};

/** 403 error api (403 test api) */
export const postAuthInvalid = () => {
  return api.post<IAuthReissueResponse>(`${authUrl}/invalid`);
};
