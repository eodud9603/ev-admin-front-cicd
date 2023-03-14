import React from "react";
import { Button } from "reactstrap";

interface IButtonBase {
  label: string;
  color?: "turu" | "secondary" | "dark" | "info" | "success" | "white";
  icon?: HTMLElement;
  className?: string;
  outline?: boolean;
  onClick?: () => void;

  disabled?: boolean;
}
export const ButtonBase = (props: IButtonBase) => {
  const { label, color, className, icon, outline, onClick, disabled } = props;

  return (
    <Button
      className={className}
      color={color}
      outline={outline}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {icon}
        {label}
      </>
    </Button>
  );
};
