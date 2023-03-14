import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";

interface IDetailSaveModalProps {
  isOpen: boolean;
  onClose: () => void;

  confirm?: () => void;
  title?: string;
  body?: React.ReactElement | React.ReactElement[];
  contents?: string;
}

const DetailTextModal = (props: IDetailSaveModalProps) => {
  const { isOpen, onClose, confirm, title = "", body, contents = "" } = props;

  const confirmHandler = () => {
    !!confirm && confirm();
    onClose();
  };

  return (
    <ModalBase
      isCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      {body ?? (
        <p className={"p-4 font-size-16 border-bottom border-2"}>{contents}</p>
      )}
      <div className={"d-flex justify-content-end"}>
        <ButtonBase
          className={"width-80 mb-3 me-3 align-end"}
          label={"확인"}
          color={"turu"}
          onClick={confirmHandler}
        />
      </div>
    </ModalBase>
  );
};

export default DetailTextModal;
