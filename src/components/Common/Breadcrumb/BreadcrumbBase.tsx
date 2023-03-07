import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import styled from "styled-components";

interface IBreadcrumbProps {
  list: { label: string; href: string }[];
  title?: string;
}

const BreadcrumbBase = (props: IBreadcrumbProps) => {
  const {
    /* required */
    list = [],
    title,
    /* optional */
    /* rest */
  } = props;

  const lastIndex = list.length - 1;

  const lastIndexCheck = (index: number) => {
    const isActive = lastIndex === index;

    return isActive;
  };

  return (
    <>
      <Breadcrumb
        tag={"nav"}
        listTag={"div"}
        listClassName={"m-0 mb-2 p-0"}
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
      {Boolean(title) && <h3 className={"font-size-24 mb-4"}>{title}</h3>}
    </>
  );
};

export default BreadcrumbBase;

const Item = styled(BreadcrumbItem)`
  --bs-breadcrumb-divider: ">";
  --bs-breadcrumb-item-padding-x: 0.25rem;
`;
