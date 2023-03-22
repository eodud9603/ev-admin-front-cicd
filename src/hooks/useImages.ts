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

  /** 이미지 단일 삭제 */
  const remove = useCallback(
    (index: number) => {
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
    remove,
    reset,
  };
};

export default useImages;
