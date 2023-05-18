import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { showErrorModal } from "src/utils/modal";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirm = () => {
      navigate(-1);
    };

    showErrorModal({
      className: "NotFound",
      title: "페이지를 찾을 수 없습니다.",
      content: `이전 페이지로 이동합니다.`,
      confirmHandler: confirm,
    });
  }, [navigate]);

  return <React.Fragment />;
};

export default NotFound;
