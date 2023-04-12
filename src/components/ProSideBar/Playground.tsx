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

const initMenus = {
  chargingMonitoring: false,
  charger: false,
  member: false,
  operate: false,
  operator: false,
  counseling: false,
  payment: false,
  sales: false,
  settlement: false,
  usageHistory: false,
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground = (props: any) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [allOpen, setAllOpen] = useState<{
    [key: string]: boolean;
  }>(initMenus);

  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");

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

  const eachOpenMenuItem = (menuId: string, isOpen: boolean) => {
    setAllOpen((prev) => ({ ...prev, [menuId]: isOpen }));
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
            style={{
              marginBottom: "48px",
              marginTop: "16px",
            }}
            setAllOpen={setAllOpen}
          />
          <div style={{ flex: 1, marginBottom: "100px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Example"
                icon={<BarChart />}
                component={<Link to={"/example"} />}
              />
              <SubMenu
                label="충전 모니터링"
                icon={<BarChart />}
                open={allOpen.chargingMonitoring}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("chargingMonitoring", isOpen)
                }
              >
                <MenuItem
                  component={<Link to={"/chargeMonitoring/chargerControl"} />}
                >
                  충전기 관제
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="충전소 및 충전기 관리"
                icon={<BarChart />}
                open={allOpen.charger}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("charger", isOpen)
                }
              >
                <MenuItem component={<Link to={"/charger/ChargerStation"} />}>
                  충전소 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/charger"} />}>
                  충전기 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/contract"} />}>
                  충전소 계약 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/trouble"} />}>
                  충전기 고장/파손 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/manufacturer"} />}>
                  충전기 제조사 관리
                </MenuItem>
                <MenuItem component={<Link to={"/charger/operator"} />}>
                  서비스 운영사 관리
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="운영 관리"
                icon={<Global />}
                open={allOpen.operate}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("operate", isOpen)
                }
              >
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

                <MenuItem component={<Link to={"/operate/corporateQnA"} />}>
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
                <MenuItem component={<Link to={"/operate/installCharger"} />}>
                  충전기 설치 신청 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/evModel"} />}>
                  전기차 모델 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/policy"} />}>
                  정책 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/talk"} />}>
                  카카오 알림톡 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/sms"} />}>
                  제어 문자 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/variable"} />}>
                  변수 관리
                </MenuItem>
                <MenuItem component={<Link to={"/operate/code"} />}>
                  코드 관리
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="회원 및 카드 관리"
                icon={<Global />}
                open={allOpen.member}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("member", isOpen)
                }
              >
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
              <SubMenu
                label="상담 관리"
                icon={<InkBottle />}
                open={allOpen.counseling}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("counseling", isOpen)
                }
              >
                <MenuItem component={<Link to={"/counseling/customer"} />}>
                  고객 상담
                </MenuItem>
                <MenuItem component={<Link to={"/counseling/history"} />}>
                  상담 내역
                </MenuItem>
                <MenuItem component={<Link to={"/counseling/management"} />}>
                  상담/보상유형 관리
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="운영자 관리"
                icon={<Global />}
                open={allOpen.operator}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("operator", isOpen)
                }
              >
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
              <SubMenu
                label="매출 모니터링"
                icon={<Global />}
                open={allOpen.sales}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("sales", isOpen)
                }
              >
                <MenuItem
                  component={<Link to={"/sales/individualSettlement"} />}
                >
                  개별 정산 내역
                </MenuItem>
                <MenuItem component={<Link to={"/sales/totalSettlement"} />}>
                  합산 정산 내역
                </MenuItem>
                <MenuItem component={<Link to={"/sales/billingHistory"} />}>
                  요금 청구 내역
                </MenuItem>
                <MenuItem component={<Link to={"/sales/total"} />}>
                  총 매출
                </MenuItem>
                <MenuItem component={<Link to={"/sales/region"} />}>
                  지역 매출
                </MenuItem>
                <MenuItem component={<Link to={"/sales/station"} />}>
                  충전소 매출
                </MenuItem>
                <MenuItem component={<Link to={"/sales/charger"} />}>
                  충전기 매출
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="정산 관리"
                icon={<Global />}
                open={allOpen.settlement}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("settlement", isOpen)
                }
              >
                <MenuItem component={<Link to={"/settlement/regular"} />}>
                  정회원 결제 관리
                </MenuItem>
                <MenuItem component={<Link to={"/settlement/non"} />}>
                  비회원 결제 관리
                </MenuItem>
                <MenuItem component={<Link to={"/settlement/roaming"} />}>
                  로밍회원 결제 관리
                </MenuItem>
                <MenuItem component={<Link to={"/settlement/group"} />}>
                  그룹 정산 관리
                </MenuItem>
                <MenuItem component={<Link to={"/settlement/membership"} />}>
                  멤버쉽 카드 결제 관리
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="요금 관리"
                icon={<Global />}
                open={allOpen.payment}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("payment", isOpen)
                }
              >
                <MenuItem component={<Link to={"/payment/charging"} />}>
                  충전 요금제 관리
                </MenuItem>
                <MenuItem component={<Link to={"/payment/kepco"} />}>
                  한전 요금제 관리
                </MenuItem>
                <MenuItem component={<Link to={"/payment/roaming"} />}>
                  로밍 요금제 관리
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="이용 내역 관리"
                icon={<Global />}
                open={allOpen.usageHistory}
                onOpenChange={(isOpen: boolean) =>
                  eachOpenMenuItem("usageHistory", isOpen)
                }
              >
                <MenuItem component={<Link to={"/usageHistory/claim"} />}>
                  청구 현황
                </MenuItem>
                <MenuItem component={<Link to={"/usageHistory/roaming"} />}>
                  로밍 청구 현황
                </MenuItem>
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
