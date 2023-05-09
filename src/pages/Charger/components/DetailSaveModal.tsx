import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import styled from "styled-components";

interface IDetailSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClosed?: () => void;

  cancelHandler?: () => void | Promise<void>;
  saveHandler?: () => void | Promise<void>;
  title?: string;
  body?: React.ReactElement | React.ReactElement[];
  contents?: string;
}

const DetailSaveModal = (props: IDetailSaveModalProps) => {
  const {
    isOpen,
    onClose,
    onClosed,
    cancelHandler,
    saveHandler,
    title = "",
    body,
    contents = "",
  } = props;

  const onCancel = () => {
    !!cancelHandler && void cancelHandler();
    onClose();
  };

  const onSave = () => {
    !!saveHandler && void saveHandler();
  };

  return (
    <ModalBase
      isCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
      onClosed={onClosed}
      title={title}
    >
      {body ?? (
        <PWrapper className={"p-4 font-size-16 border-bottom border-2"}>
          {contents}
        </PWrapper>
      )}
      <div className={"d-flex justify-content-end"}>
        <ButtonBase
          className={"mb-3 me-3 align-end"}
          label={"아니요"}
          color={"secondary"}
          onClick={onCancel}
        />
        <ButtonBase
          className={"mb-3 me-3 align-end"}
          label={"네, 저장하겠습니다."}
          color={"turu"}
          onClick={onSave}
        />
      </div>
    </ModalBase>
  );
};

export default DetailSaveModal;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
