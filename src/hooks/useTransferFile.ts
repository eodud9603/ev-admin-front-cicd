import { useCallback, useRef } from "react";
import { blobStringToFile, fileToBlobString } from "src/utils/file";

interface IUseTransferFileProps {
  fileData: {
    fileInfoData: {
      type: string;
      name: string;
    };
    blobStringData?: string;
  };
}

/** 업로드 파일 변환 커스텀 훅 */
const useTransferFile = (props: IUseTransferFileProps) => {
  const { fileData } = props;
  const fileDataRef = useRef(fileData);

  const onChangeFile = useCallback(() => {
    const data = fileDataRef.current;
    const { fileInfoData, blobStringData } = data;

    if (fileInfoData.type && fileInfoData.name && blobStringData) {
      const result = blobStringToFile(fileInfoData, blobStringData ?? "");

      return result;
    }

    return {};
  }, []);

  const onChangeFileData = useCallback((file: FileList) => {
    if (!file) {
      return;
    }
    const result = fileToBlobString(file[0]);

    return result;
  }, []);

  return { onChangeFile, onChangeFileData };
};

export default useTransferFile;
