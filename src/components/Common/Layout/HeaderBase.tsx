import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

interface HeaderBaseProps {
  children?: string | JSX.Element | JSX.Element[];

  headerStyle?: React.CSSProperties;
}

const HeaderBase = (props: HeaderBaseProps) => {
  const {
    /* optional */
    children,
    headerStyle,
  } = props;

  return (
    <Header
      className={
        "d-sm-flex justify-content-end align-items-center p-3 border-bottom gap-3"
      }
      headerStyle={headerStyle}
    >
      {children}
    </Header>
  );
};

export default HeaderBase;

const Header = styled.header<Pick<HeaderBaseProps, "headerStyle">>`
  ${({ headerStyle }) => ({ ...headerStyle })};
`;
