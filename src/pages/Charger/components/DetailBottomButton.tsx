import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IDetailBottomButtonProps {
  rightButtonTitle: string;

  listHandler?: () => void;
  rightButtonHandler?: () => void;
  containerClassName?: string;
}

const DetailBottomButton = (props: IDetailBottomButtonProps) => {
  const {
    rightButtonTitle = "",

    listHandler,
    rightButtonHandler,
    containerClassName = "",
  } = props;

  return (
    <div
      className={
        "mb-4 d-flex align-items-center justify-content-center " +
        `${containerClassName}`
      }
    >
      <ButtonBase
        className={"width-110 me-2"}
        outline
        label={"목록"}
        onClick={listHandler}
      />
      <ButtonBase
        className={"width-110 ms-2"}
        label={rightButtonTitle}
        color={"turu"}
        onClick={rightButtonHandler}
      />
    </div>
  );
};

export default DetailBottomButton;
