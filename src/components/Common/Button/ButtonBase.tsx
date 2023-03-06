import React from "react";
import { Button } from "reactstrap";

interface IButtonBase {
  label: string;
  labelColor?: "turu" | "secondary" | "dark";
  bgColor?: "turu" | "secondary" | "dark";
  icon?: HTMLElement;
  className?: string;
  outline?: boolean;
  onClick?: () => void;
}
export const ButtonBase = (props: IButtonBase) => {
  const { label, labelColor, bgColor, className, icon, outline, onClick } =
    props;

  return (
    <Button
      className={className}
      outline={outline}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: labelColor }}
    >
      <>
        {icon}
        {label}
      </>
    </Button>
  );
};
