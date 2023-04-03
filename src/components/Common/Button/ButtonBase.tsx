import React from "react";
import { Button, ButtonProps } from "reactstrap";

interface IButtonBase extends ButtonProps {
  label: string;
  color?:
    | "turu"
    | "secondary"
    | "dark"
    | "info"
    | "success"
    | "white"
    | "danger"
    | "warning";
  icon?: HTMLElement;
  className?: string;
  outline?: boolean;
  onClick?: () => void;

  disabled?: boolean;
}
export const ButtonBase = (props: IButtonBase) => {
  const {
    label,
    color,
    className,
    icon,
    outline,
    onClick,
    disabled,
    ...extraProps
  } = props;

  return (
    <Button
      className={className}
      color={color}
      outline={outline}
      onClick={onClick}
      disabled={disabled}
      {...extraProps}
    >
      <>
        {icon}
        {label}
      </>
    </Button>
  );
};
