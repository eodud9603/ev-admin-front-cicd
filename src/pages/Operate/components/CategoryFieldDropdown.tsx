import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
} from "reactstrap";
import { getCategoryFields } from "src/api/category/categoryApi";
import { ICategoryFieldItem } from "src/api/category/categoryApi.interface";

const defaultDropDownData = {
  label: "전체",
  value: "",
};

interface IItemProps extends Partial<ICategoryFieldItem> {
  label: string;
  value: string;
}

interface IManufactureDropdownProps {
  disabled?: boolean;
  label?: string;
  displayValue?: {
    label: string;
    value: string;
  };
  onChange?: (data: Partial<IItemProps>) => void;
}

const CategoryFieldDropdown = (props: IManufactureDropdownProps) => {
  const { disabled, label, displayValue, onChange } = props;
  const [list, setList] = useState<IItemProps[]>([defaultDropDownData]);

  /** 선택한 분야 데이터 콜백 */
  const onChangeData = (label: string, value: string) => {
    const findData = list.find((data) => data.id === Number(value)) ?? {
      label,
      value,
    };

    !!onChange && onChange(findData);
  };

  /** dropdown이 열렸을 시, 분야 검색 */
  const search = async (open: boolean) => {
    if (!open) {
      return;
    }

    /* 조회 요청 */
    const { code, data } = await getCategoryFields();
    /** 성공 */
    const success = code === "SUCCESS" && !!data;
    if (success) {
      setList([defaultDropDownData, ...format(data)]);
    }
  };

  return (
    <CategoryDropdownFieldBase
      className={disabled ? "" : "bg-white"}
      label={label ?? "분야"}
      disabled={disabled}
      menuItems={list}
      displayValue={{
        label: displayValue?.label || "전체",
        value: displayValue?.value || "",
      }}
      onClickDropdownItem={onChangeData}
      onChangeOpen={search}
    />
  );
};

export default CategoryFieldDropdown;

const format = (list: ICategoryFieldItem[]): IItemProps[] => {
  return list.map((data) => ({
    ...data,
    label: data.name,
    value: data.id.toString(),
  }));
};

interface IDropdownBaseProps {
  disabled?: boolean;
  label?: string;
  displayValue: { label: string; value: string };
  onClickDropdownItem?: (label: string, value: string) => void;
  onChangeOpen?: (bool: boolean) => void | Promise<void>;
  menuItems: Array<{
    label: string;
    value: string;
    setData?: Dispatch<SetStateAction<{ label: string; value: string }>>;
  }>;
  className?: string;
}
const CategoryDropdownFieldBase = (props: IDropdownBaseProps) => {
  const {
    label,
    disabled,
    displayValue,
    onClickDropdownItem,
    onChangeOpen,
    menuItems,
    className,
    ...extraProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = () => {
    setIsOpen(!isOpen);
    !!onChangeOpen && void onChangeOpen(!isOpen);
  };

  const onClickItems = (label: string, value: string) => {
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
          {displayValue.label} <i className="mdi mdi-chevron-down ms-5" />
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
