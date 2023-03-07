import React from "react";
import styled from "styled-components";

interface IBodyProps {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
}

const BodyBase = (props: IBodyProps) => {
  const {
    /* required */
    /* optional */
    children,
    className = "",
    /* rest */
    ...rest
  } = props;

  return (
    <Body
      className={`d-flex-block flex-grow-1 p-0 px-4 py-4 m-0 bg-white ${className}`}
      {...rest}
    >
      {children}
    </Body>
  );
};

export default BodyBase;

const Body = styled.section``;
