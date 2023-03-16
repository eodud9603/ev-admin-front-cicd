import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IAddButtonProps {
  disabled: boolean;

  listHandler?: () => void;
  addHandler?: () => void;
}

const AddButton = (props: IAddButtonProps) => {
  const {
    /* required */
    disabled,
    /* optional */
    listHandler,
    addHandler,
  } = props;

  return (
    <div className={"my-5 d-flex align-items-center justify-content-center "}>
      <ButtonBase
        className={"width-110 me-2"}
        outline
        label={"목록"}
        onClick={listHandler}
      />
      <ButtonBase
        className={"width-110 ms-2"}
        label={"등록"}
        disabled={disabled}
        color={!disabled ? "turu" : "secondary"}
        onClick={addHandler}
      />
    </div>
  );
};

export default AddButton;
