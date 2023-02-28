import React, { useState } from "react";
import { Link } from "react-router-dom";

//Import Icons
import Icon from "@ailibs/feather-react-ts";

// Redux Store
import { showRightSidebarAction } from "../../helpers/store/actions";

//import component
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";

//import images
import logoSvg from "../../assets/images/logo-sm.svg";

//redux
import { useSelector, useDispatch } from "react-redux";

const Header = (props: any) => {
  const dispatch = useDispatch();
  const { layoutMode, showRightSidebar } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
    showRightSidebar: state.Layout.ShowRightSidebar,
  }));

  const [search, setsearch] = useState<boolean>(false);
  const [socialDrp, setsocialDrp] = useState<boolean>(false);
  const [isClick, setClick] = useState<boolean>(true);

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    const body = document.body;
    setClick(!isClick);
    if (isClick === true) {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
      props.toggleMenuCallback();
    } else {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
      props.toggleMenuCallback();
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSvg} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoSvg} alt="" height="24" />{" "}
                  <span className="logo-txt">Minia</span>
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSvg} alt="" height="24" />
                </span>
                <span className="logo-lg">
                  <img src={logoSvg} alt="" height="24" />{" "}
                  <span className="logo-txt">Minia</span>
                </span>
              </Link>
            </div>

            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>

            {/*<form className="app-search d-none d-lg-block">*/}
            {/*  <div className="position-relative">*/}
            {/*    <input*/}
            {/*      type="text"*/}
            {/*      className="form-control"*/}
            {/*      placeholder="Search..."*/}
            {/*    />*/}
            {/*    <button className="btn btn-primary" type="button">*/}
            {/*      <i className="bx bx-search-alt align-middle"></i>*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</form>*/}
          </div>
          <div className="d-flex">
            {/* light / dark mode */}
            <LightDark
              layoutMode={layoutMode}
              onChangeLayoutMode={props.onChangeLayoutMode}
            />

            {/*<NotificationDropdown />*/}
            <div
              onClick={() => {
                dispatch(showRightSidebarAction(!showRightSidebar));
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle"
              >
                <Icon name="settings" className="icon-lg" />
              </button>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
