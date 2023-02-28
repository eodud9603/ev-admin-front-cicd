import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
} from "reactstrap";

interface Props {
  setData?: Dispatch<SetStateAction<boolean>>;
  label: string;
  menuItems: Array<{ label: string; value: string }>;
}
export const LabelDropDown = (props: Props) => {
  const { setData, label, menuItems } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  }>({ label: "전체", value: "" });
  const onToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const onClickItems = (label: string, value: string) => {
    setSelectedValue({ label: label, value: value });
  };
  return (
    <div className="btn-group d-flex align-items-center">
      <Label className={"fw-bold m-0 w-xs"}>{label}</Label>
      <Dropdown isOpen={isOpen} toggle={onToggleDropdown}>
        <DropdownToggle
          tag="button"
          className="btn btn-outline-light d-flex justify-content-between text-nowrap"
        >
          {selectedValue.label}
          <i className="mdi mdi-chevron-down ms-5" />
        </DropdownToggle>
        <DropdownMenu>
          {menuItems.map((e, i) => (
            <DropdownItem
              key={i}
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
