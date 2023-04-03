import React, { ChangeEvent, Dispatch, Fragment } from "react";
import { Label } from "reactstrap";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface ILoginForm {
  id: string;
  pw: string;
  loginType?: string;
  onChangeLoginInfo: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const LoginForm = ({
  id,
  pw,
  loginType,
  onChangeLoginInfo,
}: ILoginForm) => {
  return (
    <Fragment>
      <Label
        for="email"
        className={"fw-semibold font-size-16 d-flex align-items-center"}
      >
        아이디&nbsp;&nbsp;
        <span className={"font-size-12 text-secondary text-opacity-50"}>
          (이메일이 아닌 일반 ID형식, 계정생성 시 부가정보로 이메일 정보 수집)
        </span>
      </Label>
      <TextInputBase
        placeholder={"아이디를 입력해주세요"}
        name={"id"}
        value={id}
        bsSize={"lg"}
        onChange={onChangeLoginInfo}
      />
      <div className={"my-3"} />
      <Label for="password" className={"fw-semibold font-size-16"}>
        비밀번호
      </Label>
      <TextInputBase
        placeholder={"비밀번호를 입력해주세요"}
        name={"pw"}
        value={pw}
        bsSize={"lg"}
        onChange={onChangeLoginInfo}
      />
      <ButtonBase
        color={"turu"}
        label={"로그인"}
        size={"lg"}
        className={"form-control mt-4"}
      />
    </Fragment>
  );
};
