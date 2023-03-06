import React from "react";
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
import { Badge } from "./components/Badge";
import {
  changelayoutMode,
  changeSidebarTheme,
  changeSidebarType,
} from "src/helpers/store/layout/actions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/VerticalLayout/Footer";
import { Link } from "react-router-dom";

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

  const dispatch = useDispatch();

  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");

  // handle on RTL change event
  const handleRTLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRTL(e.target.checked);
  };

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
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
        style={
          {
            // bottom: 0,
            // float: "none",
            // height: "100vh",
            // left: 0,
            // position: "fixed",
            // top: 0,
            // zIndex: 1038,
          }
        }
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
          />
          <div style={{ flex: 1, marginBottom: "100px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="충전 모니터링"
                icon={<BarChart />}
                suffix={
                  <Badge variant="danger" shape="circle">
                    6
                  </Badge>
                }
              >
                <MenuItem component={<Link to={"/main/dashboard"} />}>
                  충전 모니터링
                </MenuItem>
                <MenuItem component={<Link to={"/main/1"}>충전 모니터링</Link>}>
                  Line charts
                </MenuItem>
                <MenuItem> Bar charts</MenuItem>
              </SubMenu>
              <SubMenu label="Maps" icon={<Global />}>
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
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
              <MenuItem
                icon={<Calendar />}
                suffix={<Badge variant="success">New</Badge>}
              >
                Calendar
              </MenuItem>
              <MenuItem icon={<Book />}>Documentation</MenuItem>
              <MenuItem disabled icon={<Service />}>
                Examples
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
      <header id="page-topbar">ㅁㄴㅇ</header>
      {props.children}
      <Footer />
    </div>
  );
};
