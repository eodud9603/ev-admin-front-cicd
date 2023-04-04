/** 계정 확인 */
export interface IRequestAuthenticate {
  adminId: string;
  password: string;
}

export interface IAuthenticateResponse {
  adminSeq: number;
}
