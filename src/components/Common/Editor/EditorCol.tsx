import React from "react";
import { Col } from "reactstrap";

interface IEditorColProps {
  sm?: number;
  children?: string | JSX.Element | JSX.Element[];
  className?: string;

  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

const EditorCol = (props: IEditorColProps) => {
  const { sm, children, className = "", onDragOver, onDrop } = props;

  return (
    <Col sm={sm} className={className} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </Col>
  );
};

export const EditorTitleCol = (
  props: Omit<IEditorColProps, "onDragOver" | "onDrop">
) => {
  const { sm = 1, ...rest } = props;

  return <EditorCol sm={sm} {...rest} />;
};

export const EditorContentCol = (props: IEditorColProps) => {
  return <EditorCol {...props} />;
};
