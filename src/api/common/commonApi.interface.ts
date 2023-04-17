
/* 파일 업로드 */
/** @see http://218.38.12.198:45081/docs/index.html#_%ED%8C%8C%EC%9D%BC_%EC%97%85%EB%A1%9C%EB%93%9C */
export type IRequestFile = FileList

export interface IFileItem {
  id: number;
  url: string;
  fileName: string;
}

export interface IFileResponse {
  elements: IFileItem[]
}
