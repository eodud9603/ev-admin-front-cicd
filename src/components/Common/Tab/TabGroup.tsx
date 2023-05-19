import React from "react";
import styled from "styled-components";
import TabBase from "src/components/Common/Tab/TabBase";
import { useTabStore } from "src/store/tabStore";
import { useNavigate } from "react-router-dom";

const TabGroup = (props: any) => {
  const {
    /* required */
    // list = [],
    // selectedIndex = "0",
    /* optional */
    /* rest */
    ...rest
  } = props;

  const nav = useNavigate();
  const tabState = useTabStore();

  const handleTabClick = (path: string) => {
    tabState.setActive(path);
    nav(path);
  };

  const handleTabClose = (path: string) => {
    const index = tabState.data.findIndex((e) => path.includes(e.rootPath));
    tabState.removeData(path);
    if (tabState.data.length <= 1) {
      nav("/");
    } else {
      nav(tabState.data[index > 0 ? index - 1 : index + 1].path);
      console.log(tabState.data[index > 0 ? index - 1 : index + 1].path);
    }
  };

  return (
    <TabSection className={"mt-4 mx-5 d-flex flex-nowrap"}>
      {tabState.data.length > 0 &&
        tabState.data.map((state, index) => (
          <TabBase
            key={state.path}
            index={index}
            text={state.label}
            selected={state.path === tabState.active}
            onClick={() => handleTabClick(state.path)}
            onClose={() => handleTabClose(state.path)}
            {...rest}
          />
        ))}
    </TabSection>
  );
};

export default TabGroup;

const TabSection = styled.section``;
