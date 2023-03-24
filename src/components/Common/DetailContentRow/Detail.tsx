import React from "react";
import { Col, Row } from "reactstrap";

interface IDetailRowProps {
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
}

export const DetailRow = (props: IDetailRowProps) => {
  const { children, className = "" } = props;

  return (
    <Row
      className={
        "border border-0 border-top border-2 border-light " +
        `mx-1 align-items-center ${className}`
      }
    >
      {children}
    </Row>
  );
};

interface IDetailColProps {
  sm?: number;
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
}

export const DetailGroupCol = (props: IDetailColProps) => {
  const { children, sm, className = "" } = props;

  return (
    <Col sm={sm} className={`d-flex p-0 ${className}`}>
      {children}
    </Col>
  );
};

export const DetailLabelCol = (props: IDetailColProps) => {
  const { children, sm, className = "" } = props;

  return (
    <Col
      sm={sm}
      className={
        "d-flex fw-bold align-items-center " +
        `bg-light bg-opacity-10 p-3 ${className}`
      }
    >
      {children}
    </Col>
  );
};

export const DetailContentCol = (props: IDetailColProps) => {
  const { children, sm, className = "" } = props;

  return (
    <Col sm={sm} className={`bg-white p-3 ${className}`}>
      {children}
    </Col>
  );
};
