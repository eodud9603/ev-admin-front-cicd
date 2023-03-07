import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import Logo from "src/assets/images/sidebar_logo.png";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface ISidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  setAllOpen: Dispatch<SetStateAction<boolean | undefined>>;
  onChangeLayoutMode: (mode: string) => void;
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
  onChangeLayoutMode,
  ...rest
}) => {
  const { collapsed } = useProSidebar();
  const onClickAllOpen = () => {
    setAllOpen(true);
  };
  const onClickAllClose = () => {
    setAllOpen(undefined);
  };

  return (
    <StyledSidebarHeader {...rest}>
      <div
        onClick={() => {
          // onChangeLayoutMode(
          //   layoutMode === layoutTheme["DARKMODE"]
          //     ? layoutTheme["LIGHTMODE"]
          //     : layoutTheme["DARKMODE"]
          // );
          // document.body.classList.add("vertical-slidein");
          console.log(collapsed);
        }}
      >
        <img src={Logo} style={{ width: 200, marginBottom: 20 }} alt={"logo"} />
        {!collapsed && (
          <div className={"d-flex justify-content-between"}>
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
        )}
      </div>
    </StyledSidebarHeader>
  );
};
