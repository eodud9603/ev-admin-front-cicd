import React, { useState } from "react";
import { getCategoryFields } from "src/api/category/categoryApi";
import { ICategoryFieldItem } from "src/api/category/categoryApi.interface";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";

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
  initSelectedValue?: {
    label: string;
    value: string;
  };
  onChange?: (data: Partial<IItemProps>) => void;
}

const CategoryFieldDropdown = (props: IManufactureDropdownProps) => {
  const { disabled, initSelectedValue, onChange } = props;
  const [list, setList] = useState<IItemProps[]>([defaultDropDownData]);
  const [selectedData, setSelectedData] = useState<Partial<IItemProps>>(
    initSelectedValue ?? {}
  );

  /** 선택한 분야 데이터 콜백 */
  const onChangeData = (label: string, value: string) => {
    const findData = list.find((data) => data.id === Number(value)) ?? {
      label,
      value,
    };

    !!onChange && onChange(findData);
    setSelectedData(findData);
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
    <DropdownBase
      label={"분야"}
      disabled={disabled}
      menuItems={list}
      initSelectedValue={{
        label: selectedData.label || "전체",
        value: selectedData.value || "",
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
