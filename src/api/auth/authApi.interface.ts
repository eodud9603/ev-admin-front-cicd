/** 계정 확인 */
export interface IRequestAuthenticate {
  adminId: string;
  password: string;
}

export interface IAuthenticateResponse {
  adminSeq: number;
}

/** 코드 확인 */
export interface IRequestAuthCode {
  adminSeq: number
  code: string
}

export interface IAuthCodeResponse {
  accessToken: string
  refreshToken: string
  expiredTime: string
}