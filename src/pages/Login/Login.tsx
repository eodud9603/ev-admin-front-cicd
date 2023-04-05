import React, { useState } from "react";
import Logo from "src/assets/images/sidebar_logo.png";
import { Container, Col, Label } from "reactstrap";
import { LoginForm } from "src/pages/Login/components/LoginForm";
import { AuthCodeForm } from "./components/AuthCodeForm";
import useInputs from "src/hooks/useInputs";
import { object, string, number } from "yup";
import { postAuthCode, postAuthenticate } from "src/api/auth/authAPi";
import useAuthStore from "src/store/authStore";
import { useNavigate } from "react-router";

const loginValidation = object({
  id: string().required("Please Enter id"),
  pw: string().required("Please Enter pw"),
});

const authCodeValidation = object({
  adminSeq: number().min(0).required("Please Enter adminSeq"),
  code: string().min(6).max(6).required("Please Enter code"),
});

export const Login = () => {
  const [firstAuth, setFirstAuth] = useState(false);
  const [seq, setSeq] = useState(-1);

  const { id, pw, code, onChange } = useInputs({
    id: "",
    pw: "",
    code: "",
  });
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  /** 계정 확인 */
  const authHandler = async () => {
    const isValid = await loginValidation.isValid({ id, pw });
    if (!isValid) {
      return;
    }

    /* 인증번호 요청 */
    const { code, data } = await postAuthenticate({
      adminId: id,
      password: pw,
    });

    /** 성공 */
    const success = code === "SUCCESS" && !!data;
    if (success) {
      setSeq(data.adminSeq);
    }

    return success;
  };

  /** 로그인 */
  const loginHandler = async () => {
    const success = await authHandler();
    if (success) {
      setFirstAuth(true);
    }
  };

  /** 인증 코드 확인 */
  const authCodeHandler = async () => {
    const isValid = await authCodeValidation.isValid({ adminSeq: seq, code });
    if (!isValid) {
      return;
    }

    /* 코드 확인 요청 */
    const { code: resultCode, data } = await postAuthCode({
      adminSeq: seq,
      code,
    });

    /** 성공 */
    const success = resultCode === "SUCCESS" && !!data;
    if (success) {
      /* 토큰정보 저장 */
      setAuth(data);
      /** @TODO  */
      navigate("/main/dashboard", { replace: true });
    }
  };

  return (
    <div
      className={"vh-100 d-flex flex-column"}
      style={{ position: "relative" }}
    >
      <div
        style={{
          backgroundColor: "#FB7C1E",
          display: "flex",
          flex: 2,
          opacity: 0.8,
        }}
      ></div>
      <div
        style={{ backgroundColor: "#F6F7F9", display: "flex", flex: 1 }}
      ></div>
      <div
        className={"min-vw-100"}
        style={{
          position: "absolute",
          zIndex: 1,
          top: "20%",
        }}
      >
        <Container
          className="d-flex justify-content-center
        align-items-center h-100 mb-4"
        >
          <Col md={6} className="bg-white p-4 rounded p-5">
            <div className={"p-4"}>
              <div className={"mb-4"}>
                <img src={Logo} style={{ width: 200 }} className={"mb-4"} />
                <h2 style={{ color: "#FB7C1E" }}>관리자 로그인</h2>
              </div>
              {!firstAuth ? (
                <LoginForm
                  id={id}
                  pw={pw}
                  onChangeLoginInfo={onChange}
                  loginHandler={loginHandler}
                />
              ) : (
                <AuthCodeForm
                  code={code}
                  onChangeLoginInfo={onChange}
                  resendHandler={authHandler}
                  authCodeHandler={authCodeHandler}
                />
              )}
            </div>
            <Label
              className={"m-0 d-flex justify-content-center align-items-center"}
            >
              <span className={"text-center text-secondary"}>
                해당 사이트는 허가된 사람만 접속할 수 있습니다.
                <br />
                어드민 접속에 문제가 있는 경우 관리자에게 문의해주세요.
              </span>
            </Label>
          </Col>
        </Container>
        <div className={"d-flex justify-content-center"}>
          Copyright HUMAX mobility corp. All rights reserved.
        </div>
      </div>
    </div>
  );
};
