import React from "react";
import { Container } from "reactstrap";

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
    <Container
      className={`d-flex flex-column p-0 bg-light bg-opacity-75 ${className}`}
      fluid
    >
      {children}
    </Container>
  );
};

export default ContainerBase;
