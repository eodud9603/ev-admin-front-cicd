import React, { useState } from "react";
import { getStationContractList } from "src/api/station/stationApi";
import { IStationContractItem } from "src/api/station/stationApi.interface";
import { SearchDropdownBase } from "src/components/Common/Dropdown/SearchDropdownBase";

interface IItemProps extends IStationContractItem {
  label: string;
  value: string;
}

interface IContractDropdownProps {
  disabled?: boolean;
  initSelectedValue?: {
    id?: number;
  };
  onChange?: (data: Partial<IItemProps>) => void;
}

const ContractDropdown = (props: IContractDropdownProps) => {
  const { disabled, initSelectedValue, onChange } = props;
  const [list, setList] = useState<IItemProps[]>([]);
  const [selectedData, setSelectedData] = useState<Partial<IItemProps>>(
    initSelectedValue?.id ? initSelectedValue : {}
  );

  /** 선택한 계약 데이터 콜백 */
  const onChangeData = (data: Partial<IItemProps>) => {
    !!onChange && onChange(data);
    setSelectedData(data);
  };

  /** 계약 목록 조회 검색 핸들러 */
  const searchHandler = async (text: string) => {
    /** @TODO api 변경 */
    const { code, data } = await getStationContractList({
      size: 30,
      page: 0,
      sort: "ContractedDate",
      searchType: "PlaceOrId",
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
      placeholder={"계약장소명 또는 계약번호를 입력해주세요"}
      emptyMessage={
        "검색 결과가 없습니다.\n계약장소명 또는 계약번호를 다시 확인해주세요."
      }
      list={list}
      selectedLabel={selectedData?.id?.toString() ?? "선택"}
      onClickItem={onChangeData}
      searchHandler={searchHandler}
    />
  );
};

export default ContractDropdown;

const format = (list: IStationContractItem[]) => {
  return list.map((data) => ({
    ...data,
    label: `${data.place}(${data.id})`,
    value: data.id.toString(),
  }));
};
