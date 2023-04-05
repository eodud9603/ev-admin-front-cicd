import axios, { isAxiosError, Method } from "axios";
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

/* api(axios) 요청시, 요청헤더에 token 추가 */
axiosInstance.interceptors.request.use((config) => {
  const authInfo = JSON.parse(sessionStorage.getItem('auth-storage') ?? "");
  const accessToken: string = authInfo?.state?.accessToken ?? "";
  if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

const rest = (method: Method) => {
  return async <T,>(
    url: string,
    { header = {}, params = {}, body = {} } = {}
  ) => {
    try {
      const response = await axiosInstance(url, {
        method: method,
        params,
        data: body,
        headers: {
          ...header,
        },
      });

      const { data } = response;

      return data as IApiResponse<T>;
    } catch (err) {
      /** axios error 여부 */
      const axiosError = isAxiosError(err);
      if(axiosError) {
        return {
          response: {
            status: "",
            data: {
              code: err.code,
              data: null,
              errors: [],
              message: err.message
            }
          }
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
