import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import styled from "styled-components";

interface IDetailSaveModalProps {
  isOpen: boolean;
  onClose: () => void;

  confirmHandler?: () => void;
  title?: string;
  body?: React.ReactElement | React.ReactElement[];
  contents?: string;
}

const DetailCompleteModal = (props: IDetailSaveModalProps) => {
  const {
    isOpen,
    onClose,
    confirmHandler,
    title = "",
    body,
    contents = "",
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
      title={title}
    >
      {body ?? (
        <PWrapper className={"p-4 font-size-16 border-bottom border-2"}>
          {contents}
        </PWrapper>
      )}
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

export default DetailCompleteModal;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
