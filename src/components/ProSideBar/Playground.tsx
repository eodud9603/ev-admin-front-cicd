import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
  MenuItemStyles,
} from "react-pro-sidebar";
import { SidebarHeader } from "./components/SidebarHeader";
import { Diamond } from "./icons/Diamond";
import { BarChart } from "./icons/BarChart";
import { Global } from "./icons/Global";
import { InkBottle } from "./icons/InkBottle";
import { Book } from "./icons/Book";
import { Calendar } from "./icons/Calendar";
import { ShoppingCart } from "./icons/ShoppingCart";
import { Service } from "./icons/Service";
import { SidebarFooter } from "./components/SidebarFooter";
import {
  changelayoutMode,
  changeSidebarTheme,
  changeSidebarType,
} from "src/helpers/store/layout/actions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/Common/Footer/Footer";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground = (props: any) => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const [allOpen, setAllOpen] = useState<boolean | undefined>(undefined);

  const dispatch = useDispatch();

  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleCollapsed = () => {
    collapseSidebar();
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const { layoutType, leftSideBarType, layoutMode } = useSelector(
    (state: any) => ({
      layoutType: state.Layout.layoutType,
      layoutMode: state.Layout.layoutMode,
      leftSideBarType: state.Layout.leftSideBarType,
    })
  );

  const toggleMenuCallback = () => {
    if (leftSideBarType === "lg") {
      dispatch(changeSidebarType("sm"));
    } else if (leftSideBarType === "sm") {
      dispatch(changeSidebarType("lg"));
    }
  };

  const onChangeLayoutMode = (value: any) => {
    if (changelayoutMode) {
      dispatch(changelayoutMode(value, layoutType));
      if (value === "dark") {
        dispatch(changeSidebarTheme("dark"));
      } else {
        dispatch(changeSidebarTheme("light"));
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Sidebar
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <SidebarHeader
            onChangeLayoutMode={onChangeLayoutMode}
            style={{
              marginBottom: "24px",
              marginTop: "16px",
            }}
            setAllOpen={setAllOpen}
          />
          <div style={{ flex: 1, marginBottom: "100px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu label="충전 모니터링" icon={<BarChart />} open={allOpen}>
                <MenuItem component={<Link to={"/charger/ChargerStation"} />}>
                  충전소 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/charger"} />}>
                  충전기 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/contract"} />}>
                  충전소 계약 관리
                </MenuItem>
                <MenuItem
                  className={"font-size-18"}
                  component={<Link to={"/charger/trouble"} />}
                >
                  충전기 고장/파손 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/manufacturer"} />}>
                  충전기 제조사 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/operator"} />}>
                  서비스 운영사 관리
                </MenuItem>
              </SubMenu>
              <SubMenu label="운영 관리" icon={<Global />}>
                <MenuItem component={<Link to={"/operate/notice"} />}>
                  공지사항
                </MenuItem>
                <MenuItem component={<Link to={"/operate/qna"} />}>
                  Q&A
                </MenuItem>
                <MenuItem component={<Link to={"/operate/faq"} />}>
                  FAQ
                </MenuItem>
                <MenuItem component={<Link to={"/operate/corporateNotice"} />}>
                  법인 공지사항
                </MenuItem>

                <MenuItem component={<Link to={"/operate/corporateQna"} />}>
                  법인 문의사항
                </MenuItem>
                <MenuItem component={<Link to={"/operate/event"} />}>
                  이벤트
                </MenuItem>
                <MenuItem component={<Link to={"/operate/evNews"} />}>
                  EV 뉴스
                </MenuItem>
                <MenuItem component={<Link to={"/operate/popup"} />}>
                  팝업 관리
                </MenuItem>
                <MenuItem>충전기 고장 신고 관리</MenuItem>
                <MenuItem component={<Link to={"/operate/installCharger"} />}>
                  충전기 설치 신청 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/evModel"} />}>
                  전기차 모델 관리
                </MenuItem>
                <MenuItem>정책 관리</MenuItem>
                <MenuItem>카카오 알림톡 관리</MenuItem>
                <MenuItem>SMS 관리</MenuItem>
                <MenuItem>MMS 관리</MenuItem>
                <MenuItem>변수 관리</MenuItem>
                <MenuItem>코드 관리</MenuItem>
              </SubMenu>
              <SubMenu label="회원 및 카드 관리" icon={<Global />}>
                <MenuItem component={<Link to={"/member/normal"} />}>
                  회원 관리
                </MenuItem>
                <MenuItem component={<Link to={"/member/withdraw"} />}>
                  탈퇴회원 관리
                </MenuItem>
                <MenuItem component={<Link to={"/member/card/normal"} />}>
                  회원카드 관리
                </MenuItem>
                <MenuItem component={<Link to={"/member/card/roaming"} />}>
                  로밍카드 관리
                </MenuItem>
                <MenuItem component={<Link to={"/member/reject"} />}>
                  인증거절 내역
                </MenuItem>
                <MenuItem component={<Link to={"/member/group"} />}>
                  그룹 관리
                </MenuItem>
                <MenuItem component={<Link to={"/member/corporation"} />}>
                  법인 관리
                </MenuItem>
                <MenuItem component={<Link to={"/member/contract"} />}>
                  법인 계약 관리
                </MenuItem>
              </SubMenu>
              <SubMenu label="운영자 관리" icon={<Global />}>
                <MenuItem component={<Link to={"/operator/account"} />}>
                  계정 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operator/counselor"} />}>
                  상담사 계정 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operator/role"} />}>
                  권한 관리
                </MenuItem>
              </SubMenu>
              <SubMenu label="Theme" icon={<InkBottle />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
              <SubMenu label="Components" icon={<Diamond />}>
                <MenuItem> Grid</MenuItem>
                <MenuItem> Layout</MenuItem>
                <SubMenu label="Forms">
                  <MenuItem> Input</MenuItem>
                  <MenuItem> Select</MenuItem>
                  <SubMenu label="More">
                    <MenuItem> CheckBox</MenuItem>
                    <MenuItem> Radio</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label="E-commerce" icon={<ShoppingCart />}>
                <MenuItem> Product</MenuItem>
                <MenuItem> Orders</MenuItem>
                <MenuItem> Credit card</MenuItem>
              </SubMenu>
            </Menu>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<Calendar />}>Calendar</MenuItem>
              <MenuItem icon={<Book />}>Documentation</MenuItem>
              <MenuItem disabled icon={<Service />}>
                Examples
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
      <div style={{ position: "relative" }}>
        <CollapsedButton onClick={handleCollapsed}>
          <i
            className={`bx bx-caret-left font-size-18 mt-1 ${
              collapsed ? "rotate-caret" : ""
            }`}
          />
        </CollapsedButton>
      </div>
      {props.children}
      <Footer />
    </div>
  );
};

const CollapsedButton = styled.div`
  background-color: white;
  position: absolute;
  top: 20px;
  left: 0px;
  width: 20px;
  padding-block: 5px;
`;
