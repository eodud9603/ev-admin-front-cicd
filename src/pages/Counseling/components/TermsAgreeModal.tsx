import React, { ChangeEvent, useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import styled from "styled-components";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

const TitleSection = () => {
  return (
    <span className={"fw-semibold text-center"}>
      본인 인증이 완료되었습니다.
      <br />
      아래 회원의 휴대전화로&nbsp;
      <span className={"text-turu"}>임시 비밀번호를 전송</span>
      하시겠습니까?
    </span>
  );
};
export const TermsAgreeModal = (props: IModalBaseProps) => {
  const { isOpen, onClose, size } = props;
  const [text, setText] = useState("");
  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <ModalBase
      title={"비밀번호 초기화"}
      size={size}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <div className={"d-flex justify-content-center mt-3"}>
          <TitleSection />
        </div>

        <div className={"d-flex my-4 justify-content-center"}>
          <ButtonBase
            label={"취소"}
            outline={true}
            className={"w-xs mx-2"}
            onClick={onClose}
          />
          <ButtonBase
            label={"완료"}
            color={"turu"}
            disabled={true}
            className={"w-xs"}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const BasicInfoSection = styled.section``;
const AuthSection = styled.section``;
