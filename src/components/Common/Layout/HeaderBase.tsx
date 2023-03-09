import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changelayoutMode,
  changeSidebarTheme,
} from "src/helpers/store/layout/actions";

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
  const dispatch = useDispatch();
  const { layoutType } = useSelector((state: any) => ({
    layoutType: state.Layout.layoutMode,
  }));
  // const {changelayoutMode} = useSelector(state => )
  /* light/dark mode handler */
  const onChangeThemeHandler: React.MouseEventHandler<HTMLElement> = () => {
    setDarkMode((prev) => !prev);

    //TODO :: dark모드, 사이드바도
    dispatch(changelayoutMode(darkMode ? "dark" : "light", layoutType));
    if (darkMode) {
      dispatch(changeSidebarTheme("dark"));
    } else {
      dispatch(changeSidebarTheme("light"));
    }
  };

  return (
    <Header
      className={
        "d-sm-flex justify-content-end align-items-center p-3 border-bottom gap-3"
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
