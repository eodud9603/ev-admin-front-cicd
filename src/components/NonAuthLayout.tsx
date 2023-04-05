import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuthStore from "src/store/authStore";

const NonAuthLayout = (props: any) => {
  const { accessToken } = useAuthStore();

  /** @Description 토큰이 있을 경우, 메인페이지로 리다이렉션(로직 수정 필요 시, 수정) */
  if (accessToken) {
    return <Navigate to={{ pathname: "/main/dashboard" }} />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default NonAuthLayout;
