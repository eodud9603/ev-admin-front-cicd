import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import styled from "styled-components";

interface IDetailValidCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: string;

  onClosed?: () => void;
  confirmHandler?: () => void;
}

const DetailValidCheckModal = (props: IDetailValidCheckModalProps) => {
  const {
    isOpen,
    onClose,
    content,

    onClosed,
    confirmHandler,
  } = props;

  const confirm = () => {
    !!confirmHandler && confirmHandler();
    onClose();
  };

  return (
    <ModalBase
      isCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
      onClosed={onClosed}
      title={"필수 정보 미입력 안내"}
    >
      <PWrapper
        className={"p-4 font-size-16 border-bottom border-2 fw-semibold"}
      >
        {content || (
          <>
            <span className={"text-turu fw-bold"}>필수 정보(*)</span>를
            입력해주세요.
          </>
        )}
      </PWrapper>
      <div className={"d-flex justify-content-end"}>
        <ButtonBase
          className={"width-80 mb-3 me-3 align-end"}
          label={"확인"}
          color={"turu"}
          onClick={confirm}
        />
      </div>
    </ModalBase>
  );
};

export default DetailValidCheckModal;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
