/** 시/도 요청 params */
export interface IRequestSigugun {
  sido: string;
}

/** 동/읍 요청 params */
export interface IRequestDongmyun {
  sido: string;
  sigugun: string;
}

/** common - region api response */
export interface IRegionResponse {
  elements:string[];
}