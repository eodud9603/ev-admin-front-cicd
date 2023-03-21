import React from "react";
import EditorHeader from "src/components/Common/Editor/EditorHeader";
import EditorBody from "src/components/Common/Editor/EditorBody";
import EditorFooter from "src/components/Common/Editor/EditorFooter";
import { IEditorBaseProps } from "src/components/Common/Editor/editor.interface";

const EditorBase = (props: IEditorBaseProps) => {
  const {
    isTitle = true,
    isAttachments = true,
    disabled = false,
    headerProps,
    bodyProps,
    footerProps,
  } = props;

  return (
    <>
      {/* 제목 */}
      {isTitle && <EditorHeader {...headerProps} disabled={disabled} />}
      {/* editor */}
      <EditorBody {...bodyProps} disabled={disabled} />
      {/* 첨부파일 */}
      {isAttachments && <EditorFooter {...footerProps} />}
    </>
  );
};

export default EditorBase;
