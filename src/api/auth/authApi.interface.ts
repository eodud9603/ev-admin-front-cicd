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

/** 코드 확인
 * @see http://218.38.12.198:45081/docs/index.html#_%EC%BD%94%EB%93%9C_%ED%99%95%EC%9D%B8_2
 */
export interface IRequestAuthReissue {
  token: string;
}

export interface IAuthReissueResponse {
  accessToken: string
}