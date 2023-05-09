import React, { memo, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
} from "reactstrap";
import { getManufactureModelList } from "src/api/manufactures/manufactureApi";
import { IManufactureModelItem } from "src/api/manufactures/manufactureApi.interface";

interface IItemProps extends IManufactureModelItem {
  label: string;
  value: string;
}

interface IManufactureModelDropdownProps {
  disabled?: boolean;
  id: number;
  initSelectedValue?: {
    label: string;
    value: string;
  };
  onChange?: (data: Partial<IItemProps>) => void;
}

const ManufacturerModelDropdown = (props: IManufactureModelDropdownProps) => {
  const { disabled, id, initSelectedValue, onChange } = props;
  const [list, setList] = useState<IItemProps[]>([]);
  const [selectedData, setSelectedData] = useState<Partial<IItemProps>>(
    initSelectedValue ?? {}
  );
  const empty = list.length === 0;

  /** 제조사 변경 시, 제조사 모델 조회 이벤트 */
  useEffect(() => {
    const init = async () => {
      if (id < 0) {
        return;
      }

      const { code, data } = await getManufactureModelList({
        id,
      });

      const success = code === "SUCCESS";
      if (success) {
        const list = format(data?.elements ?? []);

        setList(list);
        setSelectedData((prev) => {
          const findData = list.find((data) => data.id === Number(prev.value));

          return findData ?? {};
        });
      }
    };

    void init();
  }, [id]);

  /** 선택한 제조사 모델 데이터 콜백 */
  const onChangeData = (_: string, value: string) => {
    const data = list.find((model) => (model.id ?? "").toString() === value);

    if (data) {
      !!onChange && onChange(data);
      setSelectedData(data);
    }
  };

  return (
    <ModelDropdown
      disabled={disabled || empty}
      list={list}
      initSelectedValue={{
        label: selectedData.label || "선택",
        value: selectedData.value || "",
      }}
      onClickDropdownItem={onChangeData}
    />
  );
};

export default ManufacturerModelDropdown;

const format = (list: IManufactureModelItem[]) => {
  return list.map((data) => ({
    ...data,
    label: data.modelName,
    value: (data.id ?? "").toString(),
  }));
};

interface IDropdownBaseProps {
  disabled?: boolean;
  label?: string;
  initSelectedValue: { label: string; value: string };
  onClickDropdownItem?: (label: string, value: string) => void;
  list: IItemProps[];
}
const ModelDropdown = memo(
  (props: IDropdownBaseProps) => {
    const { label, disabled, initSelectedValue, onClickDropdownItem, list } =
      props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<{
      label: string;
      value: string;
    }>({
      label: initSelectedValue.label,
      value: initSelectedValue.value,
    });

    const onToggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const onClickItems = (label: string, value: string) => {
      setSelectedValue({ label: label, value: value });
      onClickDropdownItem && onClickDropdownItem(label, value);
    };

    /** 모델 목록 업데이트 시, 선택값 초기화 */
    useEffect(() => {
      setSelectedValue(initSelectedValue);
    }, [initSelectedValue]);

    return (
      <div className="btn-group d-flex align-items-center">
        {label && <Label className={"fw-bold m-0 w-xs"}>{label}</Label>}
        <Dropdown
          isOpen={isOpen}
          toggle={onToggleDropdown}
          disabled={disabled}
          className={`text-nowrap`}
        >
          <DropdownToggle tag="button" className="btn btn-outline-light w-xs">
            {selectedValue.label} <i className="mdi mdi-chevron-down ms-5" />
          </DropdownToggle>
          <DropdownMenu>
            {list.map((data) => (
              <DropdownItem
                key={data.id}
                onClick={() => onClickItems(data.label, data.value)}
                value={data.value}
                aria-label={data.label}
              >
                {data.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  },
  (a, b) => a.list === b.list
);
