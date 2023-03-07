import React, { useState } from "react";
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

  /* TODO: 임시 */
  const [darkMode, setDarkMode] = useState(false);
  /* light/dark mode handler */
  const onChangeThemeHandler: React.MouseEventHandler<HTMLElement> = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Header
      className={
        "d-sm-flex justify-content-end align-items-center p-3 border-bottom gap-3 bg-white"
      }
      headerStyle={headerStyle}
    >
      <IconButton
        className={`bx bx-${darkMode ? "moon" : "sun"} font-size-18`}
        onClick={onChangeThemeHandler}
      />
      {children}
    </Header>
  );
};

export default HeaderBase;

const Header = styled.header<Pick<IHeaderBaseProps, "headerStyle">>`
  ${({ headerStyle }) => ({ ...headerStyle })};
`;

const IconButton = styled.i`
  :hover {
    cursor: pointer;
  }
`;
