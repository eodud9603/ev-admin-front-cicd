import React from "react";
import { Col } from "reactstrap";

interface IEditorColProps {
  sm?: number;
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
}

const EditorCol = (props: IEditorColProps) => {
  const { sm, children, className = "" } = props;

  return (
    <Col sm={sm} className={className}>
      {children}
    </Col>
  );
};

export const EditorTitleCol = (props: IEditorColProps) => {
  const { sm = 1, ...rest } = props;

  return <EditorCol sm={sm} {...rest} />;
};

export const EditorContentCol = (props: IEditorColProps) => {
  return <EditorCol {...props} />;
};
