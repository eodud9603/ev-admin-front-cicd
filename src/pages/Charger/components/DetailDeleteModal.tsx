import React from "react";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import styled from "styled-components";

interface IDetailDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClosed?: () => void;

  deleteHandler?: () => void | Promise<void>;
  title?: string;
  body?: React.ReactElement | React.ReactElement[];
  contents?: string;
}

const DetailDeleteModal = (props: IDetailDeleteModalProps) => {
  const {
    isOpen,
    onClose,
    onClosed,
    deleteHandler,
    title = "",
    body,
    contents = "",
  } = props;

  const onDelete = () => {
    !!deleteHandler && void deleteHandler();
    onClose();
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
          onClick={onClose}
        />
        <ButtonBase
          className={"mb-3 me-3 align-end"}
          label={"네, 삭제하겠습니다."}
          color={"turu"}
          onClick={onDelete}
        />
      </div>
    </ModalBase>
  );
};

export default DetailDeleteModal;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
