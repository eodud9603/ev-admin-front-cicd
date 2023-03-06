import React from "react";
import { Button } from "reactstrap";

interface IButtonBase {
  label: string;
  color?: "turu" | "secondary" | "dark";
  icon?: HTMLElement;
  className?: string;
  outline?: boolean;
  onClick?: () => void;
}
export const ButtonBase = (props: IButtonBase) => {
  const { label, color, className, icon, outline, onClick } = props;

  return (
    <Button
      className={className}
      color={color}
      outline={outline}
      onClick={onClick}
    >
      <>
        {icon}
        {label}
      </>
    </Button>
  );
};
