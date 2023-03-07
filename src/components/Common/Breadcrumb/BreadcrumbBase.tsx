import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import styled from "styled-components";

interface IBreadcrumbProps {
  list: { label: string; href: string }[];
}

const BreadcrumbBase = (props: IBreadcrumbProps) => {
  const {
    /* required */
    list = [],
    /* optional */
    /* rest */
  } = props;

  const lastIndex = list.length - 1;

  const lastIndexCheck = (index: number) => {
    const isActive = lastIndex === index;

    return isActive;
  };

  return (
    <Breadcrumb
      tag={"nav"}
      listTag={"div"}
      listClassName={"m-0 mt-4 ms-4 mb-2 p-0"}
      className={"relay-breadcrumb"}
    >
      {list.map(({ label, href }, index) => (
        <Item
          key={`${label}-${href}`}
          tag={"a"}
          href={href}
          className={`text-dark font-size-14 left-0 fw-${
            lastIndexCheck(index) ? "bold" : "normal"
          }`}
          active={!lastIndexCheck(index)}
        >
          {label}
        </Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbBase;

const Item = styled(BreadcrumbItem)`
  --bs-breadcrumb-divider: ">";
  --bs-breadcrumb-item-padding-x: 0.25rem;
`;
