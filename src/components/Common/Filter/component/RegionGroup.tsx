import React, { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
} from "reactstrap";
import {
  getRegionDongmyun,
  getRegionSido,
  getRegionSigugun,
} from "src/api/region/regionApi";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

interface IRegionGroupProps {
  onChangeRegion?: (region: {
    sido: string;
    sigugun: string;
    dongmyun: string;
  }) => void;
}

const DEFAULT_REGION_ITEM = { label: "전체", value: "" };

export const RegionGroup = (props: IRegionGroupProps) => {
  const { onChangeRegion } = props;
  const onChangeCallbackRef = useRef(onChangeRegion);
  /* 시/도 목록 */
  const [sidoList, setSidoList] = useState<{ label: string; value: string }[]>([
    DEFAULT_REGION_ITEM,
  ]);
  /* 구/군 목록 */
  const [sigugunList, setSigugunList] = useState<
    { label: string; value: string }[]
  >([DEFAULT_REGION_ITEM]);
  /* 동/읍 목록 */
  const [dongmyunList, setDongmyunList] = useState<
    { label: string; value: string }[]
  >([DEFAULT_REGION_ITEM]);
  /* 선택한 값 */
  const { sido, sigugun, dongmyun, onChangeSingle } = useInputs({
    sido: "",
    sigugun: "",
    dongmyun: "",
  });

  /* sido 목록 init */
  useEffect(() => {
    const init = async () => {
      const { code, data } = await getRegionSido();

      const success = code === "SUCCESS" && !!data;
      if (success) {
        setSidoList([DEFAULT_REGION_ITEM, ...regionListFormat(data.elements)]);
      }
    };

    void init();
  }, []);

  /* 선택(변경)된 지역정보 콜백 */
  useEffect(() => {
    const onChangeCallbackDelegate = onChangeCallbackRef.current;
    !!onChangeCallbackDelegate &&
      onChangeCallbackDelegate({ sido, sigugun, dongmyun });
  }, [sido, sigugun, dongmyun]);

  /** 구/군 목록 요청 */
  const getSigugun = async (regionName: string) => {
    const { code, data } = await getRegionSigugun({ sido: regionName });

    const success = code === "SUCCESS" && !!data;
    if (success) {
      setSigugunList([DEFAULT_REGION_ITEM, ...regionListFormat(data.elements)]);
    }
  };

  /** 동/읍 목록 요청 */
  const getDongmyun = async (regionName1: string, regionName2: string) => {
    const { code, data } = await getRegionDongmyun({
      sido: regionName1,
      sigugun: regionName2,
    });

    const success = code === "SUCCESS" && !!data;
    if (success) {
      setDongmyunList([
        DEFAULT_REGION_ITEM,
        ...regionListFormat(data.elements),
      ]);
    }
  };

  /** 지역 정보 변경 */
  const onChange =
    (type: "sido" | "sigugun" | "dongmyun") => (_: string, value: string) => {
      if (type === "sido" && sido !== value) {
        setDongmyunList([DEFAULT_REGION_ITEM]);
        onChangeSingle({
          sigugun: "",
          dongmyun: "",
        });

        void getSigugun(value);
      } else if (type === "sigugun" && sigugun !== value) {
        setDongmyunList([DEFAULT_REGION_ITEM]);
        onChangeSingle({
          dongmyun: "",
        });

        void getDongmyun(sido, value);
      }

      onChangeSingle({ [type]: value });
    };

  return (
    <div className="btn-group d-flex align-items-center">
      <Label className={"fw-bold m-0 w-xs"}>지역</Label>
      <RegionDropdown
        className={"me-2 w-xs"}
        selectedLabel={sido || "시,도"}
        menuItems={sidoList}
        onClickDropdownItem={onChange("sido")}
      />
      <RegionDropdown
        className={"me-2 w-xs"}
        selectedLabel={sigugun || "구,군"}
        menuItems={sigugunList}
        onClickDropdownItem={onChange("sigugun")}
      />
      <RegionDropdown
        className={"me-2 w-xs"}
        selectedLabel={dongmyun || "동,읍"}
        menuItems={dongmyunList}
        onClickDropdownItem={onChange("dongmyun")}
      />
    </div>
  );
};

const regionListFormat = (region: string[]) => {
  return region.map((region) => ({ label: region, value: region }));
};

interface IDropdownBaseProps {
  disabled?: boolean;
  label?: string;
  selectedLabel?: string;
  onClickDropdownItem?: (label: string, value: string) => void;
  menuItems: Array<{
    label: string;
    value: string;
  }>;
  className?: string;
}
export const RegionDropdown = (props: IDropdownBaseProps) => {
  const {
    disabled,
    selectedLabel,
    onClickDropdownItem,
    menuItems,
    className,
    ...extraProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickItems = (label: string, value: string) => {
    onClickDropdownItem && onClickDropdownItem(label, value);
  };

  return (
    <div className="btn-group d-flex align-items-center">
      <Dropdown
        isOpen={isOpen}
        toggle={onToggleDropdown}
        disabled={disabled}
        className={`text-nowrap ${className ?? ""}`}
        {...extraProps}
      >
        <DropdownToggle tag="button" className="btn btn-outline-light w-xs">
          {selectedLabel} <i className="mdi mdi-chevron-down ms-5" />
        </DropdownToggle>
        <Menu
          style={{
            maxHeight: 32.2 * 10,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {menuItems.map(({ label, value }, index) => (
            <DropdownItem
              key={`${value}${index}`}
              onClick={() => onClickItems(label, value)}
              value={value}
              aria-label={label}
            >
              {label}
            </DropdownItem>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};

const Menu = styled(DropdownMenu)`
  max-height: 322px;
  overflow: hidden;
  overflow-y: scroll;
`;
