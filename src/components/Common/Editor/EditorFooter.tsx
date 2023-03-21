import React from "react";
import styled from "styled-components";
import {
  EditorContentCol,
  EditorTitleCol,
} from "src/components/Common/Editor/EditorCol";
import EditorRow from "src/components/Common/Editor/EditorRow";
import { IEditorFooterProps } from "src/components/Common/Editor/editor.interface";

const EditorFooter = (props: IEditorFooterProps) => {
  const { attachmentList = [] } = props;
  /** 첨부파일 목록 개수 */
  const listCount = attachmentList.length;
  /** 첨부파일 목록 이름 문자열(텍스트) */
  const AttachmentText = attachmentList.reduce((acc, { name }, idx) => {
    acc += name;
    if (listCount !== idx + 1) {
      acc += ", ";
    }

    return acc;
  }, "");

  return (
    <EditorRow className={"pb-3"}>
      <EditorTitleCol>첨부파일</EditorTitleCol>
      <EditorContentCol>
        <Attachments
          className={
            "py-1 px-2 rounded border border-light " +
            "bg-light bg-opacity-50 font-size-14 fw-normal"
          }
        >
          {AttachmentText}
        </Attachments>
      </EditorContentCol>
    </EditorRow>
  );
};

export default EditorFooter;

const Attachments = styled.div`
  min-height: 101px;
`;
