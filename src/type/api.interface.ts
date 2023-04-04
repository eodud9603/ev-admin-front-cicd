/* 성공 response 타입 */
export interface IApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export interface IAxiosResponse<T> {
  status: number;
  data: IApiResponse<T>;
}

/* 에러 response 타입 */
export interface IApiErrorResponse {
  code: string;
  data: null;
  errors: { field: string; value: string; reason: string }[];
  message: string;
}

export interface IAxiosErrorResponse {
  response: {
    status: number;
    data: IApiErrorResponse;
  };
}
