import React, { Dispatch, SetStateAction } from "react";
import { Label } from "reactstrap";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";

interface IDropboxGroupProps {
  label?: string;
  className?: string;
  dropdownItems: Array<{
    menuItems: Array<{
      label: string;
      value: string;
      setData?: Dispatch<SetStateAction<{ label: string; value: string }>>;
    }>;
  }>;
}
export const DropboxGroup = (props: IDropboxGroupProps) => {
  const { label, dropdownItems, className } = props;

  return (
    <div className="btn-group d-flex align-items-center">
      {label && <Label className={"fw-bold m-0 w-xs"}>{label}</Label>}
      {dropdownItems &&
        dropdownItems.length > 0 &&
        dropdownItems.map((item, idx) => (
          <DropdownBase key={idx} {...item} className={className} />
        ))}
    </div>
  );
};
