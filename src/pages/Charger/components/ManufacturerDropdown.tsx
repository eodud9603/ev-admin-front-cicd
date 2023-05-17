import React, { useState } from "react";
import { getManufactureList } from "src/api/manufactures/manufactureApi";
import { IManufactureListItem } from "src/api/manufactures/manufactureApi.interface";
import { SearchDropdownBase } from "src/components/Common/Dropdown/SearchDropdownBase";

interface IItemProps extends IManufactureListItem {
  label: string;
  value: string;
}

interface IManufactureDropdownProps {
  disabled?: boolean;
  initSelectedValue?: {
    code: string;
    name: string;
  };
  onChange?: (data: Partial<IItemProps>) => void;
}

const ManufacturerDropdown = (props: IManufactureDropdownProps) => {
  const { disabled, initSelectedValue, onChange } = props;
  const [list, setList] = useState<IItemProps[]>([]);
  const [selectedData, setSelectedData] = useState<Partial<IItemProps>>(
    initSelectedValue ?? {}
  );

  /** 선택한 제조사 데이터 콜백 */
  const onChangeData = (data: Partial<IItemProps>) => {
    !!onChange && onChange(data);
    setSelectedData(data);
  };

  /** 제조사 목록 조회 검색 핸들러 */
  const searchHandler = async (text: string) => {
    const { code, data } = await getManufactureList({
      size: 30,
      page: 0,
      sort: "ModifiedDate",
      searchType: "NameOrCode",
      searchKeyword: text,
    });

    const success = code === "SUCCESS";
    if (success) {
      setList(format(data?.elements ?? []));
    }
  };

  return (
    <SearchDropdownBase
      disabled={disabled}
      placeholder={"제조사명 또는 코드를 입력해주세요"}
      emptyMessage={
        "검색 결과가 없습니다.\n제조사명 또는 코드를 다시 확인해주세요."
      }
      list={list}
      selectedLabel={
        !selectedData?.code || !selectedData?.name
          ? "선택"
          : `${selectedData.code} ${selectedData.name}`
      }
      onClickItem={onChangeData}
      searchHandler={searchHandler}
    />
  );
};

export default ManufacturerDropdown;

const format = (list: IManufactureListItem[]) => {
  return list.map((data) => ({
    ...data,
    label: `${data.code} ${data.name}`,
    value: data.id.toString(),
  }));
};
