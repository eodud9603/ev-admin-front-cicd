import React from "react";
import { Col } from "reactstrap";

interface ITextColProps {
  sm?: number;
  className?: string;
  children?: string | React.ReactElement | React.ReactElement[];

  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

export const TextLabelCol = (props: ITextColProps) => {
  const { sm = 1, className = "", children } = props;

  return (
    <Col
      sm={sm}
      className={
        "d-flex align-items-center fw-bold bg-light bg-opacity-10 p-3 " +
        "border-top border-bottom border-2 border-light " +
        className
      }
    >
      {children}
    </Col>
  );
};

export const TextContentCol = (props: ITextColProps) => {
  const { sm, className = "", children, onDragOver, onDrop } = props;

  return (
    <Col
      sm={sm}
      className={
        "d-flex align-items-center bg-white p-3 " +
        "border-top border-bottom border-2 border-light " +
        className
      }
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </Col>
  );
};

export const TextColGroup = (props: {
  title: string;
  labelSm?: number;
  sm?: number;
  className?: string;
  children?: string | React.ReactElement | React.ReactElement[];
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}) => {
  const { title = "", labelSm, sm, className = "", children, ...rest } = props;

  return (
    <>
      <TextLabelCol sm={labelSm}>{title}</TextLabelCol>
      <TextContentCol sm={sm} className={className} {...rest}>
        {children}
      </TextContentCol>
    </>
  );
};
