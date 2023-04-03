import React, { ChangeEvent, useState } from "react";
import Logo from "src/assets/images/sidebar_logo.png";
import { Container, Col, Label } from "reactstrap";
import { LoginForm } from "src/pages/Login/components/LoginForm";

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ id: "", pw: "", code: "" });

  const onChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    console.log(e.currentTarget);
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
              <LoginForm
                id={loginInfo.id}
                pw={loginInfo.pw}
                onChangeLoginInfo={onChangeLoginInfo}
              />
              {/*<AuthCodeForm*/}
              {/*  code={loginInfo.code}*/}
              {/*  onChangeLoginInfo={onChangeLoginInfo}*/}
              {/*/>*/}
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
        블
        <div className={"d-flex justify-content-center"}>
          Copyright HUMAX mobility corp. All rights reserved.
        </div>
      </div>
    </div>
  );
};
