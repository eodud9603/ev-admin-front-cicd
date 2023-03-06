import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

interface IDropdownBaseProps {
  disabled?: boolean;
  onClickDropdownItem?: (label: string, value: string) => void;
  menuItems: Array<{ label: string; value: string }>;
}
export const DropdownBase = (props: IDropdownBaseProps) => {
  const { disabled, onClickDropdownItem, menuItems, ...extraProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  }>({ label: "전체", value: "" });

  const onToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onClickItems = (label: string, value: string) => {
    setSelectedValue({ label: label, value: value });
    onClickDropdownItem && onClickDropdownItem(label, value);
  };

  return (
    <div className="btn-group">
      <Dropdown
        isOpen={isOpen}
        toggle={onToggleDropdown}
        disabled={disabled}
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
