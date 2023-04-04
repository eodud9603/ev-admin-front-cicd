import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "src/store/authStore";

const Authmiddleware = (props: any) => {
  const { accessToken } = useAuthStore();

  /** @TODO 현재는 임시 주석처리 (인증 코드번호를 서버에 번호 요청해야하므로) */
  // if (!accessToken) {
  //   return <Navigate to={{ pathname: "/login" }} />;
  // }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
