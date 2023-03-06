import React from "react";
import styled from "styled-components";

interface IHeaderBaseProps {
  children?: string | JSX.Element | JSX.Element[];

  headerStyle?: React.CSSProperties;
}

const HeaderBase = (props: IHeaderBaseProps) => {
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

const Header = styled.header<Pick<IHeaderBaseProps, "headerStyle">>`
  ${({ headerStyle }) => ({ ...headerStyle })};
`;
