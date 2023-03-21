import React from "react";
import { CKEditor } from "ckeditor4-react";
import { CK_EDITOR_CONFIGS } from "src/constants/editor";
import {
  EditorContentCol,
  EditorTitleCol,
} from "src/components/Common/Editor/EditorCol";
import EditorRow from "src/components/Common/Editor/EditorRow";
import { Label } from "reactstrap";
import { IEditorBodyProps } from "src/components/Common/Editor/editor.interface";

const EditorBody = (props: IEditorBodyProps) => {
  const {
    disabled = false,
    label = "본문",
    name = "editor",
    /* editor props */
    ...rest
  } = props;

  return (
    <EditorRow className={"pb-3"}>
      <EditorTitleCol>
        <Label className={"font-size-16 fw-semibold"} htmlFor={name}>
          {label}
        </Label>
      </EditorTitleCol>
      <EditorContentCol>
        <CKEditor
          name={"editor"}
          config={CK_EDITOR_CONFIGS}
          readOnly={disabled}
          {...rest}
        />
      </EditorContentCol>
    </EditorRow>
  );
};

export default EditorBody;
