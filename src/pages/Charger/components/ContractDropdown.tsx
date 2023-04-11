import React, { useEffect, useState } from "react";
import { getStationContractList } from "src/api/station/stationApi";
import { IStationContractItem } from "src/api/station/stationApi.interface";
import { SearchDropdownBase } from "src/components/Common/Dropdown/SearchDropdownBase";

interface IItemProps extends IStationContractItem {
  label: string;
  value: string;
}

interface IContractDropdownProps {
  onChange?: (data: Partial<IItemProps>) => void;
}

const ContractDropdown = (props: IContractDropdownProps) => {
  const { onChange } = props;
  const [list, setList] = useState<IItemProps[]>([]);
  const [selectedData, setSelectedData] = useState<Partial<IItemProps>>({});

  useEffect(() => {
    const init = async () => {
      const { code, data } = await getStationContractList({
        size: 30,
        page: 0,
        sort: "ContractPlace",
      });

      const success = code === "SUCCESS";
      if (success) {
        setList(format(data?.elements ?? []));
      }
    };

    void init();
  }, []);

  const onChangeData = (data: Partial<IItemProps>) => {
    !!onChange && onChange(data);
    setSelectedData(data);
  };

  const searchHandler = async (text: string) => {
    const { code, data } = await getStationContractList({
      size: 30,
      page: 0,
      sort: "ContractPlace",
      contractPlace: text,
    });

    const success = code === "SUCCESS";
    if (success) {
      setList(format(data?.elements ?? []));
    }
  };

  return (
    <SearchDropdownBase
      placeholder={"계약장소명 또는 계약번호를 입력해주세요"}
      emptyMessage={
        "검색 결과가 없습니다.\n계약장소명 또는 계약번호를 다시 확인해주세요."
      }
      list={list}
      selectedLabel={
        !selectedData?.place || !selectedData?.id
          ? "선택"
          : `${selectedData?.place}(${selectedData?.id})`
      }
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
