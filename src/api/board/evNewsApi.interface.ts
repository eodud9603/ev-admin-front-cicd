import { YNType } from "src/api/api.interface";
import { TUploadTypeKeys } from "src/constants/status";

export interface IRequestEvNewsRegister {
  boardId: number;
  title: string;
  content: string;
  writer: string;
  isExpose: YNType;
  files: Array<number>;
  banners: Array<number>;
  uploadType: TUploadTypeKeys;
}
