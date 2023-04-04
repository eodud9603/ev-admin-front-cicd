import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import {
  IAuthenticateResponse,
  IRequestAuthenticate,
} from "./authApi.interface";

const { authUrl } = API_URL;

/** 계정확인 api */
export const postAuthenticate = (body: IRequestAuthenticate) => {
  return api.post<IAuthenticateResponse>(authUrl, {
    body,
  });
};
