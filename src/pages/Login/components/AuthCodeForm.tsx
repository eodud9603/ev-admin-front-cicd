import React, { ChangeEvent, Fragment } from "react";
import { Label } from "reactstrap";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import styled from "styled-components";

interface IAuthCodeForm {
  code: string;
  loginType?: string;
  onChangeLoginInfo: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const AuthCodeForm = ({
  code,
  loginType,
  onChangeLoginInfo,
}: IAuthCodeForm) => {
  return (
    <Fragment>
      <div className={"my-3"} />
      <Label for="password" className={"fw-semibold font-size-16"}>
        인증번호
      </Label>
      <AuthInputWrapper className={"d-flex"}>
        <TextInputBase
          placeholder={"인증번호를 입력해주세요"}
          name={"code"}
          value={code}
          bsSize={"lg"}
          onChange={onChangeLoginInfo}
        />
        <CountWrapper className={"text-turu"}>05:00</CountWrapper>
      </AuthInputWrapper>
      <u
        role={"button"}
        className={"text-center d-flex justify-content-end text-turu mt-3"}
      >
        인증번호 재전송
      </u>
      <div className={"font-size-12 mt-3"}>
        <div>* 5분 이내로 인증번호 6자리를 입력해주세요.</div>
        <div>
          {
            "* 인증번호가 전송되지 않을 경우 '인증번호 재전송' 버튼을 눌러주세요."
          }
        </div>
      </div>
      <ButtonBase
        color={"turu"}
        label={"확인"}
        size={"lg"}
        className={"form-control mt-4"}
      />
    </Fragment>
  );
};

const AuthInputWrapper = styled.div`
  position: relative;
`;
const CountWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 25%;
`;
