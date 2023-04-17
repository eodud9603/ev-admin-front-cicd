import { API_URL } from "src/constants/url";
import api from "src/utils/api";
import { IFileResponse, IRequestFile } from "src/api/common/commonApi.interface";

const { commonUrl } = API_URL;

/** 파일 업로드 api */
export const postFileUpload = (body: IRequestFile) => {
  return api.post<IFileResponse>(`${commonUrl}/files/upload`, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body,
  });
};