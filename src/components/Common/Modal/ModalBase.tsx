import React from "react";
import {
  Modal,
  ModalProps,
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  Button,
} from "reactstrap";

interface IModalBaseProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerClassName?: string;

  size?: "ms" | "md" | "lg";
  title?: string;
  body?: Pick<ModalBodyProps, "children">["children"];
  footer?: Pick<ModalFooterProps, "children">["children"];
}

/**
 * * children이 있을 경우, body/footer props는 무시된다
 *
 * rest는 modal tag props에 해당한다.
 *  */
const ModalBase = (props: IModalBaseProps) => {
  const {
    /* required */
    isOpen = false,
    onClose,
    children,
    /* Optional */
    size = "md",
    title = "",
    headerClassName = "",
    body,
    footer,
    /* modal tag(container) rest */
    ...rest
  } = props;

  return (
    <Modal isOpen={isOpen} size={size} {...rest}>
      <ModalHeader
        className={`py-3 border-bottom border-light border-2 ${headerClassName}`}
        close={
          <Button
            type={"button"}
            className={`pe-3 btn-close bg-transparent btn-close-dark`}
            aria-label={"Close"}
            outline
            size={"sm"}
            onClick={onClose}
          />
        }
      >
        <span className={"font-size-20"}>{title}</span>
      </ModalHeader>

      {/* children or body/footer 태그 */}
      {children ?? (
        <>
          <ModalBody>{body}</ModalBody>
          {footer && <ModalFooter className={"border-0"}>{footer}</ModalFooter>}
        </>
      )}
    </Modal>
  );
};

export default ModalBase;
