import { CKEditorEventHandler, CKEditorEventPayload } from "ckeditor4-react";

export interface IEditorHeaderProps {
  label?: string;
  /* input props */
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean
}

export interface IEditorBodyProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  /* editor props */
  initData?: string;
  onChange?: CKEditorEventHandler<"change"> &
    ((e: CKEditorEventPayload<"change">) => void);
  onFileUploadResponse?: CKEditorEventHandler<"fileUploadResponse">;
}

export interface IEditorFooterProps {
  attachmentList?: {name: string}[]
}

export interface IEditorBaseProps {
  isTitle?: boolean;
  isAttachments?: boolean;
  disabled?: boolean
  headerProps?: IEditorHeaderProps
  bodyProps?: IEditorBodyProps
  footerProps?: IEditorFooterProps
}
