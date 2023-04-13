import axios, {
  CancelTokenSource,
  isAxiosError,
  Method,
} from "axios";
import { API_URL } from "src/constants/url";
import { IApiResponse, IAxiosErrorResponse } from "src/type/api.interface";

const { baseUrl } = API_URL;

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 3000;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const pendingRequests: {
  [key in string]?: CancelTokenSource;
} = {};

axiosInstance.interceptors.request.use((config) => {
  /* 토큰관련 로직 */
  const authInfo = JSON.parse(sessionStorage.getItem("auth-storage") ?? "");
  const accessToken: string = authInfo?.state?.accessToken ?? "";
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
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
    { headers = {}, params = {}, body = {} } = {}
  ) => {
    try {
      const response = await axiosInstance(url, {
        method,
        params,
        data: body,
        headers,
      });

      const { data } = response;

      return data as IApiResponse<T>;
    } catch (err) {
      /** axios error 여부 */
      const axiosError = isAxiosError(err);
      if (axiosError) {
        return {
          code: err.code,
          data: null,
          message: err.message,
        };
      }

      const { response } = err as IAxiosErrorResponse;

      /*  403: token이 인증되지 않을경우, refreshToken으로 업데이트 후에도 없으면, 로그인 화면으로 네비게이팅 */
      if (response.status === 403) {
        /** @TODO refresh 로직 추가 */
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
