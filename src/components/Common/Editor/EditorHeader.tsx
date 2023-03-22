import React from "react";
import { Input, Label } from "reactstrap";
import { IEditorHeaderProps } from "src/components/Common/Editor/editor.interface";
import {
  EditorContentCol,
  EditorTitleCol,
} from "src/components/Common/Editor/EditorCol";
import EditorRow from "src/components/Common/Editor/EditorRow";

const EditorHeader = (props: IEditorHeaderProps) => {
  const {
    /* optional props */
    className = "",
    label = "제목",
    /* input props */
    ...rest
  } = props;

  return (
    <EditorRow className={"d-flex align-items-end " + className}>
      <EditorTitleCol>
        <Label className={"font-size-16 fw-semibold "} htmlFor={label}>
          {label}
        </Label>
      </EditorTitleCol>
      <EditorContentCol>
        <Input
          id={label}
          bsSize={"lg"}
          type={"text"}
          className={"px-0 rounded-0 border-0 " + "font-size-16"}
          {...rest}
        />
      </EditorContentCol>
    </EditorRow>
  );
};

export default EditorHeader;
