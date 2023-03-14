import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IDetailBottomButtonProps {
  listHandler?: () => void;
  editHandler?: () => void;
  editDisabled?: boolean;
  containerClassName?: string;
}

const DetailBottomButton = (props: IDetailBottomButtonProps) => {
  const {
    listHandler,
    editDisabled = true,
    editHandler,
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
        disabled={editDisabled}
        label={"수정"}
        color={"turu"}
        onClick={editHandler}
      />
    </div>
  );
};

export default DetailBottomButton;
