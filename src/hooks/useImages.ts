import React, { useCallback, useState } from "react";

interface IImageItemProps {
  file: File;
  src: string;
}

/**
 * * 이미지 리스트 custom hook
 */
const useImages = (list: IImageItemProps[]) => {
  const [images, setImages] = useState<IImageItemProps[]>(list);

  /** 이미지 업로드 */
  const upload: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.target.files) {
        return;
      }

      const uploadImages = Array.from(e.target.files);
      const imageList: IImageItemProps[] = [];
      for (const image of uploadImages) {
        const src = URL.createObjectURL(image);
        imageList.push({ file: image, src });
      }
      setImages((prev) => [...prev, ...imageList]);
      /* 파일 업로드 -> 제거 -> 같은 파일 재업로드 시, onChange동작이 없으므로, value값을 초기화하여 onChange event가 동작하도록 해당 코드 추가 */
      e.target.value = "";
    },
    []
  );

  /** drag and drop block (새창으로 파일 열리는 것 방지) */
  const dropBlock :React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.nativeEvent.preventDefault();
  }, []);

  /** drag and drop하여 이미지 파일 추가 */
  const drop:React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.nativeEvent.preventDefault();

    const files = e?.nativeEvent.dataTransfer?.files;
    if(!files) {
      return;
    }

    const uploadImages = Array.from(files);
    const imageList: IImageItemProps[] = [];
    for (const image of uploadImages) {
      /** 이미지 타입 여부 체크 */
      const isImageType = image.type.includes("image");
      if(!isImageType) {
        continue;
      }

      const src = URL.createObjectURL(image);
      imageList.push({ file: image, src });
    }
    setImages((prev) => [...prev, ...imageList]);
  }, []);

  /** 이미지 단일 삭제 */
  const remove = useCallback(
    (index: number) => {
      const isNumber = !isNaN(index);
      if(!isNumber) {
        return;
      }

      const imageList = [...images];
      /* 생성한 기존 URL을 폐기 (메모리 누수 방지) */
      const [deleteImage] = imageList.splice(index, 1);
      URL.revokeObjectURL(deleteImage.src);

      setImages(imageList);
    },
    [images]
  );

  /** 이미지 데이터 초기화 */
  const reset = useCallback(() => {
    /* 생성한 기존 URL을 폐기 (메모리 누수 방지) */
    for(const image of images) {
      URL.revokeObjectURL(image.src);
    }

    setImages(list);
  }, [images, list]);

  return {
    images,
    upload,
    dropBlock,
    drop,
    remove,
    reset,
  };
};

export default useImages;
