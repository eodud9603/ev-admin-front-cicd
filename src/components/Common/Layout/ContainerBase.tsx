import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";

interface IContainerProps {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
}

const ContainerBase = (props: IContainerProps) => {
  const {
    /* required */
    /* optional */
    children,
    className = "",
    /* rest */
  } = props;

  return (
    <CustomContainer
      className={`d-flex flex-column mb-5 p-0 bg-light bg-opacity-75
       ${className}`}
      fluid
    >
      {children}
    </CustomContainer>
  );
};

export default ContainerBase;

const CustomContainer = styled(Container)`
  overflow-x: hidden;
`;
