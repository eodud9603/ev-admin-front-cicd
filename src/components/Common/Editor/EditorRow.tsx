import React from "react";
import { Row } from "reactstrap";

interface IEditorColProps {
  hasMargin?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
}

const EditorRow = (props: IEditorColProps) => {
  const { hasMargin = true, children, className = "" } = props;

  return (
    <Row
      className={
        (hasMargin ? "mb-3 " : "") +
        "border-bottom border-2 border-light border-opacity-50 " +
        "font-size-16 fw-semibold " +
        className
      }
    >
      {children}
    </Row>
  );
};

export default EditorRow;
