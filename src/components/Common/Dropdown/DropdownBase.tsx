import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
} from "reactstrap";

interface IDropdownBaseProps {
  disabled?: boolean;
  label?: string;
  onClickDropdownItem?: (label: string, value: string) => void;
  menuItems: Array<{
    label: string;
    value: string;
    setData?: Dispatch<SetStateAction<{ label: string; value: string }>>;
  }>;
  className?: string;
}
export const DropdownBase = (props: IDropdownBaseProps) => {
  const {
    label,
    disabled,
    onClickDropdownItem,
    menuItems,
    className,
    ...extraProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  }>({ label: menuItems[0].label, value: menuItems[0].value });

  const onToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onClickItems = (label: string, value: string) => {
    setSelectedValue({ label: label, value: value });
    onClickDropdownItem && onClickDropdownItem(label, value);
  };

  return (
    <div className="btn-group d-flex align-items-center">
      {label && <Label className={"fw-bold m-0 w-xs"}>{label}</Label>}
      <Dropdown
        isOpen={isOpen}
        toggle={onToggleDropdown}
        disabled={disabled}
        className={`text-nowrap ${className ?? ""}`}
        {...extraProps}
      >
        <DropdownToggle tag="button" className="btn btn-outline-light w-xs">
          {selectedValue.label} <i className="mdi mdi-chevron-down ms-5" />
        </DropdownToggle>
        <DropdownMenu>
          {menuItems.map((e) => (
            <DropdownItem
              key={`${e.value}${Math.random()}`}
              onClick={() => onClickItems(e.label, e.value)}
              value={e.value}
              aria-label={e.label}
            >
              {e.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
