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

    if (data) {
      const file = blobStringToFile(fileInfoData, blobStringData ?? "");

      return file;
    }

    return {};
  }, []);

  const onChangeFileData = useCallback((file: FileList) => {
    if (!file) {
      return;
    }
    const test = fileToBlobString(file[0]);

    return test;
  }, []);

  return { onChangeFile, onChangeFileData };
};

export default useTransferFile;
