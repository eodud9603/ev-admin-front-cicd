import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import styled from "styled-components";

interface IDetailSaveModalProps {
  isOpen: boolean;
  onClose: () => void;

  cancelHandler?: () => void;
  title?: string;
  body?: React.ReactElement | React.ReactElement[];
  contents?: string;
}

const DetailCancelModal = (props: IDetailSaveModalProps) => {
  const {
    isOpen,
    onClose,
    cancelHandler,
    title = "",
    body,
    contents = "",
  } = props;

  const cancel = () => {
    !!cancelHandler && cancelHandler();
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
        <PWrapper className={"p-4 font-size-16 border-bottom border-2"}>
          {contents}
        </PWrapper>
      )}
      <div className={"d-flex justify-content-end"}>
        <ButtonBase
          className={"mb-3 me-3 align-end"}
          label={"아니요"}
          color={"secondary"}
          onClick={onClose}
        />
        <ButtonBase
          className={"mb-3 me-3 align-end"}
          label={"네, 취소하겠습니다."}
          color={"turu"}
          onClick={cancel}
        />
      </div>
    </ModalBase>
  );
};

export default DetailCancelModal;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
