import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IDetailBottomButtonProps {
  listHandler?: () => void;
  editHandler?: () => void;
  saveHandler?: () => void;
  editDisabled?: boolean;
  containerClassName?: string;
}

const DetailBottomButton = (props: IDetailBottomButtonProps) => {
  const {
    listHandler,
    editHandler,
    saveHandler,
    editDisabled = false,
    containerClassName = "",
  } = props;

  return (
    <div
      className={`mb-4 d-flex align-items-center justify-content-center ${containerClassName}`}
    >
      <ButtonBase
        className={"width-110 me-2"}
        outline
        label={"목록"}
        onClick={listHandler}
      />
      <ButtonBase
        className={"width-110 ms-2"}
        label={!editDisabled ? "저장" : "수정"}
        color={"turu"}
        onClick={!editDisabled ? saveHandler : editHandler}
      />
    </div>
  );
};

export default DetailBottomButton;
