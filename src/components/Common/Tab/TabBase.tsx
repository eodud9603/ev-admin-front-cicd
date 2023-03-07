import React from "react";
import { Button } from "reactstrap";

export interface ITabBaseProps {
  text: string;
  selected: boolean;

  index?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const TabBase = (props: ITabBaseProps) => {
  const {
    /* required */
    text = "",
    selected = false,
    /* optional */
    index,
    className = "",
    onClick,
    onClose,
    /* rest */
    ...rest
  } = props;

  /* selected여부에 따른 className 정보 */
  const { containerClass, tabClass, closeClass } = getClassInfo(selected);

  return (
    <div
      className={`d-inline-flex align-items-center btn-group rounded-bottom-0 rounded-top-3 border-0 ${containerClass} ${className}`}
    >
      <Button
        type={"button"}
        className={`border-0 px-3 ps-3 bg-transparent ${tabClass}`}
        outline
        value={index}
        onClick={onClick}
        {...rest}
      >
        {text}
      </Button>
      <Button
        type={"button"}
        className={`pe-3 btn-close bg-transparent ${closeClass}`}
        aria-label={"Close"}
        outline
        size={"sm"}
        value={index}
        onClick={onClose}
      />
    </div>
  );
};

export default TabBase;

const getClassInfo = (selected: boolean) => {
  const containerClass = selected ? "bg-turu" : "bg-dark bg-opacity-10";
  const tabClass = `text-${selected ? "white" : "dark"}`;
  const closeClass = `btn-close-${selected ? "white" : "dark"}`;

  return {
    containerClass,
    tabClass,
    closeClass,
  };
};
