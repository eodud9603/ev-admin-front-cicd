import React, { useEffect, useRef } from "react";

//import components
import SidebarContent from "./SidebarContent";
import { useSelector } from "react-redux";

const Sidebar = (props: any) => {
  const { leftSideBarType } = useSelector((state: any) => ({
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  return (
    <React.Fragment>
      <div className={"vertical-menu"}>
        {/*<div*/}
        {/*  className={`vertical-menu ${*/}
        {/*    leftSideBarType === "sm" ? "vertical-slideout" : "vertical-slidein"*/}
        {/*  }`}*/}
        {/*>*/}
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
