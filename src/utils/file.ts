export const blobStringToFile = (
  fileInfoString: {
    type: string;
    name: string;
  },
  fileDataString: string
) => {
  const fileInfoData = fileInfoString;
  // 문자열을 Blob 객체로 변환
  const base64String = fileDataString;
  const mimeType = fileInfoData.type;
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });

  // Blob 객체를 File 객체로 변환
  const newFile: File = new File([blob], fileInfoData.name, {
    type: fileInfoData.type,
  });
  const dataTranster = new DataTransfer();

  Array.from([newFile]).forEach((file) => {
    dataTranster.items.add(newFile);
  });

  return {
    url: URL.createObjectURL(Array.from(dataTranster.files)[0]),
    file: dataTranster.files ?? null,
  };
};

export const fileToBlobString = (
  file: File
): Promise<{
  fileInfoData: {
    type: string;
    name: string;
  };
  blobStringData: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const fileString = reader.result as string;

      if (fileString) {
        return resolve({
          fileInfoData: {
            type: file.type,
            name: file.name,
          },
          blobStringData: fileString.split(",")[1],
        });
      }
    };
    reader.onerror = () => {
      reject("에러");
    };
  });
};
