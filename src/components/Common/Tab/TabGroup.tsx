import React from "react";
import styled from "styled-components";
import TabBase, { ITabBaseProps } from "src/components/Common/Tab/TabBase";

interface ITabGroupProps extends Omit<ITabBaseProps, "text" | "selected"> {
  list: { label: string }[];
  selectedIndex: string;
}

const TabGroup = (props: ITabGroupProps) => {
  const {
    /* required */
    list = [],
    selectedIndex = "0",
    /* optional */
    /* rest */
    ...rest
  } = props;

  return (
    <TabSection className={"mt-4 mx-5 d-flex flex-nowrap"}>
      {list.map(({ label }, index) => (
        <TabBase
          key={index}
          index={index}
          text={label}
          selected={selectedIndex === `${index}`}
          {...rest}
        />
      ))}
    </TabSection>
  );
};

export default TabGroup;

const TabSection = styled.section``;
