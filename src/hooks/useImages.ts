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
      imageList.splice(index, 1);

      setImages(imageList);
    },
    [images]
  );

  /** 이미지 데이터 초기화 */
  const reset = useCallback(() => setImages([]), []);

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
