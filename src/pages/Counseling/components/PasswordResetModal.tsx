import React, { ChangeEvent, useEffect, useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import styled from "styled-components";
import { Label } from "reactstrap";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

const TitleSection = ({ auth }: { auth: boolean }) => {
  return (
    <>
      {auth ? (
        <span className={"fw-semibold text-center"}>
          본인 인증이 완료되었습니다.
          <br />
          아래 회원의 휴대전화로&nbsp;
          <span className={"text-turu"}>임시 비밀번호를 전송</span>
          하시겠습니까?
        </span>
      ) : (
        <span className={"fw-semibold text-center"}>
          회원의 휴대전화 번호로 본인인증 문자가 발송되었습니다.
          <br />
          <span className={"text-turu"}>
            인증번호를 입력해 본인 인증을 완료
          </span>
          해주세요.
        </span>
      )}
    </>
  );
};
export const PasswordResetModal = (props: IModalBaseProps) => {
  const { isOpen, onClose, size } = props;
  const [text, setText] = useState("");
  const [auth, setAuth] = useState(false);
  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleAuthValidation = () => {
    setAuth(true);
  };

  useEffect(() => {
    setAuth(false);
  }, [isOpen]);

  return (
    <ModalBase
      title={"비밀번호 초기화"}
      size={size}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <div className={"d-flex justify-content-center mt-3"}>
          <TitleSection auth={auth} />
        </div>
        <BasicInfoSection>
          <Label className={"fw-bold font-size-16 my-3"}>회원 정보</Label>
          <DetailRow>
            <DetailLabelCol sm={2}>이름</DetailLabelCol>
            <DetailContentCol>홍길동</DetailContentCol>

            <DetailLabelCol sm={2}>회원 ID</DetailLabelCol>
            <DetailContentCol>홍길동</DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>휴대전화</DetailLabelCol>
            <DetailContentCol>010-0000-0000</DetailContentCol>
          </DetailRow>
        </BasicInfoSection>
        {!auth && (
          <AuthSection>
            <Label className={"fw-bold font-size-16 my-3"}>본인 인증</Label>
            <DetailTextInputRow
              rows={[
                {
                  title: "인증번호 입력",
                  required: true,
                  placeholder: "인증번호를 입력해주세요.",
                  titleWidthRatio: 4,
                  onChange: onChangeTextInput,
                },
              ]}
            />
          </AuthSection>
        )}

        <div className={"d-flex my-4 justify-content-center"}>
          <ButtonBase
            label={"취소"}
            outline={true}
            className={"w-xs mx-2"}
            onClick={onClose}
          />
          <ButtonBase
            label={auth ? "전송" : "인증 확인"}
            color={"turu"}
            className={"w-xs"}
            onClick={handleAuthValidation}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const BasicInfoSection = styled.section``;
const AuthSection = styled.section``;
