import styled from "styled-components";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProSidebar } from "react-pro-sidebar";
import Logo from "src/assets/images/sidebar_logo.png";
import TLogo from "src/assets/icon/turu.svg";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface ISidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  setAllOpen: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

const StyledSidebarHeader = styled.div`
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader: React.FC<ISidebarHeaderProps> = ({
  children,
  setAllOpen,
  ...rest
}) => {
  const { collapsed } = useProSidebar();
  const [isVisible, setIsVisible] = useState(true);
  const onClickAllOpen = () => {
    setAllOpen((prev) => ({
      ...Object.keys(prev).reduce((acc: { [key: string]: boolean }, val) => {
        acc[val] = true;
        return acc;
      }, {}),
    }));
  };
  const onClickAllClose = () => {
    setAllOpen((prev) => ({
      ...Object.keys(prev).reduce((acc: { [key: string]: boolean }, val) => {
        acc[val] = false;
        return acc;
      }, {}),
    }));
  };

  useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    if (collapsed) {
      setIsVisible(false);
    } else {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 150);
    }

    if (timer) {
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  return (
    <StyledSidebarHeader {...rest}>
      <div onClick={() => console.log(collapsed)}>
        <div className={"d-flex justify-content-center align-items-center"}>
          <img
            src={collapsed ? TLogo : Logo}
            style={{ width: collapsed ? 23 : 180 }}
            alt={"logo"}
            className={"my-5"}
          />
        </div>
        {isVisible && (
          <ButtonWrapper collapsed={collapsed}>
            <div className={`d-flex justify-content-between`}>
              <ButtonBase
                outline={true}
                color={"dark"}
                label={"전체 보기"}
                onClick={onClickAllOpen}
                className={"form-control border-light"}
              />
              <div className={"mx-1"} />
              <ButtonBase
                label={"전체 닫기"}
                outline={true}
                color={"dark"}
                onClick={onClickAllClose}
                className={"form-control border-light"}
              />
            </div>
          </ButtonWrapper>
        )}
      </div>
    </StyledSidebarHeader>
  );
};

const ButtonWrapper = styled.div<{ collapsed: boolean }>`
  transition: all ease 1s;
  display: ${({ collapsed }) => (collapsed ? "none" : "block")};
`;
