import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import styled from "styled-components";

interface IOperateTextModalProps {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  body?: React.ReactElement | React.ReactElement[];
  contents?: string;

  buttons?: {
    label: string;

    onClick?: () => void;
    className?: string;
    color?:
      | "secondary"
      | "turu"
      | "dark"
      | "info"
      | "success"
      | "white"
      | "danger";
  }[];
}

const OperateTextModal = (props: IOperateTextModalProps) => {
  const {
    isOpen,
    onClose,
    title = "",
    body,
    contents = "",
    buttons = [
      {
        label: "확인",
        color: "turu",
        onClick: onClose,
      },
    ],
  } = props;

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
      <div className={"pb-3 pe-3 gap-2 d-flex justify-content-end"}>
        {buttons.map(({ onClick, ...rest }, index) => (
          <ButtonBase key={index} onClick={onClick ?? onClose} {...rest} />
        ))}
      </div>
    </ModalBase>
  );
};

export default OperateTextModal;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
