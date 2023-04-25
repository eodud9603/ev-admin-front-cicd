import { postFileUpload } from "src/api/common/commonApi";

interface IFileUploadParams {
  id?: number;
  name?: string;
  url?: string;
}

/** file upload */
export const fileUpload = async (
  uploadFile: Partial<{
    url?: string | undefined;
    file: FileList | null;
  }>
) => {
  const { url, file } = uploadFile;

  const fileParams: IFileUploadParams = {
    id: undefined,
    name: undefined,
    url: undefined,
  };
  if (url?.includes("blob") && !!file) {
    /* 파일 업로드 요청 */
    const { code: fileCode, data: fileData } = await postFileUpload(file);
    /** 성공 */
    const success = fileCode === "SUCCESS" && !!fileData;
    if (success) {
      const [uploadedFile] = fileData.elements;

      if(uploadedFile) {
        fileParams.id = uploadedFile.id;
        fileParams.name = uploadedFile.fileName;
        fileParams.url = uploadedFile.url;
      }

      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }

  return fileParams;
};
