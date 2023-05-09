import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  isAxiosError,
  Method,
} from "axios";
import { API_URL } from "src/constants/url";
import { IApiResponse, IAxiosErrorResponse } from "src/type/api.interface";
import { showPermissionErrorModal } from "src/utils/permission";

const { baseUrl } = API_URL;

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 3000;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

interface IAxiosRequestConfig extends Omit<AxiosRequestConfig, "headers"> {
  headers: {
    Authorization?: string;
  };
}

const pendingRequests: {
  [key in string]?: CancelTokenSource;
} = {};

axiosInstance.interceptors.request.use((config) => {
  /* 토큰관련 로직 */
  const authInfo = JSON.parse(sessionStorage.getItem("auth-storage") ?? "");
  const accessToken: string = authInfo?.state?.accessToken ?? "";
  if (accessToken) {
    (config as IAxiosRequestConfig).headers[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  /* pending api 관련 로직 */
  const { method = "", baseURL = "", url = "" } = config;
  const cancelKey = method + baseURL + url;

  const cancelHandler = pendingRequests[cancelKey]?.cancel;
  !!cancelHandler && cancelHandler("가장 최근 정보를 다시 불러오는 중입니다.");

  const source = axios.CancelToken.source();
  config.cancelToken = source.token;
  pendingRequests[cancelKey] = source;

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  /* pending api 관련 로직 */
  const { method = "", baseURL = "", url = "" } = response.config;
  const cancelKey = method + baseURL + url;

  if (pendingRequests[cancelKey]) {
    delete pendingRequests[cancelKey];
  }

  return response;
});

const rest = (method: Method) => {
  return async <T,>(
    url: string,
    {
      headers = {},
      params = {},
      body = {},
      responseType = undefined as "blob" | undefined,
    } = {}
  ) => {
    try {
      const response = await axiosInstance(url, {
        method,
        params,
        data: body,
        headers,
        responseType,
      });

      const { data } = response;

      return data as IApiResponse<T>;
    } catch (err) {
      /** axios error 여부 */
      const axiosError = isAxiosError(err);
      if (axiosError) {
        const [error] = err.response?.data?.errors ?? [];
        const message = error?.reason ?? err.message;

        return {
          code: err.code,
          data: null,
          message,
        };
      }

      const { response } = err as IAxiosErrorResponse;

      /*  401: token이 인증되지 않을경우, refreshToken으로 업데이트 후에도 없으면, 로그인 화면으로 네비게이팅 */
      if (response.status === 401) {
        /** @TODO refresh 로직 추가 */
      }

      /* 403: 계정 권한 오류 발생 (읽기/쓰기/수정 등) */
      if (response.status === 403) {
        showPermissionErrorModal();
      }

      const { data } = response;

      return data;
    }
  };
};

class Api {
  public get;
  public post;
  public put;
  public delete;

  constructor() {
    this.get = rest("GET");
    this.post = rest("POST");
    this.put = rest("PUT");
    this.delete = rest("DELETE");
  }
}

const api = new Api();

export default api;
