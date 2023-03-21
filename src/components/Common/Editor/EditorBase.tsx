import React from "react";
import { CKEditor } from "ckeditor4-react";
import { CK_EDITOR_CONFIGS } from "src/constants/editor";

const EditorBase = () => {
  return <CKEditor config={CK_EDITOR_CONFIGS} />;
};

export default EditorBase;
