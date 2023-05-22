import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  InternalAxiosRequestConfig,
  Method,
  isAxiosError,
} from "axios";
import { API_URL } from "src/constants/url";
import { IApiResponse, IAxiosErrorResponse } from "src/type/api.interface";
import { showErrorModal } from "src/utils/modal";
import { initAuthStorage, jwtDecode, updateAuthStorage } from "src/utils/jwt";
import { Mutex } from "async-mutex";
import { ErrorCodeEnum } from "src/constants/error";

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

/** api 요청가능 여부 */
const validApi = {
  status: true,
};
/** 요청 대기 api 목록 */
const pendingRequests: {
  [key in string]?: CancelTokenSource;
} = {};

axiosInstance.interceptors.request.use((config) => {
  /* 토큰관련 로직 */
  const { accessToken } = jwtDecode();
  if (accessToken) {
    (config as IAxiosRequestConfig).headers[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  /* pending api 관련 로직 */
  const cancelKey = createCancelKey(config);

  const cancelHandler = pendingRequests[cancelKey]?.cancel;
  !!cancelHandler && cancelHandler("가장 최근 정보를 다시 불러오는 중입니다.");

  const source = axios.CancelToken.source();
  config.cancelToken = source.token;
  pendingRequests[cancelKey] = source;

  /* 토큰 [미인증, 만료]에 따른 요청 api 처리 로직 */
  if (window.location.pathname.includes("/login")) {
    validApi.status = true;
  }
  if (!validApi.status) {
    /* 실제 요청 전에 api 요청이 취소되어 api 요청/응답이 없음 (무시됨) */
    pendingRequests[cancelKey]?.cancel(
      "인증 만료로 인해 데이터 요청이 취소되었습니다."
    );
    delete pendingRequests[cancelKey];
  }

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  /* pending api 관련 로직 */
  const cancelKey = createCancelKey(response.config);

  if (pendingRequests[cancelKey]) {
    delete pendingRequests[cancelKey];
  }

  return response;
});

/** mutex 객체 생성 */
const mutex = new Mutex();
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
    /** 잠금 해지 대기 */
    await mutex.waitForUnlock();

    const requestInfo = {
      url,
      info: {
        method,
        params,
        data: body,
        headers,
        responseType,
      },
    };

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
      const { response } = err as IAxiosErrorResponse;

      /** axios error 여부 */
      if (!response?.status && isAxiosError(err)) {
        const [error] = response?.data?.errors ?? [];
        const message = error?.reason ?? err.message;

        return {
          code: err.code,
          data: null,
          message,
        };
      }

      /**  토큰 미인증
       * @Description 추가 검증 작업 필요 (검증 완료 전 문제 발생 시, 해당 if block 주석처리)
       */
      if (response.status === 401) {
        resetAuth();
      } else if (response.status === 403) {
        /** 토큰 만료
         * @Description 추가 검증 작업 필요 (검증 완료 전 문제 발생 시, 해당 else if block 주석처리)
         */
        /** 잠금 여부 */
        if (!mutex.isLocked()) {
          if (response.data.code === ErrorCodeEnum.AUTH02) {
            /* 갱신 시도 */
            const result = await tryAuthReissue<T>({
              headers,
              requestInfo,
            });

            /* 갱신 성공 */
            if (result) {
              return result;
            }
          } else {
            /* 계정 권한 오류 발생 (읽기/쓰기/수정 등) */
            showErrorModal({
              className: "permission",
              title: "계정 권한 오류",
              content: "관리자에게 문의하여 기능 권한을 요청하세요.",
            });
          }
        } else {
          /** 잠금 해지 대기 */
          await mutex.waitForUnlock();
          const response = await axiosInstance(url, {
            method,
            params,
            data: body,
            headers,
            responseType,
          });

          const { data } = response;

          return data as IApiResponse<T>;
        }
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

/** api 취소 키 생성 */
const createCancelKey = (config: InternalAxiosRequestConfig<any>) => {
  const { method = "", baseURL = "", url = "" } = config;
  const cancelKey = method + baseURL + url;

  return cancelKey;
};

/** auth state 초기화 후, login page 이동 */
const resetAuth = () => {
  /* 토큰 [미인증, 만료]에 따른 api 요청 비활성화 */
  validApi.status = false;

  initAuthStorage();

  showErrorModal({
    className: "reissue",
    title: "계정 정보 만료 안내",
    content: "계정 정보가 만료되었습니다.\n다시 로그인을 해주세요.",
    confirmHandler: () => {
      window.location.href = "/login";
    },
  });
};

/** 토큰 재발급 함수 */
const tryAuthReissue = async <T,>({
  headers = {},
  requestInfo,
}: {
  headers: object;
  requestInfo: {
    url: string;
    info: {
      method: Method;
      params: object;
      data: object;
      headers: object;
      responseType?: "blob";
    };
  };
}) => {
  /** 잠금 */
  const release = await mutex.acquire();

  try {
    const { refreshToken } = jwtDecode();
    /* 토큰 재갱신 요청 */
    const reissueResponse = await axiosInstance("/authenticate/reissue", {
      method: "POST",
      data: {
        token: refreshToken,
      },
      headers,
    });

    const reissueData: any = reissueResponse;
    const success = reissueData?.data.code === "SUCCESS" && !!reissueData?.data;

    /** 재갱신 성공 */
    if (success) {
      const updateToken: string = reissueData.data.data.accessToken ?? "";
      updateAuthStorage({ accessToken: updateToken });

      /* 만료로 실패한 기존 api 재요청 */
      const response = await axiosInstance(requestInfo.url, {
        ...requestInfo.info,
        headers: {
          ...(requestInfo.info.headers ?? {}),
          Authorization: `Bearer ${updateToken}`,
        },
      });
      const { data } = response;

      return data as IApiResponse<T>;
    } else {
      /** 재갱신 실패 */
      resetAuth();
    }
  } catch (reissueError: any) {
    /* 토큰 재갱신 or 기존 요청 api에서 에러 발생 */
    const code: ErrorCodeEnum = reissueError?.response?.data?.code;
    if ([ErrorCodeEnum.AUTH01, ErrorCodeEnum.AUTH02].indexOf(code) > -1) {
      resetAuth();
    }
  } finally {
    /** 잠금 해지 */
    release();
  }
};
