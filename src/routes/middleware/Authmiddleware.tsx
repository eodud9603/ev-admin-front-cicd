import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "src/store/authStore";

const Authmiddleware = (props: any) => {
  const { accessToken } = useAuthStore();

  /** @TODO 토큰이 없을 경우, 로그인페이지로 리다이렉션(로직 수정 필요 시, 수정) */
  if (!accessToken) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
