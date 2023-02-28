import styled from "@emotion/styled";
import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { Typography } from "./Typography";
import { useDispatch, useSelector } from "react-redux";
import { layoutTheme } from "src/constants/layout";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onChangeLayoutMode: (mode: string) => void;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  ${({ rtl }) =>
    rtl
      ? `
      margin-left: 10px;
      margin-right: 4px;
      `
      : `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  onChangeLayoutMode,
  ...rest
}) => {
  const { rtl, collapseSidebar, collapsed } = useProSidebar();
  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));
  return (
    <StyledSidebarHeader {...rest}>
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          // onChangeLayoutMode(
          //   layoutMode === layoutTheme["DARKMODE"]
          //     ? layoutTheme["LIGHTMODE"]
          //     : layoutTheme["DARKMODE"]
          // );
          // document.body.classList.add("vertical-slidein");
          console.log(collapsed);
          collapseSidebar();
        }}
      >
        <StyledLogo rtl={rtl}>T</StyledLogo>
        <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
          Turu CHARGER
        </Typography>
      </div>
    </StyledSidebarHeader>
  );
};
